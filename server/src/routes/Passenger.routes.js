import { Router } from "express";
import passengerServices from "../services/Passenger.service.js";

const passengerRouter = Router();

passengerRouter.post("/register", passengerServices.registerPassenger);
passengerRouter.post("/login", passengerServices.loginPassenger);

export default passengerRouter;