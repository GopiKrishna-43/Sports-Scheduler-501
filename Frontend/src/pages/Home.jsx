import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">

      <header className="page-heading">
        <h1>Sports Scheduler</h1>
      </header>

      {/* ✅ New message section */}
      <div className="home-message">
        <p>
          Welcome!  Here you can create sports events, join practice sessions,
          and keep track of all upcoming matches in one convenient place.
        </p>
      </div>

      <div className="hero">
        <div className="hero-text">
          <h1>Welcome to Sports Scheduler</h1>
          <p>Manage matches, practices, and tournaments easily.</p>
          <Link to="/events" className="hero-btn">
            Go to Events
          </Link>
        </div>

        <img
          src="/images/hero.png"
          alt="Sports Hero"
          className="hero-img"
        />
      </div>

      <div className="calendar-section">
        <h2>Upcoming Events</h2>
        <p>Check your upcoming matches, practices, and tournaments in one place.</p>
        <Link to="/events" className="calendar-btn">
          View All Events
        </Link>
      </div>
    </div>
  );
}
