import { NavLink } from "react-router-dom";

const Navigation = () => {
  let activeStyle = {
    textDecoration: "underline",
    color: "white",
  };

  let noActive = {
    color: "silver",
  };

  let activeClassName = "underline";

  return (
    <ul className="flex gap-4 items-center pr-4 text-white">
      <li className="btn">
        <NavLink
          to="users"
          className={({ isActive }) => (isActive ? activeClassName : noActive)}
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
  );
};

export default Navigation;
