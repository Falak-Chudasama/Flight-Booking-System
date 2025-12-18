import flightServices from "../services/Flight.service.js";

const search = async (req, res) => {
    try {
        const flights = await flightServices.searchFlights({
            departureCity: req.query.departureCity,
            arrivalCity: req.query.arrivalCity
        });
        res.json(flights);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const flightControllers = {
    search
};

export default flightControllers;