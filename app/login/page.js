"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      router.push("/sell");
    }
  }, [session, router]);

  // 🔥 ADMIN LOGIN HANDLER
  const handleAdminLogin = async () => {
    setError("");

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin"); // 🔥 redirect admin
      } else {
        setError("Invalid admin credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="text-white py-14 container mx-auto">
      <h1 className="text-center font-bold text-3xl">
        Login to Get Started
      </h1>

      <div className="flex flex-col gap-6 min-h-screen items-center p-10">

        {/* 🔥 ADMIN LOGIN */}
        <div className="bg-white text-black p-6 rounded-xl w-80">
          <h2 className="text-lg font-semibold mb-3">Admin Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleAdminLogin}
            className="w-full bg-black text-white py-2 rounded"
          >
            Login as Admin
          </button>

          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}
        </div>

        {/* 🔹 OR Divider */}
        <p className="text-gray-400">OR</p>

        {/* 🔥 GITHUB LOGIN */}
        <button
          onClick={() => signIn("github")}
          className="flex items-center w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-200"
        >
          <span>Continue with Github</span>
        </button>

      </div>
    </div>
  );
};

export default Login;