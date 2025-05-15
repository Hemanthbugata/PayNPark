import React, { useState } from "react";
import EmailLoginForm from "./Login";
import EmailSignupForm from "./Signup";
import GoogleLoginButton from "./GoogleLogin";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex overflow-hidden">
        <div className="flex-1 p-10 flex flex-col justify-center bg-blue-700 text-white">
          <img src="/logo.png" alt="Logo" className="h-14 mb-6" />
          <h2 className="text-2xl font-bold mb-2">
            You need to sign in or create an account to continue.
          </h2>
        </div>
        <div className="flex-1 p-10 flex flex-col justify-center">
          <button className="w-full py-3 mb-4 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-semibold hover:bg-gray-100">
            <span className="mr-2 text-2xl"></span> Continue with Apple
          </button>
          <GoogleLoginButton setUser={setUser} />
          {showLogin ? (
            <>
              <EmailLoginForm setUser={setUser} />
              <button
                className="w-full py-3 mt-2 border border-blue-500 text-blue-700 rounded-lg font-semibold hover:bg-blue-50"
                onClick={() => setShowLogin(false)}
              >
                Sign up with email
              </button>
            </>
          ) : (
            <>
              <EmailSignupForm setUser={setUser} />
              <button
                className="w-full py-3 mt-2 border border-blue-500 text-blue-700 rounded-lg font-semibold hover:bg-blue-50"
                onClick={() => setShowLogin(true)}
              >
                Login with email
              </button>
            </>
          )}
          <p className="text-xs text-gray-500 mt-6">
            By continuing you agree with our{" "}
            <a href="#" className="underline text-blue-700">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-blue-700">
              Terms & Conditions
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}