import mongoose, { Schema } from 'mongoose';

const BlockedRouteSchema = new Schema({
    router: { type: String },
    method: [String],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('BlockedRoute', BlockedRouteSchema);