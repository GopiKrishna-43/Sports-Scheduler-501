import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    type: "",
  });
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };
    fetchEvents();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/events/${editingId}`, form);
        setEditingId(null);
      } else {
        await API.post("/events", form);
      }
      setForm({ title: "", description: "", date: "", type: "" });
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Error saving event.");
      }
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date.slice(0, 16),
      type: event.type,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await API.delete(`/events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Error deleting event.");
      }
    }
  };

  // Map event type to public images
  const getImage = (type) => {
    switch (type.toLowerCase()) {
      case "match":
        return "/images/match.png";
      case "practice":
        return "/images/practice.png";
      case "tournament":
        return "/images/tournament.png";
      default:
        return "/images/default.png";
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{editingId ? "Edit Event" : "Add Event"}</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <input
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          name="type"
          placeholder="Type (Match, Practice...)"
          value={form.type}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Event</button>
      </form>

      <h3>All Events</h3>
      <div className="events-grid">
        {events.map((e) => (
          <div key={e._id} className="event-card">
            <img src={getImage(e.type)} alt={e.type} className="event-img" />
            <h4>{e.title}</h4>
            <p>{e.description}</p>
            <p>{new Date(e.date).toLocaleString()}</p>
            <p><b>Type:</b> {e.type}</p>
            <div className="event-buttons">
              <button onClick={() => handleEdit(e)}>Edit</button>
              <button onClick={() => handleDelete(e._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
