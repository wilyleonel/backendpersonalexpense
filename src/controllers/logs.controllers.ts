import { NextFunction, Request, Response } from "express";
import { logsSeervices } from "../services/logs.services";

export const getAllLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await logsSeervices.getAll();
    res.status(200).json(result);
  } catch (error: any) {
    next({
      errorDescription: error,
      status: 400,
      message: "Error, prisma client error, check logs",
      errorContent: error.clientVersion,
    });
  }
};