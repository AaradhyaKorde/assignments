const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post("/", async (req, res) =>{
    try{
    const user = await User.create(req.body);
    res.json(user);
} catch (err){
    res.status(500).json({message: err.message})
}
})

router.get("/", async (req, res) =>{
    try{
    const user = await User.find();
    res.json(user);
} catch (err){
    res.status(500).json({message: err.message})
}
})

router.get("/:id", async (req, res) =>{
    try{
    const user = await User.findById(req.params.id);
    res.json(user);
} catch (err){
    res.status(500).json({message: err.message})
}
})

router.put("/:id", async (req, res) =>{
    try{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(user);
} catch (err){
    res.status(500).json({message: err.message})
}
})

router.delete("/:id", async (req, res) =>{
    try{
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({message: "User Deleted Successfully"});
} catch (err){
    res.status(500).json({message: err.message})
}
})

module.exports = router;