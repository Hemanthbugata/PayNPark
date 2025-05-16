import React from "react";
import "../styles/Profile.css";

export default function Profile({ user }) {
  if (!user) return <div className="profile-message">Please log in.</div>;
  const [firstName, ...rest] = user.name.split(" ");
  const lastName = rest.join(" ");
  return (
    <div className="profile-container">
      <h2 className="profile-title">
        Account information
      </h2>
      <div className="profile-row">
        First name: <span className="profile-value">{firstName}</span>
      </div>
      <div className="profile-row">
        Last name: <span className="profile-value">{lastName}</span>
      </div>
      <div className="profile-row">
        Email: <span className="profile-value">{user.email}</span>
      </div>
    </div>
  );
}