import { NavLink } from "react-router-dom";

const Navigation = () => {
  let activeStyle = {
    textDecoration: "underline",
  };

  let noActive = {
    color: "rgb(17 24 39)",
  };

  let activeClassName = "underline";

  return (
    <div className="flex gap-4 items-center pr-4 text-white">
      <div className="btn-navigation">
        <NavLink
          to="users"
          className={({ isActive }) => (isActive ? activeClassName : noActive)}
        >
          Users
        </NavLink>
      </div>
      <div className="btn-navigation">
        <NavLink
          to="add-user"
          style={({ isActive }) => (isActive ? activeStyle : noActive)}
        >
          Add user
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
