import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { fireDb } from "../../fireApp";
import AddBlogModal from "../../src/add-blog-modal";
import EditBlogModal from "../../src/edit-blog-modal";
import Sidebar from "../../src/sidebar";

const ManageProses = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const [loadingArticles, setLoadingArticles] = useState(true);
  const [articles, setArticles] = useState([]);

  const [editingArticle, setEditingArticle] = useState(null);

  const getArticles = async () => {
    const articlesRef = collection(fireDb, "proses");
    onSnapshot(articlesRef, (snapshot) => {
      const _articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setArticles(_articles);
      setLoadingArticles(false);
    });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className={"w-full h-screen bg-gray-50 flex"}>
      <Sidebar />

      <div className={"flex-1 p-8 h-full overflow-auto"}>
        <div className={"flex items-center justify-between"}>
          <h1 className={"text-2xl font-semibold"}>Manage Proses</h1>
          <button
            onClick={() => {
              setOpenAddModal(true);
            }}
            className={"py-2 px-4 bg-blue-500 text-white rounded-md"}
          >
            Add Proses
          </button>
        </div>

        <div className={"mt-4"}>
          {loadingArticles ? (
            <ClipLoader />
          ) : (
            <div className={"grid grid-cols-12 gap-4"}>
              {articles.map((article) => (
                <div
                  key={article.id}
                  className={"col-span-4 p-2 bg-white rounded-md shadow"}
                >
                  <div
                    className={
                      "w-full h-auto aspect-video relative rounded-md overflow-hidden"
                    }
                  >
                    <Image fill objectFit={"cover"} src={article.coverImage} />
                  </div>

                  <div className={"mt-2 space-y-1"}>
                    <h3
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: "2",
                        overflow: "hidden",
                      }}
                    >
                      {article.title}
                    </h3>

                    <div className={"flex items-center gap-2"}>
                      <div className={"flex items-center gap-1"}>
                        <BsPerson className={"w-5 h-5"} />
                        <p className={"text-sm"}>{article.author}</p>
                      </div>

                      <span>&middot;</span>

                      <p className={"text-sm"}>
                        {new Date(article.updatedOn).toLocaleDateString()}
                      </p>
                    </div>

                    <div className={"flex items-center gap-2"}>
                      <button
                        onClick={() => {
                          setEditingArticle(article);
                        }}
                        className={
                          "py-1 px-2 bg-blue-500 text-white rounded-md text-sm"
                        }
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this article? This action is not reversible!"
                            )
                          ) {
                            const blogDocRef = doc(
                              fireDb,
                              "articles",
                              article.id
                            );
                            deleteDoc(blogDocRef)
                              .then(() => {
                                alert("Deleted successfully!");
                              })
                              .catch((error) => {
                                alert("Something went wrong!");
                              });
                          }
                        }}
                        className={
                          "py-1 px-2 bg-red-500 text-white rounded-md text-sm"
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <AddBlogModal
          blogCollection={"proses"}
          open={openAddModal}
          onClose={() => {
            setOpenAddModal(false);
          }}
        />

        <EditBlogModal
          blogCollection={"proses"}
          data={editingArticle || {}}
          open={Boolean(editingArticle)}
          onClose={() => {
            setEditingArticle(null);
          }}
        />
      </div>
    </div>
  );
};

export default ManageProses;
