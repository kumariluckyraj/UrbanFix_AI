import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "leaflet/dist/leaflet.css";
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
          <div > 
            
            {children}
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}



