import morgan from "morgan"
import express from "express"
import cors from "cors"
import { authRoute } from "./routes/auth.routes";
import { userRoute } from "./routes/user.routes";
import { handleError } from "./middlewares/error.middlewares";
import { expensesRoute } from "./routes/expenses.routes";

export const app=express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


app.use(authRoute)
app.use(userRoute)
app.use(expensesRoute)

app.use(handleError)

export default app;
