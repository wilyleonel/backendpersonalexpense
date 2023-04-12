import { NextFunction, Request, Response } from "express";
import expenseServices from "../services/expense.services";


export const showExpensesUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const convertId = parseInt(id);
        if (typeof convertId === "number" && convertId >= 0) {
            const result = await expenseServices.get(convertId);
            if (result) {
                res.status(200).json(result);
            } else {
                next({
                    errorDescription: "Error, couldn't find to expense",
                    status: 404,
                    message: "Error, couldn't find to expense",
                    errorContent: "Error, couldn't find to expenses",
                });
            }
        } else {
            next({
                errorDescription: convertId,
                status: 400,
                message: "Error, enter a valid id!",
                errorContent: "Error, enter a valid id",
            });
        }
    } catch (error: any) {
        console.log(error)
        next({
            errorDescription: error,
            status: 400,
            message: "Error, prisma client error, check logs",
            errorContent: error.clientVersion,
        });
    }
}

export const createExpenses = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { body } = req;
        const result = await expenseServices.create(body)
        res.status(201).json(result)
    } catch (error: any) {
        next({
            errorDescription: error,
            status: 400,
            message: "Error, prisma client error, check logs",
            errorContent: error.clientVersion,
        });
    }
}

export const deleteExpenses = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const convertId = parseInt(id);
        if (typeof convertId === "number" && convertId >= 0) {
            const result = await expenseServices.delete(convertId)
            res.status(200).json({ id: result.id })
        } else {
            next({
                errorDescription: convertId,
                status: 400,
                message: "Error, enter a valid id!",
                errorContent: "Error, invalid id for user",
            });
        }
    } catch (error: any) {
        if (error.code == "P2025") {
            next({
                errorDescription: error,
                status: 400,
                message: "Error, record to delete does not exists",
                errorContent: error.meta?.cause,
            });
        } else {
            next({
                errorDescription: error,
                status: 400,
                message: "Error, prisma client error",
                errorContent: error.clientVersion,
            });
        }
    }
}