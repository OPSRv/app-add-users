import { useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import { ReactComponent as Edit } from "../assets/svg/edit.svg";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";
import { thead } from "../utils/thead";
import Modal from "./Modal";

const Table = ({ sortData, users }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-10 min-h-[528px]rounded ">
      <thead className="thead">
        <tr>
          {thead.map((th) => (
            <th
              scope="col"
              className="py-3 px-6 cursor-pointer hover:bg-gray-600"
              key={th.id}
              onClick={() => sortData(th.id, th.type)}
            >
              {th.label}
            </th>
          ))}
          <td className="py-3 px-6 cursor-pointer hover:bg-gray-600"></td>
        </tr>
      </thead>
      <tbody>
        {users ? (
          users.map((user) => (
            <tr key={uuid()} className="tbody-tr max-h-16">
              <th
                scope="row"
                className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://randomuser.me/api/portraits/men/4.jpg"
                  alt="Jeseimage"
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {user.firstName} {user.lastName}
                  </div>
                </div>
              </th>
              <td className="py-4 px-6">{user.email}</td>
              <td className="py-4 px-6">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{" "}
                  {formatPhoneNumber(user.phoneNumber)}
                </div>
              </td>
              <td className="py-4 px-6">
                <Moment format="DD/MM/YYYY" unix>
                  {user.dateOfBirth.seconds}
                </Moment>
              </td>
              <td className="hover:text-violet-900 cursor-pointer">
                <div className=" inset-0 flex items-center justify-center">
                  <button type="button" onClick={openModal} className="">
                    <Link to={user.uuid_code}>
                      <Edit />
                    </Link>
                  </button>
                </div>
                <Modal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  closeModal={closeModal}
                  openModal={openModal}
                >
                  {/* <EditUser email={email} /> */}
                </Modal>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <span>таблиця руста</span>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
