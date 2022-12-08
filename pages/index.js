import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireDb } from "../fireApp";
import EnquiriesTable from "../src/enquiries-table";
import Sidebar from "../src/sidebar";
import InAuth from "../utils/InAuth";

const HomePage = () => {
  const [thoughtOfTheDay, setThoughtOfTheDay] = useState("");

  const handleUpdateThoughtOfTheDay = () => {
    const docRef = doc(fireDb, "metadata", "thoughtOfTheDay");
    updateDoc(docRef, {
      text: thoughtOfTheDay,
    })
      .then(() => {
        alert("Sucessfully updated the thought of the day!");
      })
      .catch((error) => {
        alert("Something went wrong!");
      });
  };

  useEffect(() => {
    const docRef = doc(fireDb, "metadata", "thoughtOfTheDay");
    getDoc(docRef).then((doc) => {
      setThoughtOfTheDay(doc.exists() ? doc.data()?.text : "");
    });
  }, []);

  return (
    <InAuth>
      <div className={"w-full h-screen bg-gray-50 flex"}>
        <Sidebar />

        <div className={"flex-1 p-8 h-full overflow-auto"}>
          <h1 className={"text-2xl font-semibold"}>Dashboard</h1>

          <div className={"mt-4"}>
            <div className={"space-y-1"}>
              <h3 className={"text-lg"}>Thought Of The Week</h3>

              <textarea
                rows={5}
                placeholder={"Type the thought here"}
                value={thoughtOfTheDay}
                onChange={(e) => {
                  setThoughtOfTheDay(e.target.value);
                }}
                className={"w-full p-2 bg-white rounded-md focus:outline-none"}
              />

              <button
                type={"submit"}
                onClick={handleUpdateThoughtOfTheDay}
                className={"py-2 px-4 bg-blue-500 text-white rounded-md"}
              >
                Save It
              </button>
            </div>
          </div>

          <div className={"mt-4 space-y-1"}>
            <h3 className={"text-lg"}>Enquiries</h3>

            <div>
              <EnquiriesTable />
            </div>
          </div>
        </div>
      </div>
    </InAuth>
  );
};

export default HomePage;
