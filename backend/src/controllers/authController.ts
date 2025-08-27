// controllers/auth.controller.ts
import { Request, Response } from "express";
import { login } from "../services/userService";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
