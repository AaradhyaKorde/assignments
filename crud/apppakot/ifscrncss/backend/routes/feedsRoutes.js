const express = require("express");
const router = express.Router();
const Feed = require("../models/feed");

// Create Feed
router.post("/", async (req, res) => {
  try {
    const feed = await Feed.create(req.body);
    res.json(feed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Feeds (Infinite Scroll)
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const feeds = await Feed.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(feeds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Feed
router.put("/:id", async (req, res) => {
  try {
    const feed = await Feed.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(feed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Feed
router.delete("/:id", async (req, res) => {
  try {
    await Feed.findByIdAndDelete(req.params.id);

    res.json({
      message: "Feed Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like Feed
router.put("/:id/like", async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.id);

    feed.likes++;

    await feed.save();

    res.json(feed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dislike Feed
router.put("/:id/dislike", async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.id);

    feed.dislikes++;

    await feed.save();

    res.json(feed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Comment
router.post("/:id/comment", async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.id);

    feed.comments.push(req.body);

    await feed.save();

    res.json(feed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like Comment
router.put("/:feedId/comments/:commentId/like", async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.feedId);

    const comment = feed.comments.id(req.params.commentId);

    comment.likes++;

    await feed.save();

    res.json(feed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dislike Comment
router.put("/:feedId/comments/:commentId/dislike", async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.feedId);

    const comment = feed.comments.id(req.params.commentId);

    comment.dislikes++;

    await feed.save();

    res.json(feed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Comment
router.delete("/:feedId/comments/:commentId", async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.feedId);

    const comment = feed.comments.id(req.params.commentId);

    comment.deleteOne();

    await feed.save();

    res.json({
      message: "Comment Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;