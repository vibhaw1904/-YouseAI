import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "./provider";
import Sidebar from "@/components/SideBar";
import DarkNavbar from "@/components/Topbar";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <DarkNavbar/> */}
        <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}  
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
      </body>
      </Provider>
    
    </html>
  );
}
