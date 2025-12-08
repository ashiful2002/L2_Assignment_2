import { Request, Response } from "express";
import { bookingServices } from "./booking.services";

const createBooking = async (req: Request, res: Response) => {
  try {
    //   const result = await vehiclesServices.createVehicles(req.body);
    const result = await bookingServices.createBooking(req.body);
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBooking = async (req: Request, res: Response) => {
  try {
    //   const result = await vehiclesServices.getVehicles();
    const result = await bookingServices.getBooking();
    res.status(200).json({
      success: true,
      message: "get all the vehicles",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getSingleBooking = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    //   const result = await vehiclesServices.getSingleVehicle(id as string);
    const result = await bookingServices.getSingleBooking(id as string);
    res.status(200).json({
      success: true,
      message: "get the specific user",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;
  try {
    //   const result = await vehiclesServices.updateVehicles(

    const result = await bookingServices.updateBooking(
      id as string,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Updated user successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await bookingServices.deleteBooking(id as string);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const bookingController = {
  createBooking,
  getBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
