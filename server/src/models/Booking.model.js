import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
    {
        pnr: { type: String, unique: true },
        passengerId: mongoose.Schema.Types.ObjectId,
        flightId: mongoose.Schema.Types.ObjectId,
        passengerName: String,
        airline: String,
        from: String,
        to: String,
        amountPaid: Number,
        pdfPath: String
    },
    { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);