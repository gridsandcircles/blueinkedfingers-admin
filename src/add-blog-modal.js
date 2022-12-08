import { collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { fireDb, fireStorage } from "../fireApp";

const AddBlogModal = ({ blogCollection, open, onClose }) => {
  const [loaded, setLoaded] = useState(false);

  let editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  const [formData, setFormData] = useState({});

  const [uploadingFile, setUploadingFile] = useState(false);
  const fileUploadInputRef = useRef();

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };

    setLoaded(true);
  }, []);

  const handleAddBlog = () => {
    setSaving(true);
    const blogDocRef = doc(collection(fireDb, blogCollection));
    setDoc(blogDocRef, {
      ...formData,
      createdOn: Date.now(),
      updatedOn: Date.now(),
    })
      .then(() => {
        setSaving(false);
        onClose();
      })
      .catch((error) => {
        alert("Something went wrong!");
        setSaving(false);
      });
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed top-0 left-0 w-full h-screen bg-black ${
          open ? "bg-opacity-60 z-10" : "bg-opacity-0 -z-20"
        } transition-all duration-300`}
      />

      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl p-4 bg-white ${
          open ? "opacity-100 z-20" : "opacity-0 -z-10"
        } transition-all duration-300 rounded-md space-y-4 overflow-auto`}
        style={{
          maxHeight: "90vh",
        }}
      >
        <div
          onClick={() => {
            fileUploadInputRef.current.click();
          }}
        >
          {uploadingFile ? (
            <div
              className={
                "w-full p-4 bg-gray-50 border border-dashed border-gray-200 cursor-pointer"
              }
            >
              <div className={"flex items-center justify-center gap-2"}>
                <ClipLoader className={"w-5 h-5"} />
                <h3>Uploading Cover Image</h3>
              </div>
            </div>
          ) : formData.coverImage ? (
            <div
              className={
                "relative w-full h-auto aspect-video rounded-md overflow-hidden"
              }
            >
              <Image fill objectFit={"cover"} src={formData.coverImage} />
            </div>
          ) : (
            <div
              className={
                "w-full p-4 bg-gray-50 border border-dashed border-gray-200 cursor-pointer"
              }
            >
              <div className={"flex items-center justify-center gap-2"}>
                <FaUpload className={"w-5 h-5"} />
                <h3>Upload Cover Image</h3>
              </div>
            </div>
          )}

          <input
            ref={fileUploadInputRef}
            type={"file"}
            accept={"image/*"}
            onChange={(e) => {
              if (!e.target.files?.length) {
                return;
              }

              setUploadingFile(true);

              const storageRef = ref(
                fireStorage,
                `images/${e.target.files[0]?.name}`
              );
              uploadBytes(storageRef, e.target.files[0])
                .then((uploadResult) => {
                  getDownloadURL(uploadResult.ref).then((downloadURL) => {
                    setFormData((prev) => ({
                      ...prev,
                      coverImage: downloadURL,
                    }));
                    setUploadingFile(false);
                  });
                })
                .catch((error) => {
                  alert("Something went wrong!");
                  setUploadingFile(false);
                });
            }}
            className={"hidden"}
          />
        </div>

        <input
          type={"text"}
          placeholder={"Post Title"}
          value={formData.title}
          onChange={(event) => {
            setFormData((prev) => ({
              ...prev,
              title: event.target.value,
            }));
          }}
          className={"w-full py-2 px-4 border"}
        />

        <input
          type={"text"}
          placeholder={"Post Author"}
          value={formData.author}
          onChange={(event) => {
            setFormData((prev) => ({
              ...prev,
              author: event.target.value,
            }));
          }}
          className={"w-full py-2 px-4 border"}
        />

        {loaded ? (
          <CKEditor
            editor={ClassicEditor}
            placeholder={"Start typing the post content here."}
            data={formData.content || ""}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFormData((prev) => ({
                ...prev,
                content: data,
              }));
            }}
          />
        ) : (
          <></>
        )}

        <button
          type={"submit"}
          onClick={handleAddBlog}
          className={`py-2 px-4 ${
            saving ? "bg-gray-500" : "bg-blue-500"
          } text-white rounded-md`}
        >
          {saving ? "Saving..." : "Save It"}
        </button>
      </div>
    </>
  );
};

export default AddBlogModal;
