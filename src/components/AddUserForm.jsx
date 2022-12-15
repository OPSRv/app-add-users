import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";
import useInput from "../hooks/useInput";
import { Context } from "../index";
import { upperFirstLetter } from "../utils/upperFirstLetter";
import DatePickerWrap from "./DatePickerWrap";
import uuid from "react-uuid";

const AddUserForm = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const phoneNumber = phone;
  const dateOfBirth = startDate;

  const db = getFirestore(firebase);

  const usersRef = collection(db, "users");

  const uuid_code = uuid();

  const createUser = async () => {
    try {
      await setDoc(doc(usersRef, uuid_code), {
        uid: user.uid,
        uuid_code: uuid_code,
        firstName: upperFirstLetter(firstName.value.toLowerCase()),
        lastName: upperFirstLetter(lastName.value.toLowerCase()),
        email: email.value.toLowerCase(),
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber.phone,
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
              Add user
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <label className="label-form-add" htmlFor="default_size">
              Profile picture
            </label>
            <input className="input-add-form" id="default_size" type="file" />
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
                  onChange={(phone) => setPhone({ phone })}
                  placeholder={"+380(96)123-45-56"}
                />
              </div>
              <DatePickerWrap
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </div>
          </div>
          <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button type="submit" className="btn" onClick={createUser}>
              Create user
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
