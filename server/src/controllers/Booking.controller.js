import bookingServices from "../services/Booking.service.js";

const book = async (req, res) => {
    try {
        const booking = await bookingServices.bookFlight({
            passengerId: req.passengerId,
            flightId: req.body.flightId
        });
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getHistory = async (req, res) => {
    try {
        const bookings = await bookingServices.getBookingHistory({
            passengerId: req.passengerId
        });
        res.json(bookings);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const bookingControllers = {
    book,
    getHistory
};

export default bookingControllers;