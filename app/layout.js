import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Equicraft - AI Powered Eco-Friendly Product Verification Platform",
description: "Equicraft is an AI-powered platform that analyzes and verifies whether products are truly eco-friendly using RAG, vector search, and image classification.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <Navbar />
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"> 
            <br/>
            <br/>
            <br/>
            <br/>
            {children}
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}



