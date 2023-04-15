import { Expenses } from "@prisma/client";
import { prisma } from "../utils/prisma.server";
import { expensesPick } from "../utils/format.server";
import { User } from "../utils/prisma.server"

export class expenseServices {
    static async getAll(userId: User["id"],) {
        try {
            const result = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    expenses: {
                        orderBy: {
                            id: "desc"
                        },
                        select: {
                            id: true,
                            livingPlace: true,
                            feeding: true,
                            outfit: true,
                            health: true,
                            education: true,
                            month:true,
                            total: true,
                        }
                    }


                }

            })
            return result
        } catch (error) {
            throw error
        }
    }

    static async create(
        {
            livingPlace,
            feeding,
            outfit,
            health,
            education,
            month,
            total,
        }: expensesPick, userId: User["id"]
    ) {
        try {
            const result = await prisma.expenses.create({
                data:
                {
                    livingPlace,
                    feeding,
                    outfit,
                    health,
                    education,
                    month,
                    total,
                    user: { connect: { id: userId } },
                },
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