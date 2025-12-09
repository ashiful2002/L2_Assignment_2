import { Request, Response } from "express";
import { usersServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.createUser(req.body);
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

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getUsers();
    res.status(200).json({
      success: true,
      message: "get users successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await usersServices.getSingleUser(id as string);
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

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const loggedInUser = req.user;
  let { name, email, role, phone } = req.body;

  try {
    // Permission check
    if (loggedInUser?.role !== "admin" && loggedInUser?.id !== Number(id)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! You can only update your own profile.",
      });
    }

    // Normal users cannot update role
    if (loggedInUser.role !== "admin") {
      role = undefined;
    }

    const result = await usersServices.updateUser(
      id as string,
      name,
      email,
      phone,
      role
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const loggedInUser = req.user;

  if (!loggedInUser) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized! User not logged in",
    });
  }

  try {
    if (loggedInUser.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only admin can delete users.",
      });
    }

    const hasActiveBookings = await usersServices.checkActiveBookings(
      id as string
    );
    if (hasActiveBookings) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete user with active bookings.",
      });
    }

    const result = await usersServices.deleteUser(id as string);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const usersControllers = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
