import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import DashboardLayout from "./DashboardLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EAIMS Dashboard",
  description: "Enterprise Asset Integrity Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable}
          antialiased
          h-full
          overflow-hidden

          /* 🌎 ROOT CANVAS */
          bg-slate-50
          dark:bg-[var(--color-brand-darkBg)]

          /* smoother text rendering */
          text-slate-900
          dark:text-slate-100
        `}
      >
        {/* 🌈 LIGHT MODE SUBTLE DEPTH LAYER */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="
            absolute inset-0
            bg-gradient-to-b
            from-white/50
            via-transparent
            to-transparent
            dark:from-transparent
          " />
        </div>

        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}