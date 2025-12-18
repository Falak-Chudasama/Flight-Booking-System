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

const bookingControllers = {
    book
};

export default bookingControllers;