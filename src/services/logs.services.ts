import { Logs } from "@prisma/client";
import { prisma } from "../utils/prisma.server";

export class logsSeervices {
  static async getAll() {
    try {
      const result = await prisma.logs.findMany({
        orderBy: { createdAt: "desc" },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: Logs["id"]) {
    try {
      const result = await prisma.logs.delete({
        where: { id },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAll() {
    try {
      await prisma.logs.deleteMany();
    } catch (error) {
      throw error;
    }
  }
}
