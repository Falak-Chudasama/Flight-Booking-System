import express from "express";
import cors from "cors";

import passengerRouter from "../routes/Passenger.routes.js";
import flightRouter from "../routes/Flight.routes.js";
import bookingRouter from "../routes/Booking.routes.js";
import walletRouter from "../routes/Wallet.routes.js";
import bookingAttemptRouter from "../routes/BookingAttempt.routes.js";
import transactionRouter from "../routes/Transaction.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/passengers", passengerRouter);
app.use("/api/flights", flightRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/wallets", walletRouter);
app.use("/api/booking-attempts", bookingAttemptRouter);
app.use("/api/transactions", transactionRouter);

app.get('/', (req, res) => {
    res.json({ message: 'WELCOME' });
});

export default app;