import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { ReactComponent as Back } from "../assets/svg/back.svg";
import firebase from "../firebase";
import useInput from "../hooks/useInput";
import { Context } from "../index";
import { upperFirstLetter } from "../utils/upperFirstLetter";
import DatePickerWrap from "./DatePickerWrap";
import CropImage from "./UploadImage";
import UploadImage from "./UploadImage";
import logo from "../assets/img/logo.png";

const Form = ({ user, buttoneText, addUser }) => {
  console.log("🚀 ~ file: Form.jsx:18 ~ Form ~ user", user);
  const [file, setFile] = useState("");
  const [data, setData] = useState("");
  const [per, setPerc] = useState(null);
  const { auth } = useContext(Context);
  const [userProfile] = useAuthState(auth);

  if (addUser) {
  }

  const navigate = useNavigate();

  const userObject = user
    ? user
    : {
        uid: "",
        uuid_code: "",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        phoneNumber: "",
      };

  const [editUser] = useState(userObject);
  const [phone, setPhone] = useState(editUser.phoneNumber);
  const [startDate, setStartDate] = useState(new Date());
  const firstName = useInput(editUser.firstName);
  const lastName = useInput(editUser.lastName);
  const email = useInput(editUser.email);
  const dateOfBirth = startDate;

  const db = getFirestore(firebase);

  const usersRef = collection(db, "users");

  const uuid_code = editUser.uuid_code ? editUser.uuid_code : uuid();

  const createUser = async () => {
    try {
      await setDoc(doc(usersRef, uuid_code), {
        uid: userProfile.uid,
        avatar: data ? data : user.avatar,
        uuid_code: uuid_code,
        firstName: upperFirstLetter(firstName.value.toLowerCase()),
        lastName: upperFirstLetter(lastName.value.toLowerCase()),
        email: email.value.toLowerCase(),
        dateOfBirth: dateOfBirth,
        phoneNumber: phone,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      navigate("/users");
    }
  };
  return (
    <div className="grid place-items-center mt-10">
      <div
        tabIndex="-1"
        className="bg-gray-700
        rounded-lg
         overflow-y-auto overflow-x-hidden  z-50 justify-center items-center p-4 w-full max-w-[900px]"
      >
        <div className="relative w-full h-full md:h-auto">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {buttoneText}
            </h3>
            <Link
              to="/"
              className="bg-gray-600 h-5 w-5 rounded grid place-content-center p-5 hover:bg-gray-500 "
            >
              <Back className="h-4 w-4 mx-1 sm:h-9 text-white" />
            </Link>
          </div>

          <div className="p-6 space-y-6">
            <UploadImage
              file={file}
              setFile={setFile}
              data={data}
              setData={setData}
              per={per}
              setPerc={setPerc}
            />
            {data && addUser ? (
              <img
                className="w-10 h-10 rounded-full"
                src={`${data.img}`}
                alt="avatar"
              />
            ) : (
              <span></span>
            )}

            {!addUser && user ? (
              <img
                className="w-10 h-10 rounded-full"
                src={`${data.img ? data.img : user.avatar.img}`}
                alt="avatar"
              />
            ) : (
              <span></span>
            )}
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="input-add-user">
                <label htmlFor="first-name" className="label-form-add">
                  First Name
                </label>
                <input
                  {...firstName}
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="input-add-form"
                  placeholder="Bonnie"
                  required=""
                />
              </div>
              <div className="input-add-user">
                <label htmlFor="last-name" className="label-form-add">
                  Last Name
                </label>
                <input
                  {...lastName}
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="input-add-form"
                  placeholder="Green"
                  required=""
                />
              </div>
              <div className="input-add-user">
                <label htmlFor="email" className="label-form-add">
                  Email
                </label>
                <input
                  {...email}
                  type="email"
                  name="email"
                  id="email"
                  className="input-add-form"
                  placeholder="example@company.com"
                  required=""
                />
              </div>
              <div className="input-add-user">
                <label htmlFor="phone-number" className="label-form-add">
                  Phone number
                </label>
                <PhoneInput
                  onlyCountries={["ua"]}
                  country={"ua"}
                  masks={{ ua: "(..)...-..-.." }}
                  onChange={(phone) => setPhone(phone)}
                  placeholder={"+380(96)123-45-56"}
                  value={editUser.phoneNumber}
                />
              </div>
              <DatePickerWrap
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </div>
          </div>
          <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              type="submit"
              className="btn disabled:opacity-75 disabled:hover:none"
              onClick={createUser}
              disabled={per !== null && per < 100}
            >
              {buttoneText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
