import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Passenger from "../models/Passenger.model.js";
import Wallet from "../models/Wallet.model.js";

const registerPassenger = async ({ name, email, password }) => {
    const existing = await Passenger.findOne({ email });
    if (existing) throw new Error("Passenger already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const passenger = await Passenger.create({
        name,
        email,
        password: hashedPassword
    });

    await Wallet.create({
        passengerId: passenger._id,
        balance: 50000
    });

    return passenger;
};

const loginPassenger = async ({ email, password }) => {
    const passenger = await Passenger.findOne({ email });
    if (!passenger) throw new Error("Invalid credentials");

    const isValid = await bcrypt.compare(password, passenger.password);
    if (!isValid) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { passengerId: passenger._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return token;
};

const passengerServices = {
    registerPassenger,
    loginPassenger
};

export default passengerServices;