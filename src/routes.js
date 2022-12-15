import { USERS, LOGIN_ROUTE, ADD_USER, EDIT_USER } from "./utils/consts";
import Login from "./components/Login";
import AddUsers from "./components/MainLayout";
import AddUserForm from "./components/AddUserForm";
import EditUser from "./components/EditUser";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];

export const privateRoutes = [
  {
    path: USERS,
    Component: AddUsers,
  },
  {
    path: ADD_USER,
    Component: AddUserForm,
  },
  {
    path: EDIT_USER,
    Component: EditUser,
  },
];
