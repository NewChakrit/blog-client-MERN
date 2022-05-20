import React from "react";

const Navbar = () => {
  return (
    <nav>
      <ul className="nav-tabs nav">
        <li className="nav-item pr-3 pt-3 pb-3">
          <a href="/" className="nav-link">
            HOME
          </a>
        </li>
        <li className="nav-item pr-3 pt-3 pb-3">
          <a href="/create" className="nav-link">
            WRITE BLOG
          </a>
        </li>
        <li className="nav-item pr-3 pt-3 pb-3">
          <a href="/login" className="nav-link">
            LOGIN
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
