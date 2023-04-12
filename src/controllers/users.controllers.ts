import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.services";
import { Prisma } from "@prisma/client";

export const showUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const convertId = parseInt(id);
    if (typeof convertId === "number" && convertId >= 0) {
      const result = await userService.get(convertId);
      if (result) {
        res.status(200).json(result);
      } else {
        next({
          errorDescription: "Error, couldn't find to user",
          status: 404,
          message: "Error, couldn't find to user",
          errorContent: "Error, couldn't find to user",
        });
      }
    } else {
      next({
        errorDescription: convertId,
        status: 400,
        message: "Error, enter a valid id!",
        errorContent: "Error, invalid id for user",
      });
    }
  } catch (error: any) {
    next({
      errorDescription: "Error, invalid id for user",
      status: 400,
      message: "Error, prisma client error",
      errorContent: error.clienVersion,
    });
  }
}

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req
    const result = await userService.create(body);
    if (!result) {
      next({
        errorDescription: "Unique constraint failed on the fields: (`email`)",
        status: 400,
        message: "Error, email address already exists",
        errorContent: "Unique constraint failed on the fields: (`email`)",
      });
    } else {
      res.status(201).json(result);
    }
  } catch (error: any) {
    next({
      errorDescription: error,
      status: 400,
      message: "Error, prisma client error, check logs",
      errorContent: error.clientVersion,
    });

  }
};

export const removeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const convertId = parseInt(id);
    if (typeof convertId === "number" && convertId >= 0) {
      const result = await userService.delete(convertId);
      res.status(200).json({ id: result.id });
    } else {
      next({
        errorDescription: convertId,
        status: 400,
        message: "Error, enter a valid id!",
        errorContent: "Error, invalid id for user",
      });
    }
  } catch (error: any) {
    console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2025") {
        next({
          errorDescription: error,
          status: 400,
          message:
            "Error, user not found in logs to delete",
          errorContent: error.meta?.cause,
        });
      } else {
        next({
          errorDescription: error,
          status: 400,
          message: "Error, prisma client error, check logs",
          errorContent: error.clientVersion,
        });
      }
    } else {
      next({
        errorDescription: error,
        status: 400,
        message: "Error, prisma client error, check logs",
        errorContent: error.clientVersion,
      });
    }
  }
};
