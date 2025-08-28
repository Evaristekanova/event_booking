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
