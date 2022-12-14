import { Fragment, useContext } from "react";
import { Context } from "../index";

import { Menu, Transition } from "@headlessui/react";
import { ReactComponent as LogOut } from "../assets/svg/logout.svg";


const UserMenu = ({ user }) => {
  const { auth } = useContext(Context);

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left font-mono">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="flex items-center">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="rounded-full w-[32px] h-[32px]"
              />{" "}
              <span className="ml-4 hover:opacity-90 text-base font-light">
                Hello,{" "}
                <span className="text-violet-600 font-bold">
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
          <Menu.Items className="absolute right-0 mt-3 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                    Log out
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
