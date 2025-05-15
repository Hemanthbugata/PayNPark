import React from "react";

export default function Profile({ user }) {
  if (!user) return <div className="p-8">Please log in.</div>;
  const [firstName, ...rest] = user.name.split(" ");
  const lastName = rest.join(" ");
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Account information
      </h2>
      <div className="mb-2">
        First name: <span className="font-semibold">{firstName}</span>
      </div>
      <div className="mb-2">
        Last name: <span className="font-semibold">{lastName}</span>
      </div>
      <div className="mb-2">
        Email: <span className="font-semibold">{user.email}</span>
      </div>
    </div>
  );
}