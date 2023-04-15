import { Expenses, Prisma, Profile, Role, User } from "@prisma/client";

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

export type expensesPick=Pick<
Expenses,
|"livingPlace"
|"feeding"
|"outfit"
|"health"
|"education"
|"total"
|"month"
|"userId"
>

export type UserInfo ={
    id:number;
    email:string;
    password?:string;
    role:Role;
    iat:number;
}


export type errorProp = {
    errorDescription?: Prisma.PrismaClientKnownRequestError | any;
    errorContent?: string;
    status: number;
    message: string;
  };