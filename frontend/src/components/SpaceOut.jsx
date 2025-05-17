import React, { useState, useEffect } from "react";
import SpaceOutDashboard from "./SpaceOutDashboard";
import "../styles/FindParking.css";

export default function SpaceOut() {
  const [step, setStep] = useState("login"); // "login" | "signup" | "dashboard"
  const [owner, setOwner] = useState(null);

  // Auth states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Persist login on refresh
  useEffect(() => {
    const storedOwner = localStorage.getItem("spaceowner_owner");
    const token = localStorage.getItem("spaceowner_token");
    if (storedOwner && token) {
      setOwner(JSON.parse(storedOwner));
      setStep("dashboard");
    }
  }, []);

  // Handle owner signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/spaceowner/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Signup successful! Awaiting admin approval.");
      setStep("login");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  // Handle owner login
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/spaceowner/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.token && data.owner) {
      localStorage.setItem("spaceowner_token", data.token);
      localStorage.setItem("spaceowner_owner", JSON.stringify(data.owner));
      setOwner(data.owner);
      setStep("dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("spaceowner_token");
    localStorage.removeItem("spaceowner_owner");
    setOwner(null);
    setStep("login");
  };

  if (step === "dashboard" && owner) {
    return <SpaceOutDashboard owner={owner} onLogout={handleLogout} />;
  }

  return (
    <div className="find-parking-container">
      <div className="find-parking-left">
        <h1 className="find-parking-title">
          Rent out your <span className="highlight">parking space</span>
        </h1>
        <div className="find-parking-desc">
          List your mall, shop, or private parking area and earn by sharing your space!
        </div>
        <div style={{ maxWidth: 400 }}>
          {step === "login" && (
            <form className="find-parking-form" onSubmit={handleLogin}>
              <h2 style={{ marginBottom: 16, color: "#2563eb" }}>Space Owner Login</h2>
              <input
                className="find-parking-input"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                className="find-parking-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button className="find-parking-btn" style={{ background: "#2563eb" }} type="submit">
                Login
              </button>
              <div style={{ marginTop: 12 }}>
                Don't have an account?{" "}
                <span style={{ color: "#2563eb", cursor: "pointer" }} onClick={() => setStep("signup")}>Sign up</span>
              </div>
            </form>
          )}
          {step === "signup" && (
            <form className="find-parking-form" onSubmit={handleSignup}>
              <h2 style={{ marginBottom: 16, color: "#2563eb" }}>Space Owner Signup</h2>
              <input
                className="find-parking-input"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input
                className="find-parking-input"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                className="find-parking-input"
                placeholder="Phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
              <input
                className="find-parking-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button className="find-parking-btn" style={{ background: "#2563eb" }} type="submit">
                Sign up
              </button>
              <div style={{ marginTop: 12 }}>
                Already have an account?{" "}
                <span style={{ color: "#2563eb", cursor: "pointer" }} onClick={() => setStep("login")}>Login</span>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="find-parking-image">
        <img src="/Parking.jpg" className="find-parking-img" alt="Parking" />
      </div>
    </div>
  );
}