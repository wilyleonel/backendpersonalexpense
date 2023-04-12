import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares";
import { getAllLogs } from "../controllers/logs.controllers";

export const logsRoutes = Router();

logsRoutes.get("/logs",authenticate,  getAllLogs);
