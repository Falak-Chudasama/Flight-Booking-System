import Flight from "../models/Flight.model.js";

const seedDb = async () => {
    const flights = [
        { flightId: "AI101", airline: "Air India", departureCity: "Delhi", arrivalCity: "Mumbai", basePrice: 2200 },
        { flightId: "AI102", airline: "Air India", departureCity: "Mumbai", arrivalCity: "Delhi", basePrice: 2300 },
        { flightId: "IND201", airline: "IndiGo", departureCity: "Delhi", arrivalCity: "Bangalore", basePrice: 2400 },
        { flightId: "IND202", airline: "IndiGo", departureCity: "Bangalore", arrivalCity: "Delhi", basePrice: 2500 },
        { flightId: "VST301", airline: "Vistara", departureCity: "Mumbai", arrivalCity: "Bangalore", basePrice: 2600 },
        { flightId: "VST302", airline: "Vistara", departureCity: "Bangalore", arrivalCity: "Mumbai", basePrice: 2700 },
        { flightId: "SP401", airline: "SpiceJet", departureCity: "Delhi", arrivalCity: "Kolkata", basePrice: 2100 },
        { flightId: "SP402", airline: "SpiceJet", departureCity: "Kolkata", arrivalCity: "Delhi", basePrice: 2200 },
        { flightId: "AK501", airline: "Akasa Air", departureCity: "Mumbai", arrivalCity: "Pune", basePrice: 2000 },
        { flightId: "AK502", airline: "Akasa Air", departureCity: "Pune", arrivalCity: "Mumbai", basePrice: 2000 },
        { flightId: "AI103", airline: "Air India", departureCity: "Delhi", arrivalCity: "Chennai", basePrice: 2600 },
        { flightId: "AI104", airline: "Air India", departureCity: "Chennai", arrivalCity: "Delhi", basePrice: 2700 },
        { flightId: "IND203", airline: "IndiGo", departureCity: "Mumbai", arrivalCity: "Hyderabad", basePrice: 2400 },
        { flightId: "IND204", airline: "IndiGo", departureCity: "Hyderabad", arrivalCity: "Mumbai", basePrice: 2500 },
        { flightId: "VST303", airline: "Vistara", departureCity: "Delhi", arrivalCity: "Jaipur", basePrice: 2000 },
        { flightId: "VST304", airline: "Vistara", departureCity: "Jaipur", arrivalCity: "Delhi", basePrice: 2000 },
        { flightId: "SP403", airline: "SpiceJet", departureCity: "Mumbai", arrivalCity: "Goa", basePrice: 2300 },
        { flightId: "SP404", airline: "SpiceJet", departureCity: "Goa", arrivalCity: "Mumbai", basePrice: 2400 },
        { flightId: "AK503", airline: "Akasa Air", departureCity: "Delhi", arrivalCity: "Lucknow", basePrice: 2100 },
        { flightId: "AK504", airline: "Akasa Air", departureCity: "Lucknow", arrivalCity: "Delhi", basePrice: 2200 },
        { flightId: "AI105", airline: "Air India", departureCity: "Bangalore", arrivalCity: "Chennai", basePrice: 2300 },
        { flightId: "AI106", airline: "Air India", departureCity: "Chennai", arrivalCity: "Bangalore", basePrice: 2400 },
        { flightId: "IND205", airline: "IndiGo", departureCity: "Pune", arrivalCity: "Hyderabad", basePrice: 2200 },
        { flightId: "VST305", airline: "Vistara", departureCity: "Hyderabad", arrivalCity: "Chennai", basePrice: 2500 },
        { flightId: "SP405", airline: "SpiceJet", departureCity: "Kolkata", arrivalCity: "Bangalore", basePrice: 2700 }
    ];

    const formattedFlights = flights.map(f => ({
        ...f,
        currentPrice: f.basePrice
    }));

    await Flight.deleteMany({});
    await Flight.insertMany(formattedFlights);
};

const flightServices = {
    seedDb
};

export default flightServices;