import Moment from "react-moment";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";
import uuid from "react-uuid";
import { thead } from "../utils/thead";

const Table = ({ sortData, users }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            <tr
              key={uuid()}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
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
              <td className="py-4 px-6"> {user.email}</td>
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
              <td>Edit</td>
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
