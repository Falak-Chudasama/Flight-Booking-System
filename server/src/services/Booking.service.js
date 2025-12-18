import Booking from "../models/Booking.model.js";
import Flight from "../models/Flight.model.js";
import walletServices from "./Wallet.service.js";
import pdfServices from "./Pdf.service.js";

const bookFlight = async ({ passengerId, flightId }) => {
    const flight = await Flight.findById(flightId);
    if (!flight) throw new Error("Flight not found");

    await walletServices.deductBalance({
        passengerId,
        amount: flight.currentPrice
    });

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

    const pdfPath = await pdfServices.generateTicketPdf({ booking });

    booking.pdfPath = pdfPath;
    await booking.save();

    return booking;
};

const getBookingHistory = async ({ passengerId }) => {
    const bookings = await Booking.find({ passengerId })
        .sort({ createdAt: -1 });

    return bookings;
};

const bookingServices = {
    bookFlight,
    getBookingHistory
};

export default bookingServices;