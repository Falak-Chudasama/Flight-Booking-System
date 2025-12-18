import Booking from "../models/Booking.model.js";
import Flight from "../models/Flight.model.js";

const bookFlight = async ({ passengerId, flightId }) => {
    const flight = await Flight.findById(flightId);
    if (!flight) throw new Error("Flight not found");

    const booking = await Booking.create({
        pnr: Math.random().toString(36).substring(2, 8).toUpperCase(),
        passengerId,
        flightId: flight._id,
        passengerName: "",
        airline: flight.airline,
        from: flight.departureCity,
        to: flight.arrivalCity,
        amountPaid: flight.currentPrice
    });

    return booking;
};

const bookingServices = {
    bookFlight
};

export default bookingServices;