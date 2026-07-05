const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    user: String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0 
    },})

const feedSchema = new mongoose.Schema({
    title: String,
    body: String,
    user: String,
    createdAt:{
        type:Date,
        default:Date.now
    },
        likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0 
    },
    comments: [commentSchema]
})
module.exports = mongoose.model("Feed", feedSchema);