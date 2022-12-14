import React from "react";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "./index";
import Loader from "./components/Loader";
import NotFound from "./components/NotFound";
import BlurBackground from "./utils/BlurBackground";

const App = () => {
  const { auth, firestore } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <NotFound />;
  }
  return (
    <div>
      <header>
        <BlurBackground />
        <NavBar />
        <AppRouter />
      </header>
    </div>
  );
};
export default App;
