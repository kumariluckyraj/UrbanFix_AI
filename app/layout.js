import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "leaflet/dist/leaflet.css";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "URBANFIX_AI - AI Powered Civic Report Platform",
description: "Report broken infrastructure, detect duplicates, and auto-route civic issues to the right department — powered by AI.",
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



