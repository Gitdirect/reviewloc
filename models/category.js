import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    breadcrumbs: [{
        type: Number,
        required: true
    }],
    managing: { type: [Number], default: [3, 0, 3, 5] }
});

export default mongoose.model('Category', CategorySchema);