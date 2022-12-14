import { useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import { ReactComponent as Edit } from "../assets/svg/edit.svg";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";
import { thead } from "../utils/thead";
import logo from "../assets/img/logo.png";

const Table = ({ sortData, users }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-1 rounded-lg relative ">
      <thead className="thead">
        <tr>
          {thead.map((th) => (
            <th
              scope="col"
              className="py-3 px-6 cursor-pointer hover:bg-gray-600 whitespace-nowrap"
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
                {user.avatar ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={`${user.avatar.img}`}
                    alt="Jeseimage"
                  />
                ) : (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={`${logo}`}
                    alt="Jeseimage"
                  />
                )}
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
              <td className="py-4 px-6 whitespace-nowrap">
                <Moment format="DD/MM/YYYY" unix>
                  {user.dateOfBirth.seconds}
                </Moment>
              </td>
              <td className="hover:text-violet-900 cursor-pointer">
                <div className=" inset-0 flex items-center justify-center">
                  <Link to={user.uuid_code}>
                    <Edit />
                  </Link>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr></tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
