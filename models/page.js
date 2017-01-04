import mongoose, { Schema } from 'mongoose';

const PageSchema = new Schema({
    title: { type: String, require: true },
    body: { type: String, require: true },
    createdAt: { type: Date, require: true, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: [Number] },
    managing: { type: [Number], default: [2, 0, 3, 5] }
});

export default mongoose.model('Page', PageSchema);