import * as React from "react";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { Context } from "../index";
import UserMenu from "./UserMenu";

const NavBar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  if (!user) {
    return null;
  }

  let activeStyle = {
    textDecoration: "underline",
    color: "white",
  };

  let noActive = {
    color: "silver",
  };

  let activeClassName = "underline";

  return (
    <>
      <nav className="bg-white  px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 border-b-2 border-violet-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <div className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white font-mono flex items-center">
              ADD
              <Logo className="h-6 mx-1 sm:h-9" />
              USERS
            </span>
          </div>

          <div className="flex align-middle">
            <ul className="flex gap-4 items-center pr-4 text-white">
              <li className="btn">
                <NavLink
                  to="users"
                  className={({ isActive }) =>
                    isActive ? activeClassName : noActive
                  }
                >
                  Users
                </NavLink>
              </li>
              <li className="btn">
                <NavLink
                  to="add-user"
                  style={({ isActive }) => (isActive ? activeStyle : noActive)}
                >
                  Add user
                </NavLink>
              </li>
            </ul>

            <div>
              <UserMenu user={user} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
