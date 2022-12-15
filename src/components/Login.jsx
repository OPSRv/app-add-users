import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { ReactComponent as Google } from "../assets/svg/google.svg";
import { Context } from "../index";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const { auth } = useContext(Context);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
  };
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div className="isolate h-screen overflow-hidden">
      <div className="relative px-6 lg:px-8  h-screen grid place-items-center">
        <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40 h-screen flex place-items-center ">
          <div className={isOpen ? "blur-lg " : "blur-none transition-all"}>
            <div className="flex select-none">
              <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl text-white">
                Simple App
              </h1>
              <p className="mt-2 pl-2 text-sm leading-8 text-white sm:text-center">
                for add users
              </p>
            </div>

            <div className=" inset-0 flex items-center justify-center mt-6">
              <button type="button" onClick={openModal} className="btn">
                Get started
              </button>
            </div>
          </div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-violet-300/20 bg-opacity-20 p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white text-center"
                      >
                        Welcome
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-white text-center">
                          We are Happy to see you
                        </p>
                      </div>

                      <div className="mt-4 flex justify-center">
                        <button
                          onClick={() => {
                            login();
                            closeModal();
                          }}
                          type="button"
                          className="btn-login"
                        >
                          <Google />
                          <span className="px-2">Login with Google</span>
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
};
export default Login;
