import walletServices from "../services/Wallet.service.js";

const addBalance = async (req, res) => {
    try {
        const wallet = await walletServices.addBalance({
            passengerId: req.passengerId,
            amount: req.body.amount
        });
        res.json(wallet);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const walletControllers = {
    addBalance
};

export default walletControllers;