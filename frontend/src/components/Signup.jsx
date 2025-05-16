import React, { useState } from "react";
import "../styles/Signup.css";

export default function EmailSignupForm({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role: "user" }),
    });
    const data = await res.json();
    if (res.ok) {
      // Auto-login after signup
      const loginRes = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const loginData = await loginRes.json();
      if (loginData.token) {
        localStorage.setItem("token", loginData.token);
        const userRes = await fetch("http://localhost:4000/users", {
          headers: { Authorization: `Bearer ${loginData.token}` },
        });
        const userData = await userRes.json();
        setUser(userData);
      }
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        required
        className="signup-input"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="signup-input"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
        className="signup-input"
      />
      <button
        type="submit"
        className="signup-btn"
      >
        Sign up with email
      </button>
    </form>
  );
}