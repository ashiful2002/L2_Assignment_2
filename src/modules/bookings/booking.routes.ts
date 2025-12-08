import express from "express";
import { bookingController } from "./bookings.controller";
const router = express.Router();

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getBooking);
router.get("/:id", bookingController.getSingleBooking);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

export const bookingroutes = router;
