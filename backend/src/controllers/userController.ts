import { Request, Response } from "express";
import * as userService from "../services/userService";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await userService.findUserById(req.user!.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
      message: "Profile fetched successfully",
      data: userWithoutPassword,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const updateData = req.body;

    const updatedUser = await userService.updateUser(userId, updateData);
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.status(200).json({
      message: "Profile updated successfully",
      data: userWithoutPassword,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    const usersWithoutPasswords = users.map(({ password: _, ...user }) => user);
    res.status(200).json({
      message: "Users fetched successfully",
      data: usersWithoutPasswords,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
