import React from "react";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to ParkNpay!</h1>
      <p className="home-description">
        Find and rent parking spaces easily. Sign up or log in to get started.
      </p>
    </div>
  );
}