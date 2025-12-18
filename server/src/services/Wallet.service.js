import Wallet from "../models/Wallet.model.js";

const addBalance = async ({ passengerId, amount }) => {
    if (!amount || amount <= 0) throw new Error("Invalid amount");

    const wallet = await Wallet.findOneAndUpdate(
        { passengerId },
        { $inc: { balance: amount } },
        { new: true }
    );

    if (!wallet) throw new Error("Wallet not found");

    return wallet;
};

const deductBalance = async ({ passengerId, amount }) => {
    if (!amount || amount <= 0) throw new Error("Invalid amount");

    const wallet = await Wallet.findOneAndUpdate(
        { passengerId, balance: { $gte: amount } },
        { $inc: { balance: -amount } },
        { new: true }
    );

    if (!wallet) throw new Error("Insufficient balance");

    return wallet;
};

const walletServices = {
    addBalance,
    deductBalance
};

export default walletServices;