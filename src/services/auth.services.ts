import { loginPick, userPick } from "../utils/format.server";
import { prisma } from "../utils/prisma.server";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const secretUser = process.env.SECRETUSER;

export class authServices {
    static async authUser(
        data: loginPick
    ) {
        try {
            const { email, password } = data;
            const user = await prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    email: true,
                    password: true,
                    profile: {
                        select: {
                            firstName: true,
                            lastName: true,
                        }
                    }
                }
            })
            if (!user) return false;
            const verifyPassword = await bcrypt.compare(password, user.password);
            if (!verifyPassword) return null;
            return user
        } catch (error) {
            throw error
        }
    }

    static getTokenUser(data: userPick) {
        try {
            if (secretUser) {
                const token = jwt.sign(data, secretUser, {
                    algorithm: "HS512"
                })
                return token;
            }
        } catch (error) {
            throw error
        }
    }
}
export default authServices;