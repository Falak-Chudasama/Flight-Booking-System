import { Router } from "express";
import passengerControllers from "../controllers/Passenger.controller.js";

const passengerRouter = Router();

passengerRouter.post("/register", passengerControllers.register);
passengerRouter.post("/login", passengerControllers.login);

export default passengerRouter;