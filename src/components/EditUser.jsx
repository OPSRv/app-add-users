import { useEffect, useState } from "react";
import firebase from "../firebase";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Form from "./Form";
import Loader from "./Loader";
import { useParams } from "react-router-dom";

const EditUser = () => {
  let { uuid_code } = useParams();

  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState({});

  const db = getFirestore(firebase);

  const getEditUser = async () => {
    const docRef = doc(db, "users", uuid_code);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setEditUser(docSnap.data());
      setLoading(false);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getEditUser();
  }, [uuid_code]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Form user={editUser} buttoneText="Edit user" />
    </div>
  );
};

export default EditUser;
