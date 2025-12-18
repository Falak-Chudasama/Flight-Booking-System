import mongoose from "mongoose";

const BookingAttemptSchema = new mongoose.Schema({
    flightId: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now, expires: 900 }
});

export default mongoose.model("BookingAttempt", BookingAttemptSchema);