import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  getUsers,
} from "../controllers/userController";
import { authenticateToken, requireRole } from "../middleware/auth";
import { validate, validatePartial } from "../middleware/validation";
import { 
  createUserSchema, 
  loginSchema, 
  updateUserSchema 
} from "../validations/userValidation";

const router = express.Router();

// Public routes with validation
router.post("/register", validate(createUserSchema), register);
router.post("/login", validate(loginSchema), login);

// Protected routes with validation
router.get("/profile", authenticateToken, getProfile);
router.put("/profile", authenticateToken, validatePartial(updateUserSchema), updateProfile);

// Admin only routes
router.get("/users", authenticateToken, requireRole(["ADMIN"]), getUsers);

export default router;
