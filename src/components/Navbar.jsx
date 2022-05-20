import React from "react";
import { Link, withRouter } from "react-router-dom";
import { getUser, logout } from "../service/authorize";

const Navbar = ({ history }) => {
  return (
    <nav>
      <ul className="nav-tabs nav">
        <li className="nav-item pr-3 pt-3 pb-3">
          <Link to="/" className="nav-link">
            HOME
          </Link>
        </li>

        {!getUser() && (
          <li className="nav-item pr-3 pt-3 pb-3">
            <Link to="/login" className="nav-link">
              LOGIN
            </Link>
          </li>
        )}
        {getUser() && (
          <li className="nav-item pr-3 pt-3 pb-3">
            <Link to="/create" className="nav-link">
              WRITE BLOG
            </Link>
          </li>
        )}
        {getUser() && (
          <li className="nav-item pr-3 pt-3 pb-3">
            <button
              className="nav-link "
              onClick={() => logout(() => history.push("/"))}
            >
              LOGOUT
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default withRouter(Navbar);
