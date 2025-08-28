"use client";

import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "@/app/components/shared/Button";
import Link from "next/link";
import { useLogin } from "@/app/hooks";

export default function Login() {
  const { mutate: loginFn, isPending } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    loginFn(formData);
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen bg-grey-2  flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold  mb-2 text-purple-1  rounded-full px-4 py-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              className="flex justify-end text-sm text-purple-1 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              text={isPending ? "Signing In..." : "Sign In"}
              disabled={isPending}
              className="w-full flex justify-center py-3 px-4 rounded-lg font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            />
          </form>
          <div>
            <p>
              Don&apos;t have an account?{" "}
              <Link className="text-purple-1" href="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
