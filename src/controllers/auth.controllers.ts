import { NextFunction, Request, Response } from "express";
import authServices from "../services/auth.services";

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { body } = req;
        const result = await authServices.authUser(body)
        if (result) {
            const token = authServices.getTokenUser(result);
            const { email, ...data } = result;
            res.json({ ...data, token });
        } else if (result === false) {
            next({
                errorDescription: "Couldn't find user in records",
                status: 400,
                message: "Couldn't find user in records",
                errorContent: "Could't find user in records",
            })
        } else {
            next({
                errorDescription: "Password don't match with user",
                status: 400,
                message: "Password don't match with user",
                errorContent: "Password don't match with user",
            });
        }
    } catch (error: any) {
        next({
            errorDescription: error,
            status: 400,
            message: "Error, prisma client error",
            errorContent: error.clienVersion,
        });
    }
}