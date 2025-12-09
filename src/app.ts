import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { initDb } from "./config/db";
import { usersRoutes } from "./modules/users/user.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
import { bookingroutes } from "./modules/bookings/booking.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import config from "./config";

dotenv.config();
const app = express();
app.use(express.json());
initDb();

app.get(`${config.api_version}/`, (req: Request, res: Response) => {
  res.send(`Vehicles booking platform...`);
});

app.use(`${config.api_version}/users`, usersRoutes);
app.use(`${config.api_version}/vehicles`, vehiclesRoutes);
app.use(`${config.api_version}/bookings`, bookingroutes);
app.use(`${config.api_version}/auth`, authRoutes);

// app.use((req: Request, res: Response) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//     path: req.path,
//   });
// });

app.get("/", (req, res) => {
  res.send(`
   base route is <a href="/api/v1">/api/v1</a>
    `);
});

export default app;
