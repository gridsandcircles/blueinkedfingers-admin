import { useRouter } from "next/router";
import { useState } from "react";

const SignIn = () => {
  const router = useRouter();

  const [adminKey, setAdminKey] = useState("");

  const handleSetAdminKey = () => {
    localStorage.setItem("adminKey", adminKey);
    router.push("/");
  };

  return (
    <div className={"w-full h-screen p-8 space-y-2 bg-gray-50"}>
      <input
        type={"text"}
        placeholder={"Admin Key"}
        className={"py-2 px-4 rounded-md focus:outline-none"}
        onChange={(e) => {
          setAdminKey(e.target.value);
        }}
      />

      <button
        onClick={handleSetAdminKey}
        className={"block py-2 px-4 bg-blue-500 text-white rounded-md"}
      >
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
