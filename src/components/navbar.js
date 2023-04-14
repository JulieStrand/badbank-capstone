import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark"
      style={{ backgroundColor: "MidnightBlue" }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          data-bs-toggle="tooltip"
          title="Go back to the Home page"
        >
          BadBank Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse nav justify-content-end"
          id="navbarNav"
          style={{ marginRight: "1em" }}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/createaccount"
                data-bs-toggle="tooltip"
                title="Create an account with BadBank"
              >
                Create Account
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/login"
                data-bs-toggle="tooltip"
                title="Log into your account"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/deposit"
                data-bs-toggle="tooltip"
                title="Deposit funds into your account here"
              >
                Deposit
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/withdraw"
                data-bs-toggle="tooltip"
                title="Withdraw funds from your account here"
              >
                Withdraw
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/alldata"
                data-bs-toggle="tooltip"
                title="See information about all users here"
              >
                All Data
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
