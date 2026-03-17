import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className="m-0 overflow-hidden bg-transparent text-gray-900 antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
