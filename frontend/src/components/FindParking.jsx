import React, { useState } from "react";
import "../styles/FindParking.css";

export default function FindParking() {
  const [location, setLocation] = useState("");
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const [tab, setTab] = useState("hourly");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your search logic here
    alert(`Searching for parking at ${location} from ${from} until ${until}`);
  };

  return (
    <div className="find-parking-container">
      <div className="find-parking-left">
        <h1 className="find-parking-title">
          The <span className="highlight">smartest way</span> to find park
        </h1>
        <h2 className="find-parking-subtitle" style={{
                fontWeight: 1000,
                fontSize: "1.45rem",
                color: "darkblue",
                lineHeight: "1.5",
                margin: "10px 0 24px 0",
                display: "flex",
                alignItems: "center",
                gap: "12px"
                }}>
                <img src="/car-icon.png" alt="Car" style={{ width: 32, height: 32, verticalAlign: "middle" }} />
                No More Circling the Block
                <img src="/location-icon.png" alt="Location" style={{ width: 28, height: 28, verticalAlign: "middle" }} />
                Just Arrive and Park
        </h2>
        <div className="find-parking-badges">
          <span>🛡️ Best price guarantee</span>
          <span>👍 Trusted by 13m+ drivers</span>
          <span>🅿️ 100k+ reservable spaces</span>
        </div>
        <p className="find-parking-desc">
            Park with confidence and save money—join 13M+ drivers who've ditched parking stress
            <br />
            <br />
             for guaranteed spots at the best prices, just a tap away.        </p>
        <form className="find-parking-form" onSubmit={handleSubmit}>
          <div className="find-parking-tabs">
            <button
              type="button"
              className={`find-parking-tab${tab === "hourly" ? " active" : ""}`}
              onClick={() => setTab("hourly")}
            >
              Hourly/Daily
            </button>
            <button
              type="button"
              className={`find-parking-tab${tab === "monthly" ? " active" : ""}`}
              onClick={() => setTab("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`find-parking-tab${tab === "airport" ? " active" : ""}`}
              onClick={() => setTab("airport")}
            >
              <span role="img" aria-label="airport">✈️</span> Airport
            </button>
          </div>
          <label className="find-parking-label">Park at</label>
          <input
            type="text"
            className="find-parking-input"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Enter a place or postcode"
            required
          />
          <div className="find-parking-dates">
            <div className="find-parking-date-group">
              <label className="find-parking-date-label">From</label>
              <input
                type="datetime-local"
                className="find-parking-input"
                value={from}
                onChange={e => setFrom(e.target.value)}
                required
              />
            </div>
            <div className="find-parking-date-group">
              <label className="find-parking-date-label">Until</label>
              <input
                type="datetime-local"
                className="find-parking-input"
                value={until}
                onChange={e => setUntil(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="find-parking-btn" type="submit">
            Show parking spaces
          </button>
        </form>
      </div>
      <div className="find-parking-image">
        <img
          src="/Parking.jpg"
          className="find-parking-img"
        />
      </div>
    </div>
  );
}