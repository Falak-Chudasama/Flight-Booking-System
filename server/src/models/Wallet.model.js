import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema(
    {
        passengerId: { type: mongoose.Schema.Types.ObjectId, unique: true },
        balance: Number
    },
    { timestamps: true }
);

export default mongoose.model("Wallet", WalletSchema);