import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import firebase from "../firebase";
import Loader from "./Loader";
import Pagination from "./Pagination";
import Table from "./Table";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);

  const db = getFirestore(firebase);
  const q = query(collection(db, "users")); // where("capital", "==", true)

  const getUsers = async () => {
    const querySnapshot = await getDocs(q);
    const userData = [];
    querySnapshot.forEach((doc) => {
      userData.push(doc.data());
    });
    if (userData) {
      setLoading(false);
    }
    setUsers(userData);
  };

  const sortData = (id, type) => {
    const copyData = [...users];
    let compare;

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

  if (loading) {
    return <Loader />;
  }

  const lastUsersIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUsersIndex - usersPerPage;
  const currentUser = users.slice(firstUserIndex, lastUsersIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const allPages = Math.ceil(users.length / usersPerPage);
  const nextPage = () => {
    if (allPages !== currentPage) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <div className="overflow-x-auto overflow-y-auto relative shadow-md sm:rounded-t-lg w-[100%] max-w-7xl scroll-smooth table-wrapper px-0 lg:px-5">
        <Table sortData={sortData} users={currentUser} />
      </div>
      <div className="shadow-md sm:rounded-lg w-[100%] max-w-7xl scroll-smooth  px-0 lg:px-5">
        <Pagination
          length={currentUser.length}
          usersPerPage={usersPerPage}
          totalUsers={users.length}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default UserTable;
