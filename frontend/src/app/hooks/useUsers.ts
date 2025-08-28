import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  loginApi,
  signupApi,
  getProfileApi,
  updateProfileApi,
  getUsersApi,
  getUserByIdApi,
  activateUserApi,
  deactivateUserApi,
} from "../_services/userServiceApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export const useLogin = () => {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
    onSuccess: (data) => {
      if (data.success && data.data && data.data.user && data.data.token) {
        // Store user and token in localStorage via AuthContext
        login({
          user: data.data.user,
          token: data.data.token,
        });

        toast.success(data.message || "Login successful!");

        // Redirect to dashboard after successful login
        router.push("/dashboard");
      } else {
        toast.error("Invalid response format from server");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const { login } = useAuth();
  return useMutation({
    mutationFn: ({
      email,
      password,
      fullName,
      phone,
    }: {
      email: string;
      password: string;
      fullName: string;
      phone: string;
    }) => signupApi(fullName, email, phone, password),
    onSuccess: (data) => {
      toast.success(data.message);
      login({
        user: data.data.user,
        token: data.data.token,
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  return () => {
    logout();
    router.push("/login");
  };
};

export const useProfile = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileApi(token!),
    enabled: !!token,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (userData: {
      fullName?: string;
      phone?: string;
      password?: string;
    }) => updateProfileApi(token!, userData),
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
};

export const useUsers = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersApi(token!),
    enabled: !!token,
  });
};

export const useUserById = (userId: string) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserByIdApi(token!, userId),
    enabled: !!token && !!userId,
  });
};

export const useActivateUser = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (userId: string) => activateUserApi(token!, userId),
    onSuccess: (data) => {
      toast.success(data.message || "User activated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (userId: string) => deactivateUserApi(token!, userId),
    onSuccess: (data) => {
      toast.success(data.message || "User deactivated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
