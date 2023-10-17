import mongoose from 'mongoose'
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectedUrl: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }]
}, { timestamps: true });

export const URL = mongoose.model("url", urlSchema);
