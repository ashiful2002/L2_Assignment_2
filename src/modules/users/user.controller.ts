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
  const { name, email, role, phone } = req.body;
  try {
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

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await usersServices.deleteUser(id as string);
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
export const usersControllers = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
