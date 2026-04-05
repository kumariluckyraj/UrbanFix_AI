"use client";

import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  // 🔥 Check admin from localStorage
  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <nav className="bg-green-500 text-white px-2 py-4 shadow-md flex justify-between items-center flex-wrap">
      <div className="text-2xl font-bold">
        <Link href="/">EquiCraft</Link>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
        <Link href="/"><span className="font-bold text-lg hover:underline">Home</span></Link>
        <Link href="/sell"><span className="font-bold text-lg hover:underline">Sell</span></Link>

        {/* 🔥 ADMIN VIEW */}
        {isAdmin ? (
          <>
            <span className="bg-yellow-300 text-black px-3 py-1 rounded">
              Admin Panel
            </span>

            <button
              onClick={() => {
                localStorage.removeItem("isAdmin");
                setIsAdmin(false);
              }}
              className="bg-white text-green-700 px-4 py-2 rounded-lg"
            >
              Logout Admin
            </button>
          </>
        ) : session ? (
          <>
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              className="bg-white text-green-700 px-4 py-2 rounded-lg"
            >
              Welcome {session.user.email.split('@')[0]}
            </button>

            {showdropdown && (
              <div className="absolute top-12 right-0 bg-white text-green-800 shadow-lg rounded-lg w-44 z-50">
                <ul>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <Link href="/login">
            <button className="bg-white text-green-700 px-4 py-2 rounded-lg">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar