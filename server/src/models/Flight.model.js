import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema(
    {
        flightId: { type: String, unique: true },
        airline: String,
        departureCity: String,
        arrivalCity: String,
        basePrice: Number,
        currentPrice: Number,
        lastPriceUpdate: Date
    },
    { timestamps: true }
);

FlightSchema.index({ departureCity: 1, arrivalCity: 1 });

export default mongoose.model("Flight", FlightSchema);