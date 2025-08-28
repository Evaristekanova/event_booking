import { PrismaClient, User, Role } from "@prisma/client";
import { hashPassword, comparePassword } from "../helpers/bycrpt";
import { generateToken } from "../helpers/jwt";
import {
  CreateUserInput,
  UpdateUserInput,
} from "../validations/userValidation";

const prisma = new PrismaClient();

export const createUser = async (data: CreateUserInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      password: hashedPassword,
    },
  });

  const token = generateToken({ id: user.id, email: user.email });

  const { password: _, ...userWithoutPassword } = user;

  return {
    message: "User created successfully",
    token,
    user: userWithoutPassword,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({ id: user.id, email: user.email });

  const { password: _, ...userWithoutPassword } = user;

  return {
    message: "Login successful",
    token,
    user: userWithoutPassword,
  };
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

export const updateUser = async (
  id: string,
  data: UpdateUserInput,
  currentUserId: string,
) => {
  // Users can only update their own profile
  if (id !== currentUserId) {
    throw new Error("You can only update your own profile");
  }

  const updateData: any = { ...data };

  if (data.password) {
    updateData.password = await hashPassword(data.password);
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

export const getAllUsers = async () => {
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count(),
  ]);

  return {
    users,
  };
};

export const deactivateUser = async (id: string) => {
  const user = await prisma.user.update({
    where: { id },
    data: { status: "INACTIVE" },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

export const activateUser = async (id: string) => {
  const user = await prisma.user.update({
    where: { id },
    data: { status: "ACTIVE" },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};
