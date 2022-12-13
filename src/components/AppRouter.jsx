import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { ADD_USERS_ROUTE, LOGIN_ROUTE } from "../utils/consts";

const AppRouter = () => {
  const user = false;

  return user ? (
    <>
      <Routes>
        {privateRoutes.map(({ path, Component }) => (
          <Route path={path} element={<Component />} exact={true} key={path} />
        ))}
        <Route path="*" element={<Navigate to={ADD_USERS_ROUTE} replace />} />
      </Routes>
    </>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} exact={true} key={path} />
      ))}
      <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRouter;
