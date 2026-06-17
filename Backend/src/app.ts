import express from "express";
import authRoutes from "./modules/auth/auth.routes.js"
import tournametRoutes from "./modules/tournament/tournament.routes.js"
import participantRoutes from "./modules/participant/participant.routes.js"
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from 'cors'
const app = express();

// allows cors
app.use(cors())
app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/tournaments",tournametRoutes)
app.use("/api/participants",participantRoutes)

// error middleware
app.use(errorMiddleware)


export default app;