import React, { useState } from "react";
import "../styles/Profile.css";

export default function Profile({ user }) {
  if (!user) return <div className="profile-message">Please log in.</div>;

  const [firstName, setFirstName] = useState(user.name.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user.name.split(" ").slice(1).join(" ") || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [email, setEmail] = useState(user.email);
  const [editingEmail, setEditingEmail] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleEmailEdit = () => setEditingEmail(true);
  const handleEmailSave = () => setEditingEmail(false);

  const handleResetPassword = () => {
    alert("Password reset link sent to your email.");
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    // TODO: Replace with your backend update logic
    // await fetch("/api/update-profile", { ... });
    setTimeout(() => setSaving(false), 1000); // Simulate save
    alert("Profile updated!");
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Account information</h2>
      <div className="profile-desc">
        You can edit your ParkNPay profile information below.
      </div>
      <div className="profile-row-flex">
        <div className="profile-col">
          <label className="profile-label">First name</label>
          <input
            className="profile-input"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="profile-col">
          <label className="profile-label">Last name</label>
          <input
            className="profile-input"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="profile-row">
        <label className="profile-label">Phone number</label>
        <input
          className="profile-input"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          style={{ width: "50%" }}
        />
      </div>
      <div className="profile-row profile-row-email">
        <div style={{ flex: 1 }}>
          <label className="profile-label">Email Address</label>
          <input
            className="profile-input"
            value={email}
            disabled={!editingEmail}
            style={{ background: editingEmail ? "#fff" : "#f5f5f5" }}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        {!editingEmail ? (
          <button className="profile-edit-btn" onClick={handleEmailEdit}>Edit</button>
        ) : (
          <button className="profile-edit-btn" onClick={handleEmailSave}>Save</button>
        )}
      </div>
      <div className="profile-verified">
        <span className="profile-verified-dot">●</span> Email verified
      </div>
      <div className="profile-row">
        <label className="profile-label">Password</label>
        <button className="profile-reset-btn" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
      <div style={{ marginTop: 32, textAlign: "right" }}>
        <button
          className="profile-save-btn"
          onClick={handleSaveChanges}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}