import React from "react";

export default function GoogleLoginButton({ setUser }) {
  const handleGoogle = () => {
    window.google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your client ID
      callback: async (response) => {
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
      },
    });
    window.google.accounts.id.prompt();
  };

  return (
    <button
      className="w-full py-3 mb-4 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-semibold hover:bg-gray-100"
      onClick={handleGoogle}
      type="button"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="G"
        className="h-6 mr-2"
      />
      Login with Google
    </button>
  );
}