const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  premium: { type: Boolean, default: false },
  DA: { type: Number, required: true, min: 0, max: 100 },
  PA: { type: Number, required: true, min: 0, max: 100 },
  DR: { type: Number, required: true, min: 0, max: 100 },
});

const delteRequestSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const deleteRequest = mongoose.model("deleteRequests", delteRequestSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = { Post, deleteRequest };
