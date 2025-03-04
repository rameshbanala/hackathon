const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, refPath: "userType" }, // Can be Faculty or Admin
  userType: { type: String, enum: ["Faculty", "Admin"], required: true },
  audience: {
    type: [String],
    enum: ["student", "faculty", "all"],
    default: ["all"],
  },
  createdAt: { type: Date, default: Date.now },
});

const Announcement = mongoose.model("Announcement", announcementSchema);
module.exports = { Announcement };
