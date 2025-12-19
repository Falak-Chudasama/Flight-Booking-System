import Flight from "../models/Flight.model.js";

const searchFlights = async ({ departureCity, arrivalCity }) => {
    const query = {};

    if (departureCity) query.departureCity = departureCity;
    if (arrivalCity) query.arrivalCity = arrivalCity;

    const flights = await Flight.find(query).limit(10);
    return flights;
};

const seedDb = async () => {
    const flights = [
        { flightId: "AI101", airline: "Air India", departureCity: "Delhi", arrivalCity: "Mumbai", basePrice: 2200 },
        { flightId: "AI102", airline: "Air India", departureCity: "Delhi", arrivalCity: "Mumbai", basePrice: 2400 },
        { flightId: "IND201", airline: "IndiGo", departureCity: "Delhi", arrivalCity: "Mumbai", basePrice: 2100 },
        { flightId: "VST301", airline: "Vistara", departureCity: "Delhi", arrivalCity: "Mumbai", basePrice: 2600 },
        { flightId: "SP401", airline: "SpiceJet", departureCity: "Delhi", arrivalCity: "Mumbai", basePrice: 2300 },

        { flightId: "AI103", airline: "Air India", departureCity: "Mumbai", arrivalCity: "Delhi", basePrice: 2300 },
        { flightId: "IND202", airline: "IndiGo", departureCity: "Mumbai", arrivalCity: "Delhi", basePrice: 2200 },
        { flightId: "VST302", airline: "Vistara", departureCity: "Mumbai", arrivalCity: "Delhi", basePrice: 2500 },

        { flightId: "IND203", airline: "IndiGo", departureCity: "Delhi", arrivalCity: "Bangalore", basePrice: 2400 },
        { flightId: "AI104", airline: "Air India", departureCity: "Delhi", arrivalCity: "Bangalore", basePrice: 2600 },
        { flightId: "VST303", airline: "Vistara", departureCity: "Delhi", arrivalCity: "Bangalore", basePrice: 2700 },

        { flightId: "IND204", airline: "IndiGo", departureCity: "Bangalore", arrivalCity: "Delhi", basePrice: 2500 },
        { flightId: "AI105", airline: "Air India", departureCity: "Bangalore", arrivalCity: "Delhi", basePrice: 2600 },

        { flightId: "SP402", airline: "SpiceJet", departureCity: "Mumbai", arrivalCity: "Bangalore", basePrice: 2400 },
        { flightId: "VST304", airline: "Vistara", departureCity: "Mumbai", arrivalCity: "Bangalore", basePrice: 2700 },
        { flightId: "IND205", airline: "IndiGo", departureCity: "Mumbai", arrivalCity: "Bangalore", basePrice: 2300 },

        { flightId: "AI106", airline: "Air India", departureCity: "Bangalore", arrivalCity: "Mumbai", basePrice: 2500 },
        { flightId: "SP403", airline: "SpiceJet", departureCity: "Bangalore", arrivalCity: "Mumbai", basePrice: 2600 },

        { flightId: "AK501", airline: "Akasa Air", departureCity: "Delhi", arrivalCity: "Chennai", basePrice: 2400 },
        { flightId: "AI107", airline: "Air India", departureCity: "Delhi", arrivalCity: "Chennai", basePrice: 2600 },
        { flightId: "IND206", airline: "IndiGo", departureCity: "Delhi", arrivalCity: "Chennai", basePrice: 2500 },

        { flightId: "AK502", airline: "Akasa Air", departureCity: "Chennai", arrivalCity: "Delhi", basePrice: 2400 },
        { flightId: "VST305", airline: "Vistara", departureCity: "Chennai", arrivalCity: "Delhi", basePrice: 2700 },

        { flightId: "SP404", airline: "SpiceJet", departureCity: "Mumbai", arrivalCity: "Goa", basePrice: 2200 },
        { flightId: "IND207", airline: "IndiGo", departureCity: "Mumbai", arrivalCity: "Goa", basePrice: 2300 },
        { flightId: "AI108", airline: "Air India", departureCity: "Mumbai", arrivalCity: "Goa", basePrice: 2500 },

        { flightId: "SP405", airline: "SpiceJet", departureCity: "Goa", arrivalCity: "Mumbai", basePrice: 2400 },
        { flightId: "IND208", airline: "IndiGo", departureCity: "Goa", arrivalCity: "Mumbai", basePrice: 2300 },

        { flightId: "AK503", airline: "Akasa Air", departureCity: "Delhi", arrivalCity: "Lucknow", basePrice: 2100 },
        { flightId: "SP406", airline: "SpiceJet", departureCity: "Delhi", arrivalCity: "Lucknow", basePrice: 2200 },

        { flightId: "AK504", airline: "Akasa Air", departureCity: "Lucknow", arrivalCity: "Delhi", basePrice: 2100 },

        { flightId: "IND209", airline: "IndiGo", departureCity: "Pune", arrivalCity: "Hyderabad", basePrice: 2200 },
        { flightId: "AI109", airline: "Air India", departureCity: "Pune", arrivalCity: "Hyderabad", basePrice: 2400 },

        { flightId: "VST306", airline: "Vistara", departureCity: "Hyderabad", arrivalCity: "Chennai", basePrice: 2500 },
        { flightId: "IND210", airline: "IndiGo", departureCity: "Hyderabad", arrivalCity: "Chennai", basePrice: 2400 },

        { flightId: "SP407", airline: "SpiceJet", departureCity: "Kolkata", arrivalCity: "Bangalore", basePrice: 2700 },
        { flightId: "AI110", airline: "Air India", departureCity: "Kolkata", arrivalCity: "Bangalore", basePrice: 2800 },

        { flightId: "IND211", airline: "IndiGo", departureCity: "Bangalore", arrivalCity: "Kolkata", basePrice: 2600 }
    ];

    const formattedFlights = flights.map(f => ({
        ...f,
        currentPrice: f.basePrice
    }));

    await Flight.deleteMany({});
    await Flight.insertMany(formattedFlights);
};

const flightServices = {
    seedDb,
    searchFlights
};

export default flightServices;