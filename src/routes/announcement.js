const { Announcement } = require("../models/announcement");
const express = require("express");
const announcementRouter = express.Router();

// Get all announcements
announcementRouter.get("/annoucements", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Error fetching announcements" });
  }
});

// Get a single announcement by ID
announcementRouter.get("/annoucements/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ error: "Not found" });
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ error: "Error fetching announcement" });
  }
});

// Create a new announcement (Only accessible by Faculty or Admin)
announcementRouter.post("/annoucements", async (req, res) => {
  try {
    const { title, content, postedBy, userType, audience } = req.body;

    if (!title || !content || !postedBy || !userType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newAnnouncement = new Announcement({
      title,
      content,
      postedBy,
      userType,
      audience,
    });

    await newAnnouncement.save();
    res.status(201).json({ message: "Announcement created", newAnnouncement });
  } catch (error) {
    res.status(500).json({ error: "Error creating announcement" });
  }
});

// Delete an announcement (Only accessible by Admin)
announcementRouter.delete("/annoucements/:id", async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAnnouncement)
      return res.status(404).json({ error: "Announcement not found" });

    res.status(200).json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting announcement" });
  }
});

module.exports = announcementRouter;
