import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const InAuth = ({ children }) => {
  const router = useRouter();

  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const adminKey = localStorage.getItem("adminKey");

    if (adminKey === "--BlueInkedFingers--") {
      setIsLoggedIn(true);
      setIsLoadingAuth(false);
    } else {
      router.push("/sign-in");
    }
  }, []);

  if (!isLoadingAuth && isLoggedIn) {
    return <div>{children}</div>;
  }

  return (
    <div className={"w-full h-screen flex items-center justify-center"}>
      <ClipLoader size={50} color={"#101010"} />
    </div>
  );
};

export default InAuth;
