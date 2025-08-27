"use client";

import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "@/app/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { signupApi } from "@/app/_services/userServiceApi";
import { useAuth } from "@/app/contexts/AuthContext";

export default function SignupPage() {
  const { login } = useAuth();
  const router = useRouter();

  const {
    mutate: signupFn,
    isPending,
    error,
  } = useMutation({
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
      console.log(data);
      login(data);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, and one number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    signupFn(formData);
    if (!error) {
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phone: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-grey-2 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold mb-2 text-purple-1 rounded-full px-4 py-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join our event booking platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              label="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              isRequired={true}
              error={errors.fullName}
            />

            {/* Email Input */}
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              label="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              isRequired={true}
              error={errors.email}
            />

            <Input
              type="text"
              name="phone"
              placeholder="Phone Number"
              label="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              isRequired={true}
              error={errors.phone}
            />

            {/* Password Input */}
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              isRequired={true}
              error={errors.password}
            />
            <div
              className="flex justify-end text-sm text-purple-1 cursor-pointer -mt-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              text={isPending ? "Creating Account..." : "Create Account"}
              disabled={isPending}
              className="w-full flex justify-center py-3 px-4 rounded-lg font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            />
          </form>

          {/* Terms and Login Link */}
          <div className="text-center space-y-3">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{" "}
              <Link href="" className="text-purple-1 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="" className="text-purple-1 hover:underline">
                Privacy Policy
              </Link>
            </p>

            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link className="text-purple-1 hover:underline" href="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
