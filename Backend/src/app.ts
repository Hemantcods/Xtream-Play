import express from "express";
import authRoutes from "./modules/auth/auth.routes.js"
import tournametRoutes from "./modules/tournament/tournament.routes.js"
import participantRoutes from "./modules/participant/participant.routes.js"
import userRoutes from "./modules/user/user.routes.js"
import adminRoutes from "./modules/admin/admin.routes.js"
import teamRoutes from "./modules/team/team.routes.js"
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
const app = express();
// allows cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/tournaments",tournametRoutes)
app.use("/api/participants",participantRoutes)
app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/team",teamRoutes)
// error middleware
app.use(errorMiddleware)


export default app;