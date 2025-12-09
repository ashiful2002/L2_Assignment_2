import express from "express";
import { bookingController } from "./bookings.controller";
import auth from "../../middleware/auth";
const router = express.Router();

router.post("/", auth("customer", "admin"), bookingController.createBooking);
router.get("/",auth("admin", "own"),  bookingController.getBooking);
router.get("/:id", bookingController.getSingleBooking);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

export const bookingroutes = router;
// here have to work in own booking

// Customer: Cancel booking (before start date only)
// Admin: Mark as "returned" (updates vehicle to "available")
// System: Auto-mark as "returned" when period ends