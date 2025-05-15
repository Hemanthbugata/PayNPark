import React, { useState } from "react";

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
    <form onSubmit={handleSignup} className="mb-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        required
        className="w-full px-4 py-2 mb-2 border border-gray-300 rounded"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-4 py-2 mb-2 border border-gray-300 rounded"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
        className="w-full px-4 py-2 mb-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
      >
        Sign up with email
      </button>
    </form>
  );
}