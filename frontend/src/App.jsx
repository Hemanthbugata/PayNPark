import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./components/AuthPage";
import Profile from "./components/Profile";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:4000/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.name) setUser(data);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={user ? <Profile user={user} /> : <AuthPage setUser={setUser} />}
        />
        <Route path="/login" element={<AuthPage setUser={setUser} />} />
        <Route path="/signup" element={<AuthPage setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </Router>
  );
}