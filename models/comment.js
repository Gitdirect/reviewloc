import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
    pageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
    author: { type: String },
    createdAt: { type: Date, required: true, unique: true, default: Date.now },
    body: { type: String, unique: true, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    hide: { type: Boolean, default: false },
    managing: { type: [Number], default: [2, 0, 3, 5] }
});

export default mongoose.model('Comment', CommentSchema);