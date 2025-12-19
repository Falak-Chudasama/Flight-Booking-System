import { Router } from "express";
import bookingAttemptControllers from "../controllers/BookingAttempt.controller.js";

const bookingAttemptRouter = Router();

bookingAttemptRouter.post("/", bookingAttemptControllers.attempt);

export default bookingAttemptRouter;