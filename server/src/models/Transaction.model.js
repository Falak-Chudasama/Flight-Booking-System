import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        walletId: mongoose.Schema.Types.ObjectId,
        type: String,
        amount: Number,
        balanceAfter: Number,
        reason: String
    },
    { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);