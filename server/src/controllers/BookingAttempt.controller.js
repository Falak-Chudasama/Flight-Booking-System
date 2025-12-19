import bookingAttemptServices from "../services/BookingAttempt.service.js";

const attempt = async (req, res) => {
    try {
        const result = await bookingAttemptServices.recordAttempt({
            flightId: req.body.flightId
        });
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const bookingAttemptControllers = {
    attempt
};

export default bookingAttemptControllers;