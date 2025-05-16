import React from "react";
import "../styles/GoogleLogin.css";

export default function GoogleLoginButton({ setUser }) {
  const handleGoogle = () => {
    if (!window.google || !window.google.accounts || !window.google.accounts.id) {
      alert("Google script not loaded. Please refresh and try again.");
      return;
    }
    window.google.accounts.id.initialize({
      client_id: "139695837106-ekfggjfmfunos8imggema02ef3qcmtm4.apps.googleusercontent.com", // Ideally use import.meta.env.VITE_GOOGLE_CLIENT_ID
      callback: async (response) => {
        try {
          const res = await fetch("http://localhost:4000/google-signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: response.credential }),
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
            alert(data.message || "Google sign-in failed");
          }
        } catch (err) {
          alert("Network error during Google sign-in.");
        }
      },
    });
    window.google.accounts.id.prompt();
  };

  return (
    <button
      className="google-btn"
      onClick={handleGoogle}
      type="button"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="G"
        className="google-logo"
      />
      Login with Google
    </button>
  );
}