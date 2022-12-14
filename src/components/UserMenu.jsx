import { Fragment, useContext } from "react";
import { Context } from "../index";

import { Menu, Transition } from "@headlessui/react";
import { ReactComponent as LogOut } from "../assets/svg/logout.svg";

const UserMenu = ({ user }) => {
  const { auth } = useContext(Context);

  return (
    <div className="z-50">
      <Menu as="div" className="menu z-50">
        <div>
          <Menu.Button className="menu-btn">
            <div className="flex items-center">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="rounded-full w-[32px] h-[32px]"
              />{" "}
              <span className="ml-2 hover:opacity-90 text-base font-light whitespace-nowrap">
                <span className="text-white font-bold leading-10">
                  {user.displayName}
                </span>
              </span>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="menu-items">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => auth.signOut()}
                    className={`${
                      active ? "bg-violet-900 text-white" : "text-white"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <LogOut />

                    <span className="ml-2">Log out</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserMenu;
