import { Link } from "react-router-dom";
import { isLoggedIn, logout } from "../auth";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> | <Link to="/events">Events</Link> |{" "}
      {!isLoggedIn() ? (
        <>
          <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </>
      ) : (
        <button onClick={logout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      )}
    </nav>
  );
}
