import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { logout, startLogout } from "../actions/auth";

export const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand mx-3" to="/">
        Table App
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" exact to="/datatable">
            Data Table
          </NavLink>

          <NavLink className="nav-item nav-link" exact to="/gallery">
            Gallery
          </NavLink>
          <NavLink className="nav-item nav-link" exact to="/todo">
            Todo
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse w-200 order-3 dual-collapse2">
        <ul className="navbar-nav ms-auto">
          <button
            className="nav-item nav-link btn"
            onClick={() => dispatch(startLogout())}
          >
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
