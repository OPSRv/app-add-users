import { useCallback, useContext, useEffect, useState } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const UploadImage = ({ file, setFile, data, setData, per, setPerc }) => {
  useEffect(() => {
    const uploadFile = async () => {
      const metadata = {
        contentType: "image/*,.png,.jpg,.gif,.web",
      };
      const storage = getStorage();

      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              console.log("unauthorized");
              break;
            case "storage/canceled":
              console.log("canceled");
              break;

            case "storage/unknown":
              console.log("unknown");
              break;
            default:
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
            console.log("File available at", downloadURL);
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  return (
    <>
      <input
        className="input-add-form"
        id="default_size"
        type="file"
        accept=" image/*,.png,.jpg,.gif,.web"
        onChange={(e) => setFile(e.target.files[0])}
      />
    </>
  );
};

export default UploadImage;
