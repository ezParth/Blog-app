const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
}, {
    timestamps: true,
})

const postModel = mongoose.model('post', postSchema);

module.exports = postModel