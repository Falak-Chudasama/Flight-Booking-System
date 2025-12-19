import flightServices from "../src/services/Flight.service.js";
import bookingAttemptServices from "../src/services/BookingAttempt.service.js";

async function runBot({ interval = 1000 } = {}) {
    setInterval(async () => {
        try {
            const flights = await flightServices.searchFlights({});
            
            if (flights && flights.length > 0) {
                const target = flights[Math.floor(Math.random() * flights.length)];
                
                if (target?._id) {
                    await bookingAttemptServices.recordAttempt({ flightId: target._id });
                    console.log(`bot: recorded attempt for ${target._id}`);
                }
            } else {
                console.log("bot: no flights found, skipping...");
            }
        } catch (err) {
            console.error("bot error:", err?.message || err);
        }
    }, interval);
}

export default runBot;