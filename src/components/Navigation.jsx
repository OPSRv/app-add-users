import { Link } from "react-router-dom";
import { ReactComponent as PlusCircle } from "../assets/svg/plus-circle.svg";
import { ReactComponent as User } from "../assets/svg/user.svg";

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
        <Link to="users">
          <span className="-mb-2 pr-3 leading-relaxed">Users</span>
          <User />
        </Link>
      </div>
      <div className="btn-navigation">
        <Link to="add-user ">
          <span className="-mb-2 pr-3 leading-relaxed">Add user</span>
          <PlusCircle />
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
