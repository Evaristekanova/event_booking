import { UpdateProfileInput } from "../../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message);
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

export const signupApi = async (
  fullName: string,
  email: string,
  phone: string,
  password: string
) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, phone, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message);
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

export const getProfileApi = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/users/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message);
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

export const updateProfileApi = async (
  token: string,
  userData: UpdateProfileInput
) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/users/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message);
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

export const getUsersApi = async (
  token: string,
  page: number = 1,
  limit: number = 10
) => {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/users?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message);
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

export const getUserByIdApi = async (token: string, userId: string) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message);
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

export const activateUserApi = async (token: string, userId: string) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/users/activate/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message);
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

export const deactivateUserApi = async (token: string, userId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/users/deactivate/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message);
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};
