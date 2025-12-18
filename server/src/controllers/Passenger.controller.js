import passengerServices from "../services/Passenger.service.js";

const register = async (req, res) => {
    try {
        const passenger = await passengerServices.registerPassenger(req.body);
        res.status(201).json(passenger);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const token = await passengerServices.loginPassenger(req.body);
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const passengerControllers = {
    register,
    login
};

export default passengerControllers;