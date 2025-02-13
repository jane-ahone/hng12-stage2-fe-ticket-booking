import "./Poster.css";

const Poster = () => {
  return (
    <div className="poster-container">
      <div className="container-1">
        <h1 className="event-title">Techember Fest "25</h1>
        <p className="event-description">
          Join us for an unforgettable experience at [Event Name]! Secure your
          spot now.
        </p>
      </div>
      <div className="container-2">
        <p>📍 [Event Location]</p>
        <p>March 15, 2025 | 7:00 PM</p>
      </div>
    </div>
  );
};

export default Poster;
