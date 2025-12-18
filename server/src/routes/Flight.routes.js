import { Router } from "express";
import flightControllers from "../controllers/Flight.controller.js";

const flightRouter = Router();

flightRouter.get("/", flightControllers.search);

export default flightRouter;