import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { initDb } from "./config/db";
import { usersRoutes } from "./modules/users/user.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
import { bookingroutes } from "./modules/bookings/booking.routes";

dotenv.config();
const app = express();
app.use(express.json());
initDb();

app.get("/", (req: Request, res: Response) => {
  res.send(`Vehicles booking platform...`);
});

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/vehicles", vehiclesRoutes);
app.use("/api/v1/bookings", bookingroutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

app.get("/", (req, res) => {
  res.send("server is running...");
});

export default app;
