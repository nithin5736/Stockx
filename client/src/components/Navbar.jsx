import React from "react";
import { apiURL } from "../utils/APIRoutes";

const Navbar = ({ user }) => {
  const logout = () => {
    localStorage.clear();
    window.open(`${apiURL}/auth/logout`, "_self");
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/home">
        Stockx Dashboard
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="/home">
            Home
          </a>
          <a class="nav-item nav-link active" href="/table">
            Stock Table
          </a>
          <a class="nav-item nav-link active">{user && user.name}</a>
          <a class="nav-item nav-link active" onClick={logout}>
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
