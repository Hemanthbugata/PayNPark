import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="/logo.png"
          alt="Logo"
          className="navbar-logo"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="navbar-links">
        <button className="navbar-link" onClick={() => navigate("/find-parking")}>
          FindParking
        </button>
        <button className="navbar-link" onClick={() => navigate("/rent-out")}>
          Rent Out Own Space
        </button>
        <button className="navbar-link" onClick={() => navigate("/company")}>
          Company
        </button>
        {!user ? (
          <>
            <button className="navbar-link" onClick={() => navigate("/signup")}>
              SignUp
            </button>
            <button className="navbar-link" onClick={() => navigate("/login")}>
              Login
            </button>
          </>
        ) : (
          <div className="navbar-user">
            <span className="navbar-username">{user.name}</span>
            <button
              onClick={onLogout}
              className="navbar-link"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}