import express from "express";
import authRoutes from "./modules/auth/auth.routes.js"
import tournametRoutes from "./modules/tournament/tournament.routes.js"
import { errorMiddleware } from "./middlewares/error.middleware.js";
const app = express();

app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/tournamets",tournametRoutes)


// error middleware
app.use(errorMiddleware)
export default app;