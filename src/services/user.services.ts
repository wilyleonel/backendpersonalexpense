import { User } from "@prisma/client";
import { prisma } from "../utils/prisma.server";
import { userProfilePick } from "../utils/format.server";
import bcrypt from "bcryptjs"

export class userService {
    static async get(id: User["id"]) {
        try {
            const result = await prisma.user.findUnique({
                where: { id },
                include: { profile: true }
            })
            return result;
        } catch (error) {
            throw error
        }
    }

    static async create({
        email,
        password,
        firstName,
        lastName,
        phone
    }: userProfilePick) {
        try {
            const verifyEmail = await prisma.user.findFirst({
                where: { email }
            })
            if (!verifyEmail) {
                const passwordHash = await bcrypt.hash(password, 10);
                const newUser = await prisma.user.create({
                    data: {
                        email,
                        password: passwordHash
                    }
                });
                await prisma.profile.create({
                    data: {
                        firstName,
                        lastName,
                        phone,
                        user: { connect: { id: newUser.id } }
                    }
                });
                return newUser;
            }
            return null
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async delete(id: User["id"]) {
        try {
            const result = await prisma.user.delete({
                where: { id },
            })
            return result;
        } catch (error) {
            throw error
        }
    }
}