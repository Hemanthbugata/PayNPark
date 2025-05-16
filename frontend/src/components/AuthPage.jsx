import React, { useState } from "react";
import EmailLoginForm from "./Login";
import EmailSignupForm from "./Signup";
import GoogleLoginButton from "./GoogleLogin";
import "../styles/AuthPage.css";


export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="authpage-container">
      <div className="authpage-card">
        <div className="authpage-left">
          <img src="/logo.png" alt="Logo" className="authpage-logo" />
          <h2 className="authpage-title">
            You need to sign in or create an account to continue.
          </h2>
        </div>
        <div className="authpage-right">
          <GoogleLoginButton setUser={setUser} />
          {showLogin ? (
            <>
              <EmailLoginForm setUser={setUser} />
              <button
                className="toggle-btn"
                onClick={() => setShowLogin(false)}
              >
                Sign up with email
              </button>
            </>
          ) : (
            <>
              <EmailSignupForm setUser={setUser} />
              <button
                className="toggle-btn"
                onClick={() => setShowLogin(true)}
              >
                Login with email
              </button>
            </>
          )}
          <p className="authpage-policy">
            By continuing you agree with our{" "}
            <a href="#" className="authpage-link">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="authpage-link">
              Terms & Conditions
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}