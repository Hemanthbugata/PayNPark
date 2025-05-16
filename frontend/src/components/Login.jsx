import React, { useState } from "react";
import "../styles/Login.css";

export default function EmailLoginForm({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      const userRes = await fetch("http://localhost:4000/users", {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const userData = await userRes.json();
      setUser(userData);
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="login-input"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
        className="login-input"
      />
      <button
        type="submit"
        className="login-btn"
      >
        Login with email
      </button>
    </form>
  );
}