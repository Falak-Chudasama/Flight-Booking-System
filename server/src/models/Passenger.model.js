import mongoose from "mongoose";

const PassengerSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true }
    },
    { timestamps: true }
);

export default mongoose.model("Passenger", PassengerSchema);