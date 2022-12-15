import { Link } from "react-router-dom";

const Navigation = () => {
  let activeStyle = {
    textDecoration: "underline",
  };

  let noActive = {
    color: "rgb(17 24 39)",
  };

  let activeClassName = "underline";

  return (
    <div className="flex gap-4 items-center pr-4 text-white text-center sm:text-left">
      <div className="btn-navigation ">
        <Link to="users">Users</Link>
      </div>
      <div className="btn-navigation">
        <Link to="add-user">Add user</Link>
      </div>
    </div>
  );
};

export default Navigation;
