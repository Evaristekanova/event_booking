import { Request, Response } from "express";
import {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  getAllUsers,
  deactivateUser,
  activateUser,
} from "../services/userService";
import {
  CreateUserInput,
  UpdateUserInput,
} from "../validations/userValidation";

export const register = async (req: Request, res: Response) => {
  try {
    const userData: CreateUserInput = req.body;
    const result = await createUser(userData);

    res.status(201).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to get profile",
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const updateData: UpdateUserInput = req.body;
    const user = await updateUser(userId, updateData, userId);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update profile",
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to get users",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to get user",
    });
  }
};

export const deactivate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deactivateUser(id);

    res.status(200).json({
      success: true,
      message: "User deactivated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to deactivate user",
    });
  }
};

export const activate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await activateUser(id);

    res.status(200).json({
      success: true,
      message: "User activated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to activate user",
    });
  }
};
