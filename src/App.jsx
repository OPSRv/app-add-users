import React from "react";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div>
      <header>
        <NavBar />
        <AppRouter />
      </header>
    </div>
  );
};
export default App;
