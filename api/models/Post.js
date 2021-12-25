const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
}, {
    _id: false, // omit _id fields for subfields
    timestamps: true // timestamps options for subfields
});

const MainCommentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    userId: { type: String, required: true },
    subcomments: [CommentSchema],
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
}, {
    _id: false,
    timestamps: false
});

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    subTitle: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    categories: {
        default: undefined,
        type: Array,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    comments: [MainCommentSchema]
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema)