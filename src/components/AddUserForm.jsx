import { Timestamp } from "@firebase/firestore";
import { default as getMonth, default as getYear } from "date-fns/getYear";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import range from "lodash/range";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthState } from "react-firebase-hooks/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import firebase from "../firebase";
import useInput from "../hooks/useInput";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { upperFirstLetter } from "../utils/upperFirstLetter";

const AddUserForm = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const years = range(1990, getYear(new Date()) + 1, 1);
  const [phone, setPhone] = useState("");

  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const phoneNumber = phone;
  const dateOfBirth = startDate;

  const db = getFirestore(firebase);

  const createUser = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        firstName: upperFirstLetter(firstName.value.toLowerCase()),
        lastName: upperFirstLetter(lastName.value.toLowerCase()),
        email: email.value.toLowerCase(),
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber.phone,
        createdAt: Timestamp.fromDate(new Date()),
      });
      console.log("Document written with ID: ", docRef.id);
      if (docRef.id) {
        navigate("/users");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="grid place-items-center p-10">
      <div
        id="addUserModal"
        tabIndex="-1"
        // aria-hidden="true"
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
              <div className="col-span-6 sm:col-span-3">
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
              <div className="col-span-6 sm:col-span-3">
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
              <div className="col-span-6 sm:col-span-3">
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
              <div className="col-span-6 sm:col-span-3 text-gray-900">
                <label htmlFor="phone-number" className="label-form-add">
                  Phone number
                </label>
                <PhoneInput
                  onlyCountries={["ua"]}
                  masks={{ ua: "(..) ...-..-.." }}
                  onChange={(phone) => setPhone({ phone })}
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="born" className="label-form-add">
                  Date of birth
                </label>
                <>
                  <DatePicker
                    renderCustomHeader={({
                      date,
                      changeYear,
                      changeMonth,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }) => (
                      <div
                        style={{
                          margin: 10,
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                        >
                          {"<"}
                        </button>
                        <select
                          value={getYear(date)}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
                        >
                          {years.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <select
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                          }
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                        >
                          {">"}
                        </button>
                      </div>
                    )}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </>
              </div>
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
