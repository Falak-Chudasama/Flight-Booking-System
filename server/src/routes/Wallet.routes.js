import { Router } from "express";
import walletControllers from "../controllers/Wallet.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const walletRouter = Router();

walletRouter.post("/add-balance", authMiddleware, walletControllers.addBalance);
walletRouter.get("/balance", authMiddleware, walletControllers.getBalance);

export default walletRouter;