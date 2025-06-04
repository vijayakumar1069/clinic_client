"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User, Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginFormSchema } from "@/lib/schema/loginFormSchema";
import { loginAction } from "@/app/actions/loginAction";

const LoginForm = ({ role = "admin" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    // Different redirect paths based on role
    const redirectPath =
      role === "doctor" ? "/doctor-dashboard" : "/admin-dashboard";

    try {
      // Simulate API call with different endpoints
      console.log(`Calling  with data:`, data);

      const res = await loginAction(data, role);
      console.log(res);

      setTimeout(() => {
        setIsLoading(false);
        router.push(redirectPath);
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      alert("Login failed. Please try again.");
    }
  };

  const handleForgotPassword = () => {
    const forgotPasswordPath =
      role === "doctor" ? "/doctor/forgot-password" : "/admin/forgot-password";
    router.push(forgotPasswordPath);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div
            className={`mx-auto w-16 h-16 ${
              role === "doctor" ? "bg-green-600" : "bg-blue-600"
            } rounded-full flex items-center justify-center mb-4`}
          >
            {role === "doctor" ? (
              <User className="w-8 h-8 text-white" />
            ) : (
              <Stethoscope className="w-8 h-8 text-white" />
            )}
          </div>
          {/* <h1 className="text-3xl font-bold text-gray-900 mb-2">
            HealthCare Clinic
          </h1>
          <p className="text-gray-600">
            {role === "doctor" ? "Doctor Portal Access" : "Admin Portal Access"}
          </p> */}
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {role === "doctor" ? "Welcome Doctor" : "Welcome Back"}
            </h2>
            <p className="text-gray-600">
              {role === "doctor"
                ? "Sign in to access your doctor dashboard"
                : "Sign in to access your admin dashboard"}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <Input
                          placeholder={
                            role === "doctor"
                              ? "doctor@clinic.com"
                              : "admin@clinic.com"
                          }
                          className={`pl-10 py-3  ${
                            role === "doctor"
                              ? "focus:ring-green-500 focus:border-green-500"
                              : "focus:ring-blue-500 focus:border-blue-500"
                          } transition-colors`}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-primary" />
                        </div>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className={`pl-10 pr-12 py-3 focus:outline-none ${
                            role === "doctor"
                              ? "focus:ring-green-500 focus:border-green-500"
                              : "focus:ring-blue-500 focus:border-blue-500"
                          } transition-colors`}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-primary hover:text-primary/90" />
                          ) : (
                            <Eye className="h-5 w-5 text-primary hover:text-primary/90" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full ${
                  role === "doctor"
                    ? "bg-green-600 hover:bg-green-700 disabled:bg-green-400"
                    : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                } text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 ${
                  role === "doctor"
                    ? "focus:ring-green-500"
                    : "focus:ring-blue-500"
                } focus:ring-offset-2`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Need access? Contact your system administrator
              </p>
              <div className="mt-4 flex justify-center space-x-4 text-xs text-gray-500">
                <span>© 2024 HealthCare Clinic</span>
                <span>•</span>
                <span>Secure Login</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">Demo Credentials:</h3>
          <p className="text-sm text-blue-700">
            Email: admin@clinic.com
            <br />
            Password: admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
