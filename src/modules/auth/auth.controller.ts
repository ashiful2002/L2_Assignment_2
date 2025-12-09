import { Request, Response } from "express";
import { authServices } from "./auth.services";

const signUp = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signUp(req.body);

    const { id, name, email, phone, role } = result;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id,
        name,
        email,
        phone,
        role,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authServices.signin(email, password);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const { token, user } = result;

    const safeUserData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: safeUserData,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  signUp,
  loginUser,
};
