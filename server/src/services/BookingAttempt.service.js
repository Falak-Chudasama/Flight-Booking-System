import BookingAttempt from "../models/BookingAttempt.model.js";
import Flight from "../models/Flight.model.js";

const recordAttempt = async ({ flightId }) => {
    const now = new Date();

    const flight = await Flight.findById(flightId);
    if (!flight) throw new Error("Flight not found");

    if (
        flight.lastPriceUpdate &&
        now - flight.lastPriceUpdate >= 10 * 60 * 1000
    ) {
        flight.currentPrice = flight.basePrice;
        flight.lastPriceUpdate = null;
        await flight.save();
    }

    await BookingAttempt.create({ flightId: flight._id });

    const fiveMinutesAgo = new Date(now - 5 * 60 * 1000);

    const attemptsCount = await BookingAttempt.countDocuments({
        flightId: flight._id,
        createdAt: { $gte: fiveMinutesAgo }
    });

    const surgeSteps = Math.floor(attemptsCount / 3);
    const surgeMultiplier = Math.min(1 + surgeSteps * 0.1, 2);
    const newPrice = Math.ceil(flight.basePrice * surgeMultiplier);

    if (newPrice !== flight.currentPrice) {
        flight.currentPrice = newPrice;
        flight.lastPriceUpdate = now;
        await flight.save();
    }

    return {
        flightId,
        attemptsCount,
        currentPrice: flight.currentPrice
    };
};

const bookingAttemptServices = {
    recordAttempt
};

export default bookingAttemptServices;