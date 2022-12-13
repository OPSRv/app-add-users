import { ADD_USERS_ROUTE, LOGIN_ROUTE } from "./utils/consts";
import Login from "./components/Login";
import AddUsers from "./components/AddUsers";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];

export const privateRoutes = [
  {
    path: ADD_USERS_ROUTE,
    Component: AddUsers,
  },
];
