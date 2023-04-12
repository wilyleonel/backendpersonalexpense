import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken"

dotenv.config();

const secret = process.env.SECRETUSER

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = req.headers.authorization;
        const token = result?.split(" ")[1];
        if (secret && token) {
            const decodeToken = jwt.verify(token, secret);
            res.locals.userInfo = decodeToken;
            next();
        } else {
            res.status(400).json({
                message: "You need to log in to see the information",
                errorContent: "Need to log in to see the information"
            })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}