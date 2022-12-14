import React, { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import  firebase  from "./firebase";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

export const Context = createContext(null);

const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

root.render(
  <BrowserRouter>
    <Context.Provider
      value={{
        firebase,
        auth,
        firestore,
      }}
    >
      <App />
    </Context.Provider>
  </BrowserRouter>
);
