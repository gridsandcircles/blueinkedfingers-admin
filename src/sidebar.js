import { useRouter } from "next/router";
import { FaArtstation, FaHome, FaParagraph, FaPodcast } from "react-icons/fa";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className={"lg:w-72 h-full p-8 bg-white space-y-4"}>
      <h1 className={"text-2xl"}>Blue Inked Fingers</h1>

      <div className={"space-y-2"}>
        <div
          onClick={() => {
            router.push("/");
          }}
          className={"flex items-center gap-2 cursor-pointer py-1"}
        >
          <FaHome className={"w-5 h-5"} />
          <p>Dashboard</p>
        </div>
        <div
          onClick={() => {
            router.push("/manage/articles");
          }}
          className={"flex items-center gap-2 cursor-pointer py-1"}
        >
          <FaArtstation className={"w-5 h-5"} />
          <p>Manage Articles</p>
        </div>
        <div
          onClick={() => {
            router.push("/manage/poetry");
          }}
          className={"flex items-center gap-2 cursor-pointer py-1"}
        >
          <FaPodcast className={"w-5 h-5"} />
          <p>Manage Poetry</p>
        </div>
        <div
          onClick={() => {
            router.push("/manage/proses");
          }}
          className={"flex items-center gap-2 cursor-pointer py-1"}
        >
          <FaParagraph className={"w-5 h-5"} />
          <p>Manage Proses</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
