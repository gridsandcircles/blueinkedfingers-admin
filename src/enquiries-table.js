import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { fireDb } from "../fireApp";

const EnquiriesTable = () => {
  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState([]);

  const [showMessage, setShowMessage] = useState("");

  useEffect(() => {
    const collectionRef = collection(fireDb, "enquiries");
    getDocs(collectionRef)
      .then((snapshot) => {
        setEnquiries(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        setLoading(false);
      })
      .catch((error) => {
        alert("Something went wrong!");
        setLoading(false);
      });
  }, []);

  return loading ? (
    <div>
      <ClipLoader size={25} color={"#101010"} />
    </div>
  ) : !enquiries.length ? (
    <div>
      <p className={"text-lg text-center font-light"}>
        No enquiries found, yet!
      </p>
    </div>
  ) : (
    <>
      <table className={"w-full"}>
        <thead>
          <th className={"border p-2 bg-white text-left"}>Name</th>
          <th className={"border p-2 bg-white text-left"}>Email</th>
          <th className={"border p-2 bg-white text-left"}>Action</th>
        </thead>
        <tbody>
          {enquiries.map((enquiry) => (
            <tr key={enquiry.id}>
              <td className={"border p-2 bg-white text-left"}>
                {enquiry.name}
              </td>
              <td className={"border p-2 bg-white text-left"}>
                {enquiry.email}
              </td>
              <td className={"border p-2 bg-white text-left"}>
                <button
                  onClick={() => {
                    setShowMessage(enquiry.message);
                  }}
                  className={"py-2 px-4 bg-blue-500 text-white rounded-md"}
                >
                  View Message
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        onClick={() => {
          setShowMessage("");
        }}
        className={`fixed top-0 left-0 w-full h-screen bg-black ${
          Boolean(showMessage) ? "bg-opacity-60 z-10" : "bg-opacity-0 -z-20"
        } transition-all duration-300`}
      />

      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md p-4 bg-white ${
          Boolean(showMessage) ? "bg-opacity-100 z-20" : "bg-opacity-0 -z-10"
        } transition-all duration-300 rounded-md`}
      >
        <p>{showMessage}</p>
      </div>
    </>
  );
};

export default EnquiriesTable;
