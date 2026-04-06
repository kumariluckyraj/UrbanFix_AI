"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/submit");
    }
  }, [session, router]);

  const handleAdminLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "/admin/data";
      } else {
        setError("Invalid admin credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', 'Syne', sans-serif",
        background:
          "radial-gradient(circle at top, rgba(59,130,246,0.15), transparent 40%), #0b1220",
        padding: "2rem",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .login-card {
          transition: all 0.25s ease;
        }

        .login-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.55);
        }

        .input-field:focus {
          outline: none;
          border-color: rgba(59,130,246,0.6);
          box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
        }

        .btn:hover {
          background: rgba(59,130,246,0.25) !important;
        }

        .btn:active {
          transform: scale(0.97);
        }
      `}</style>

      {/* CARD */}
      <div
        className="login-card"
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(15, 23, 42, 0.72)",
          border: "1px solid rgba(148, 163, 184, 0.18)",
          borderRadius: 18,
          boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)",
          padding: "2rem",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.72rem",
              color: "#60a5fa",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
            }}
          >
            UrbanFix Admin
          </p>

          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "#fff",
              margin: 0,
            }}
          >
            Login Portal
          </h1>

          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(232,234,240,0.45)",
              marginTop: "0.5rem",
            }}
          >
            Access civic issue dashboard
          </p>
        </div>

        {/* INPUTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            style={{
              padding: "0.75rem 1rem",
              borderRadius: 10,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e8eaf0",
              fontSize: "0.85rem",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            style={{
              padding: "0.75rem 1rem",
              borderRadius: 10,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e8eaf0",
              fontSize: "0.85rem",
            }}
          />

          {error && (
            <p style={{ color: "#f87171", fontSize: "0.8rem", margin: 0 }}>
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            onClick={handleAdminLogin}
            className="btn"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem",
              borderRadius: 10,
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.35)",
              color: "#93c5fd",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </div>

        {/* FOOTER */}
        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.7rem",
            textAlign: "center",
            color: "rgba(232,234,240,0.3)",
          }}
        >
          Secure access for authorized personnel only
        </p>
      </div>
    </div>
  );
};

export default Login;