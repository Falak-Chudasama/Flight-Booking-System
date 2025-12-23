import BookingAttempt from "../models/BookingAttempt.model.js";
import Flight from "../models/Flight.model.js";

const recordAttempt = async ({ flightId }) => {
    const flight = await Flight.findById(flightId);
    if (!flight) throw new Error("Flight not found");

    await BookingAttempt.create({ flightId: flight._id });

    const attemptsCount = await BookingAttempt.countDocuments({
        flightId: flight._id,
        createdAt: { $gte: fiveMinutesAgo }
    });

    return {
        flightId,
        attemptsCount,
    };
};

const bookingAttemptServices = {
    recordAttempt
};

export default bookingAttemptServices;