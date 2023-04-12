import { Expenses } from "@prisma/client";
import { prisma } from "../utils/prisma.server";


export class expenseServices {
    static async get(id: Expenses["id"]) {
        try {
            const result = await prisma.expenses.findUnique({
                where: { id },
                include: {
                    user: true
                }
            })
            return result
        } catch (error) {
            throw error
        }
    }

    static async create(
        data: Expenses) {
        try {
            const result = await prisma.expenses.create({
                data,
            })
            return result
        } catch (error) {
            throw error
        }
    }

    static async delete(id: Expenses["id"]) {
        try {
            const result = await prisma.expenses.delete({
                where: { id }
            })
            return result
        } catch (error) {
            throw error
        }
    }
}

export default expenseServices;