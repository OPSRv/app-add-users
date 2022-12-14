import { useEffect, useState } from "react";
import firebase from "../firebase";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

import { ReactComponent as ArrowRight } from "../assets/svg/arrowright.svg";
import { ReactComponent as ArrowLeft } from "../assets/svg/arrowleft.svg";

import Loader from "./Loader";
import Table from "./Table";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const db = getFirestore(firebase);
  const q = query(collection(db, "users")); // where("capital", "==", true)

  const getUsers = async () => {
    const querySnapshot = await getDocs(q);
    const userData = [];
    querySnapshot.forEach((doc) => {
      userData.push(doc.data());
    });
    if (userData) {
      setIsLoading(false);
    }
    setUsers(userData);
  };

  const sortData = (id, type) => {
    const copyData = [...users];
    console.log(copyData[0][id]);
    let compare;

    console.log("type - ", type);

    switch (type) {
      case "number":
        compare = (rowA, rowB) => {
          return rowA[id] - rowB[id];
        };
        break;
      case "string":
        compare = (rowA, rowB) => {
          return rowA[id].toLowerCase() > rowB[id].toLowerCase() ? 1 : -1;
        };
        break;
      case "date":
        compare = (rowA, rowB) => {
          return rowA[id].seconds - rowB[id].seconds;
        };
        break;
      default:
        break;
    }
    const sortData = copyData.sort(compare);
    if (isSorted) setUsers(sortData.reverse());
    setIsSorted((isSorted) => !isSorted);
    setUsers(sortData);
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-[100%] max-w-[1000px] scroll-smooth table-wrapper">
      <Table sortData={sortData} users={users} />
      <nav className="nav-pagination" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {users.length}
          </span>
        </span>
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <span className="pagination-left">
              <span className="sr-only">Previous</span>
              <ArrowLeft />
            </span>
          </li>
          <li>
            <span className="pagination_number">1</span>
          </li>
          <li>
            <span className="pagination_number">2</span>
          </li>
          <li>
            <span aria-current="page" className="pagination_number">
              3
            </span>
          </li>
          <li>
            <span className="pagination_number">...</span>
          </li>
          <li>
            <span className="pagination_number">100</span>
          </li>
          <li>
            <span className="pagination-right">
              <span className="sr-only">Next</span>
              <ArrowRight />
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserTable;
