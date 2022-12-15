import { useNavigate } from "react-router-dom";
import { useState } from "react";
import firebase from "../firebase";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { ReactComponent as Trash } from "../assets/svg/trash.svg";
import Modal from "./Modal";

const DeleteUser = ({ uuid_code }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const db = getFirestore(firebase);
  const navigate = useNavigate();

  const deleteUser = async () => {
    await deleteDoc(doc(db, "users", uuid_code));
    navigate("/");
  };

  return (
    <>
      <span
        className="bg-gray-600 h-5 w-5 rounded grid place-content-center p-5 hover:bg-gray-500"
        onClick={deleteUser}
      >
        <Trash className="h-4 w-4 mx-1 sm:h-9 text-white" />
      </span>
    </>
  );
};

export default DeleteUser;
