import { Prisma, Profile, User } from "@prisma/client";

export type loginPick = Pick<User, "email" | "password">;

export type userPick = Pick<
    User,
    "email" | "password"
>

export type userProfilePick = Pick<
    User & Profile,
    | "email"
    | "password"
    | "firstName"
    | "lastName"
    | "phone"
>


export type errorProp = {
    errorDescription?: Prisma.PrismaClientKnownRequestError | any;
    errorContent?: string;
    status: number;
    message: string;
  };