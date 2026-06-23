import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "ROMIA",
  description: "AI-Powered Lead Intelligence Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
  lang="en"
  className={`${orbitron.variable} ${inter.variable}`}
>
      <body style={{ backgroundColor: "var(--bg)", color: "var(--ink)" }}>
        {children}
      </body>
    </html>
  );
}