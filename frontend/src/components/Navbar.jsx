import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-blue-700 shadow">
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-10 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <span
          className="ml-2 text-white font-bold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          ParkNpay
        </span>
      </div>
      <div className="flex items-center space-x-8">
        <Link to="/find-parking" className="text-white hover:text-blue-200">
          FindParking
        </Link>
        <Link to="/rent-out" className="text-white hover:text-blue-200">
          Rent Out Own Space
        </Link>
        <Link to="/company" className="text-white hover:text-blue-200">
          Company
        </Link>
        {!user ? (
          <>
            <Link to="/signup" className="text-white hover:text-blue-200">
              SignUp
            </Link>
            <Link to="/login" className="text-white hover:text-blue-200">
              Login
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-blue-200 font-semibold">{user.name}</span>
            <button
              onClick={onLogout}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}