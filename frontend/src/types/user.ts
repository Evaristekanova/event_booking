export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export type UserRole = "USER" | "ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}

export interface UpdateProfileInput {
  fullName?: string;
  phone?: string;
  password?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: AuthResponse;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: AuthResponse;
}
