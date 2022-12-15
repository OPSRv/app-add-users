import * as React from "react";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { Context } from "../index";
import UserMenu from "./UserMenu";
import Navigation from "./Navigation";

const NavBar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  if (!user) {
    return null;
  }

  return (
    <>
      <nav className="nav">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <div className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white font-mono flex items-center ">
              ADD
              <Logo className="h-6 mx-1 sm:h-9" />
              USERS
            </span>
          </div>
          <div className="flex align-middle">
            <Navigation />
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
