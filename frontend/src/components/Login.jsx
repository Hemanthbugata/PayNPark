import React, { useState } from "react";

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
    <form onSubmit={handleLogin} className="mb-2">
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
        Login with email
      </button>
    </form>
  );
}