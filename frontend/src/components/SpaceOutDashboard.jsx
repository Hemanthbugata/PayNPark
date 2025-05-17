import React, { useEffect, useState } from "react";
import "../styles/FindParking.css";

export default function SpaceOutDashboard({ owner, onLogout }) {
  const [spots, setSpots] = useState([]);
  const [form, setForm] = useState({ location: "", pricePerHour: "", description: "", isAvailable: true, photos: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch all spots and filter by owner
  useEffect(() => {
    async function fetchSpots() {
      const res = await fetch("http://localhost:4000/parkingspots/all");
      const data = await res.json();
      // Filter spots by owner._id
      setSpots(data.filter(spot => spot.owner && spot.owner._id === owner._id));
    }
    if (owner?._id) fetchSpots();
  }, [owner]);

  // Add or update spot
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("spaceowner_token");
    if (editingId) {
      // Update
      await fetch(`http://localhost:4000/parkingspots/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          id: editingId,
          location: { address: form.location },
          pricePerHour: form.pricePerHour,
          isAvailable: form.isAvailable,
          photos: form.photos,
          description: form.description,
        }),
      });
    } else {
      // Add
      await fetch("http://localhost:4000/parkingspots/add", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          owner: owner._id,
          location: { address: form.location },
          pricePerHour: form.pricePerHour,
          isAvailable: form.isAvailable,
          photos: form.photos,
          description: form.description,
        }),
      });
    }
    setForm({ location: "", pricePerHour: "", description: "", isAvailable: true, photos: "" });
    setEditingId(null);
    // Refresh spots
    const res = await fetch("http://localhost:4000/parkingspots/all");
    const data = await res.json();
    setSpots(data.filter(spot => spot.owner && spot.owner._id === owner._id));
  };

  // Delete spot
  const handleDelete = async (id) => {
    const token = localStorage.getItem("spaceowner_token");
    await fetch(`http://localhost:4000/parkingspots/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    setSpots(spots.filter(s => s._id !== id));
  };

  // Edit spot
  const handleEdit = (spot) => {
    setForm({
      location: spot.location.address,
      pricePerHour: spot.pricePerHour,
      description: spot.description,
      isAvailable: spot.isAvailable,
      photos: spot.photos || "",
    });
    setEditingId(spot._id);
  };

  return (
    <div className="spaceowner-dashboard" style={{ maxWidth: 700, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 4px 24px rgba(37,99,235,0.08)", padding: 32 }}>
      <h2 style={{ color: "#2563eb", marginBottom: 16 }}>My Parking Spots</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <input
          className="find-parking-input"
          placeholder="Location Address"
          value={form.location}
          onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
          required
        />
        <input
          className="find-parking-input"
          placeholder="Price per hour"
          type="number"
          value={form.pricePerHour}
          onChange={e => setForm(f => ({ ...f, pricePerHour: e.target.value }))}
          required
        />
        <input
          className="find-parking-input"
          placeholder="Photo URL"
          value={form.photos}
          onChange={e => setForm(f => ({ ...f, photos: e.target.value }))}
        />
        <textarea
          className="find-parking-input"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          rows={2}
        />
        <button className="find-parking-btn" style={{ background: "#2563eb" }} type="submit">
          {editingId ? "Update Spot" : "Add Spot"}
        </button>
        {editingId && (
          <button type="button" className="find-parking-btn" style={{ background: "#bbb", marginLeft: 8 }} onClick={() => { setEditingId(null); setForm({ location: "", pricePerHour: "", description: "", isAvailable: true, photos: "" }); }}>
            Cancel
          </button>
        )}
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {spots.map(spot => (
          <li key={spot._id} style={{ borderBottom: "1px solid #e3e8f0", padding: "12px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 500 }}>{spot.location.address}</div>
              <div style={{ color: "#2563eb" }}>₹{spot.pricePerHour}/hr</div>
              <div style={{ fontSize: 14, color: "#666" }}>{spot.description}</div>
              {spot.photos && <img src={spot.photos} alt="spot" style={{ width: 80, marginTop: 4, borderRadius: 6 }} />}
            </div>
            <div>
              <button className="find-parking-btn" style={{ background: "#2563eb", marginRight: 8 }} onClick={() => handleEdit(spot)}>Edit</button>
              <button className="find-parking-btn" style={{ background: "#e11d48" }} onClick={() => handleDelete(spot._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="find-parking-btn" style={{ background: "#2563eb", marginTop: 24 }} onClick={onLogout}>Log out</button>
    </div>
  );
}