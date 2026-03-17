import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ink Masters DTF — AI Sales Assistant",
  description:
    "Get instant help choosing the right DTF gang sheet size, placing orders, and answering your questions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex h-screen flex-col bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <main className="flex flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
