import cors from "cors"
import { NextFunction, Request, Response } from "express";
import { prisma } from "./utils/prisma.server";
import app from "./routesmain";

app.use(cors({origin:["*", "http://localhost:8000/"]}));

app.get("/",(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    prisma;
    res.status(200).json({
        message:"welcome to personal expenses"
    })
})

export default app;