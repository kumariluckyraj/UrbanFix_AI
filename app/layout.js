import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get me a chai - Fund your project with chai",
  description: "This website is a crowdfunding platform for creators.",
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



