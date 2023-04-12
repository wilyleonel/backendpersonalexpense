import { Router } from "express";
import { removeUser, showUser,createUser } from "../controllers/users.controllers";
import { authenticate } from "../middlewares/auth.middlewares";

export const userRoute=Router();

userRoute.get("/users/:id",authenticate,showUser)
userRoute.post("/users",createUser)
userRoute.delete("/users/:id",authenticate,removeUser)
