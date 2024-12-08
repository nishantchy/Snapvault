"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import PasswordInput from "@/components/ui/passwordInput";

type LoginFormData = {
  email: string;
  password: string;
};
interface LoginResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    image?: string;
    phone?: string;
  };
  token: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Sending login request with:", {
        action: "login",
        email: formData.email,
      });

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const textResponse = await response.text();
        console.error("Error response:", textResponse);

        try {
          const errorData = JSON.parse(textResponse);
          throw new Error(errorData.message || "Login failed");
        } catch (parseError) {
          throw new Error("Server error occurred. Please try again later.");
        }
      }

      const data: LoginResponse = await response.json();

      console.log("Login successful");

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "client",
          JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            image: data.user.image,
            phone: data.user.phone,
          })
        );
      }

      toast.success("Login successful!");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F5F5DC]">
      <Toaster position="top-center" />
      <Card className="w-full max-w-md shadow-lg rounded-lg p-8">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-4xl font-bold text-gray-700 flex justify-center">
            <svg
              width="208"
              height="28"
              viewBox="0 0 238 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.244 26.366V28H0V26.366H5.168C3.77467 25.6567 2.508 24.7447 1.368 23.63L4.902 19.298C7.76467 21.806 10.412 23.06 12.844 23.06C13.9333 23.06 14.782 22.832 15.39 22.376C16.0233 21.8947 16.34 21.2613 16.34 20.476C16.34 19.6653 16.0107 19.032 15.352 18.576C14.6933 18.0947 13.3887 17.6133 11.438 17.132C8.34733 16.3973 6.08 15.4473 4.636 14.282C3.21733 13.0913 2.508 11.242 2.508 8.734C2.508 6.20066 3.40733 4.25 5.206 2.882C7.03 1.514 9.29733 0.829999 12.008 0.829999C13.7813 0.829999 15.5547 1.134 17.328 1.742C19.1013 2.35 20.6467 3.21133 21.964 4.326L18.962 8.658C16.6567 6.91 14.2753 6.036 11.818 6.036C10.83 6.036 10.0447 6.27667 9.462 6.758C8.90467 7.214 8.626 7.83467 8.626 8.62C8.626 9.38 8.968 9.988 9.652 10.444C10.3613 10.9 11.97 11.4447 14.478 12.078C17.0113 12.686 18.9747 13.6107 20.368 14.852C21.7613 16.0933 22.458 17.816 22.458 20.02C22.458 22.756 21.432 24.8713 19.38 26.366H24.244ZM27.5004 26.366V1.438H33.0484L46.0824 18.538V1.438H52.0104V26.366H55.6964V28H46.0824L33.4284 11.356V28H23.8144V26.366H27.5004ZM87.479 26.366V28H77.485L75.015 22.262H63.881L61.411 28H51.417V26.366H55.787L66.579 1.438H72.317L83.071 26.366H87.479ZM69.467 9.342L66.123 17.056H72.773L69.467 9.342ZM109.333 26.366V28H83.1894V26.366H86.8754V1.438H96.2614C100.34 1.438 103.304 2.236 105.153 3.832C107.028 5.40267 107.965 7.83467 107.965 11.128C107.965 14.396 107.003 16.79 105.077 18.31C103.177 19.83 100.264 20.59 96.3374 20.59H92.8034V26.366H109.333ZM96.7934 15.46C98.7694 15.46 100.112 15.0673 100.821 14.282C101.531 13.4713 101.885 12.306 101.885 10.786C101.885 9.24067 101.417 8.15133 100.479 7.518C99.5674 6.85933 98.1361 6.53 96.1854 6.53H92.8034V15.46H96.7934ZM135.468 26.366V28H109.324V26.366H119.204L109.21 1.438H115.632L122.396 18.348L129.16 1.438H135.582L125.55 26.366H135.468ZM167.672 26.366V28H157.678L155.208 22.262H144.074L141.604 28H131.61V26.366H135.98L146.772 1.438H152.51L163.264 26.366H167.672ZM149.66 9.342L146.316 17.056H152.966L149.66 9.342ZM192.339 26.366V28H163.801V26.366H171.363C168.247 24.2887 166.689 20.932 166.689 16.296V1.438H172.617V16.106C172.617 18.234 173.111 19.9187 174.099 21.16C175.087 22.376 176.417 22.984 178.089 22.984C179.761 22.984 181.078 22.376 182.041 21.16C183.029 19.9187 183.523 18.234 183.523 16.106V1.438H189.451V16.296C189.451 20.932 187.905 24.2887 184.815 26.366H192.339ZM216.544 26.366V28H191.92V26.366H195.606V1.438H201.534V22.718H212.858V26.366H216.544ZM237.04 26.366V28H213.936V26.366H222.524V6.568H215V1.438H235.976V6.568H228.452V26.366H237.04Z"
                fill="black"
              />
            </svg>
          </CardTitle>
          {/* <CardTitle className="text-3xl font-bold flex justify-center">
            Login
          </CardTitle> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center mb-6">
              <div className=" flex items-center justify-center"></div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="mt-1"
              />
            </div>

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-1/2 mr-2 bg-white"
                disabled={isLoading}
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-1/2 bg-[#000000] text-white hover:bg-black"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
          <p className="text-center mt-4 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/accounts/signup"
              className="text-black hover:text-black underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
