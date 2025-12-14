const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Event = require("../models/Event");

// Get all events
router.get("/", auth, async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "username");
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create event
router.post("/", auth, async (req, res) => {
  const { title, description, date, type } = req.body;
  try {
    const newEvent = new Event({
      title,
      description,
      date,
      type,
      createdBy: req.user.id
    });
    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update event
router.put("/:id", auth, async (req, res) => {
  const { title, description, date, type } = req.body;
  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });
    if (event.createdBy.toString() !== req.user.id) return res.status(401).json({ msg: "Not authorized" });

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.type = type || event.type;

    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete event
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });
    if (event.createdBy.toString() !== req.user.id) return res.status(401).json({ msg: "Not authorized" });

    await event.remove();
    res.json({ msg: "Event removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
