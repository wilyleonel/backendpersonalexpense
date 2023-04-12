import { userPick } from "../utils/format.server";
import { prisma } from "../utils/prisma.server";

const userValues: userPick[] = [
    {
        email: "34343434",
        password: "sdfdf",

    },
    {
        email: "89898989",
        password: "1234",
    },
    {
        email: "12121212",
        password: "fsfds",
    },
    {
        email: "66060606",
        password: "sadsad",
    },
];

const profileValues = [
    {
        firstName: "wily",
        lastName: "hancco",
        phone: "4243234",
        userId: 1,
    },
    {
        firstName: "yefry",
        lastName: "quispe",
        phone: "234235234",
        userId: 2,
    },
    {
        firstName: "ronald",
        lastName: "larico",
        phone: "6435324",
        userId: 3,
    },
    {
        firstName: "jean",
        lastName: "cris",
        phone: "625234234",
        userId: 4,
    },
];

const expenseValues = [
    {
        livingPlace: 12.13,
        feeding: 12.13,
        outfit: 12.13,
        health: 12.13,
        education: 12.13,
        userId: 1,
    },
    {
        livingPlace: 12.13,
        feeding: 12.13,
        outfit: 12.13,
        health: 12.13,
        education: 12.13,
        userId: 2,
    },
    {
        livingPlace: 12.13,
        feeding: 12.13,
        outfit: 12.13,
        health: 12.13,
        education: 12.13,
        userId: 3,
    },
    {
        livingPlace: 12.13,
        feeding: 12.13,
        outfit: 12.13,
        health: 12.13,
        education: 12.13,
        userId: 4,
    }
]


const seed = async () => {

    await prisma.user.createMany({
        data: userValues,
    });
    await prisma.profile.createMany({
        data: profileValues
    });
    await prisma.expenses.createMany({
        data: expenseValues
    })

}

seed();