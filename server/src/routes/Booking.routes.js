import { Router } from "express";
import bookingControllers from "../controllers/Booking.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import priceMiddleware from "../middlewares/price.middleware.js";

const bookingRouter = Router();

bookingRouter.post("/", authMiddleware, priceMiddleware, bookingControllers.book);
bookingRouter.post("/bot", bookingControllers.book);
bookingRouter.get("/",authMiddleware,bookingControllers.getHistory);

export default bookingRouter;