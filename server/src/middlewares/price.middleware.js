import BookingAttempt from "../models/BookingAttempt.model.js";
import Flight from "../models/Flight.model.js";

const priceMiddleware = async (req, res, next) => {
    try {
        const { flightId } = req.body;
        if (!flightId) return next();

        const now = new Date();

        const flight = await Flight.findById(flightId);
        if (!flight) return next();

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

        next();
    } catch (err) {
        next(err);
    }
};

export default priceMiddleware;