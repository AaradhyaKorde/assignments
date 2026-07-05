const express = require('express');
const router = express.Router();
const Feed = require('../models/feed');

router.post("/", async (req, res) =>{
    try{
    const feed = await Feed.create(req.body);
    res.json(feed);
} catch (err){
    res.status(500).json({message: err.message})
}
})

router.get("/", async (req, res) =>{
    try{
    const feed = await Feed.find();
    res.json(feed);
} catch (err){
    res.status(500).json({message: err.message})
}
})

// router.get("/:id", async (req, res) =>{
//     try{
//     const feed = await Feed.findById(req.params.id);
//     res.json(feed);
// } catch (err){
//     res.status(500).json({message: err.message})
// }
// })

router.put("/:id", async (req, res) =>{
    try{
    const feed = await Feed.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(feed);
} catch (err){
    res.status(500).json({message: err.message})
}
})

router.delete("/:id", async (req, res) =>{
    try{
    const feed = await Feed.findByIdAndDelete(req.params.id);
    res.json({message: "Feed Deleted Successfully"});
} catch (err){
    res.status(500).json({message: err.message})
}
})

router.put ("/:id/like", async (req,res) =>{
    try{
        const feed = await Feed.findById(req.params.id); //test this
        feed.likes++;
        await feed.save();
        res.json(feed);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.put ("/:id/dislike", async (req,res) =>{
    try{
        const feed = await Feed.findById(req.params.id); //test this
        feed.dislikes++;
        await feed.save();
        res.json(feed);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

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

  router.delete("/:feedId/comments/:commentId/", async (req, res) => {
    try {
      const feed = await Feed.findById(req.params.feedId);
  
      const comment = feed.comments.id(req.params.commentId);
  
      comment.remove();
  
      await feed.save();
  
      res.json({message: "Comment Deleted Successfully"});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
module.exports = router;