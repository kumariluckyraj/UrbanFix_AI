"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Navbar = () => {
  const { data: session } = useSession();
const router = useRouter();
  const [showdropdown, setShowdropdown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const admin = localStorage.getItem("isAdmin");
    setIsAdmin(admin === "true");
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* FONTS + GLOBAL STYLE */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .nav-link {
          color: rgba(232,234,240,0.6);
          font-size: 0.85rem;
          text-decoration: none;
          transition: 0.2s;
        }
        .nav-link:hover {
          color: #60a5fa;
        }

        .glass-btn {
          padding: 0.55rem 1rem;
          border-radius: 10px;
          border: 1px solid rgba(59,130,246,0.35);
          background: rgba(30,77,183,0.1);
          color: #93c5fd;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .glass-btn:hover {
          background: rgba(59,130,246,0.15);
          transform: translateY(-1px);
        }

        .dropdown {
          position: absolute;
          right: 0;
          top: 3.2rem;
          background: rgba(10,16,38,0.95);
          border: 1px solid rgba(59,130,246,0.25);
          border-radius: 12px;
          padding: 0.5rem;
          min-width: 160px;
          backdrop-filter: blur(14px);
          z-index: 50;
        }

        .dropdown button {
          width: 100%;
          text-align: left;
          padding: 0.6rem 0.8rem;
          background: transparent;
          border: none;
          color: rgba(232,234,240,0.8);
          cursor: pointer;
        }

        .dropdown button:hover {
          background: rgba(59,130,246,0.1);
          color: #93c5fd;
        }
      `}</style>

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 3rem",
          background: "rgba(6,10,18,0.75)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(30,77,183,0.25)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: "linear-gradient(135deg,#1e4db7,#0ea5e9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            U
          </div>
          <span
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              color: "#e8eaf0",
              letterSpacing: "-0.02em",
            }}
          >
            Urban<span style={{ color: "#3b82f6" }}>Fix</span>
          </span>
        </div>

        {/* LINKS */}
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/submit" className="nav-link">
            Submit
          </Link>
        </div>

        {/* RIGHT SIDE LOGIC (UNCHANGED) */}
        <div style={{ position: "relative", display: "flex", gap: "1rem", alignItems: "center" }}>
          {isAdmin ? (
            <>
              <button
                className="glass-btn"
                onClick={() => {
                  router.push("/admin/data");
                }}
              >
                Admin Panel
              </button>

              <button
                className="glass-btn"
                onClick={() => {
                  localStorage.removeItem("isAdmin");
                  window.location.href = "/";
                }}
              >
                Logout Admin
              </button>
            </>
          ) : session ? (
            <>
              <button
                className="glass-btn"
                onClick={() => setShowdropdown(!showdropdown)}
              >
                Welcome {session.user.email.split("@")[0]}
              </button>

              {showdropdown && (
                <div className="dropdown">
                  <button onClick={() => signOut()}>Sign out</button>
                </div>
              )}
            </>
          ) : (
            <Link href="/login">
              <button className="glass-btn">Login</button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;