import { PrismaClient } from "@prisma/client";
import {
  CreateUserInput,
  UpdateUserInput,
  createUserSchema,
  loginSchema,
  updateUserSchema,
} from "../validations/userValidation";
import { comparePassword, hashPassword } from "../helpers/bycrpt";
import { generateToken } from "../helpers/jwt";

const prisma = new PrismaClient();

export const createUser = async (data: CreateUserInput) => {
  // Validate input data
  const validatedData = createUserSchema.parse(data);

  const hashedPassword = await hashPassword(validatedData.password);

  const user = await prisma.user.create({
    data: {
      fullName: validatedData.fullName,
      phone: validatedData.phone,
      email: validatedData.email,
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

export const findUserByEmail = async (email: string) => {
  // Validate email format
  const { email: validatedEmail } = loginSchema
    .pick({ email: true })
    .parse({ email });

  return prisma.user.findUnique({
    where: { email: validatedEmail },
  });
};

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return {
    message: "Users fetched successfully",
    users,
  };
};

export const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const updateUser = async (id: number, data: UpdateUserInput) => {
  // Validate update data
  const validatedData = updateUserSchema.parse(data);

  const updateData: any = { ...validatedData };

  if (validatedData.password) {
    updateData.password = await hashPassword(validatedData.password);
  }

  if (!validatedData.password) {
    delete updateData.password;
  }

  return prisma.user.update({
    where: { id },
    data: updateData,
  });
};

export const login = async (email: string, password: string) => {
  // Validate login input
  const { email: validatedEmail, password: validatedPassword } =
    loginSchema.parse({
      email,
      password,
    });

  const user = await findUserByEmail(validatedEmail);
  if (!user) throw new Error("Invalid Credentials");

  const isPasswordValid = await comparePassword(
    validatedPassword,
    user.password,
  );
  if (!isPasswordValid) throw new Error("Invalid Credentials");

  const token = generateToken({ id: user.id, email: user.email });

  const { password: _, ...userWithoutPassword } = user;

  return {
    message: "Login successful",
    token,
    user: userWithoutPassword,
  };
};
