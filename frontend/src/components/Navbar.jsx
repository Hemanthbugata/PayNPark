import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          Space Rentals
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
          <div className="navbar-user" ref={dropdownRef} style={{ position: "relative" }}>
            <span
              className="navbar-username"
              style={{ cursor: "pointer" }}
              onClick={() => setDropdownOpen((open) => !open)}
            >
              {user.name} &#9662;
            </span>
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "120%",
                  right: 0,
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  minWidth: 180,
                  zIndex: 100,
                  padding: "8px 0"
                }}
              >
                <button className="navbar-link" style={{ width: "100%", textAlign: "left", background: "none", border: "none" }} onClick={() => { navigate("/bookings"); setDropdownOpen(false); }}>
                  Bookings made
                </button>
                <button className="navbar-link" style={{ width: "100%", textAlign: "left", background: "none", border: "none" }} onClick={() => { navigate("/messages"); setDropdownOpen(false); }}>
                  Messages
                </button>
                <button className="navbar-link" style={{ width: "100%", textAlign: "left", background: "none", border: "none" }} onClick={() => { navigate("/billing"); setDropdownOpen(false); }}>
                  Billing & withdrawals
                </button>
                <button className="navbar-link" style={{ width: "100%", textAlign: "left", background: "none", border: "none" }} onClick={() => { navigate("/profile"); setDropdownOpen(false); }}>
                  My profile
                </button>
                <button className="navbar-link" style={{ width: "100%", textAlign: "left", background: "none", border: "none" }} onClick={onLogout}>
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}