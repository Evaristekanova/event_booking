import { Router } from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  getUsers,
  getUser,
  removeUser,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";
import { validateRole } from "../middleware/roleCheck";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", authenticateToken, getProfile);
router.put("/profile", authenticateToken, updateProfile);

// Admin only routes
router.get("/", authenticateToken, validateRole(["ADMIN"]), getUsers);
router.get("/:id", authenticateToken, validateRole(["ADMIN"]), getUser);
router.delete("/:id", authenticateToken, validateRole(["ADMIN"]), removeUser);

export default router;
