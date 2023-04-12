import { Router } from "express";
import { createExpenses, deleteExpenses, showExpensesUser } from "../controllers/expenses.controllers";
import { authenticate } from "../middlewares/auth.middlewares";

export const expensesRoute=Router();

expensesRoute.get("/expenses/:id",authenticate,showExpensesUser)
expensesRoute.post("/expenses",authenticate,createExpenses)
expensesRoute.delete("/expenses/:id",authenticate,deleteExpenses)