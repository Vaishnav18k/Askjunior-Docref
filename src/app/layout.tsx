
import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import {ConvexClientProvider } from "../app/ConvexClientProvider";
import { EdgeStoreProvider } from "../app/lib/edgestore";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Docref",
  description: "Document Reference System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><StackProvider app={stackServerApp}><StackTheme>
          <ConvexClientProvider>
        <EdgeStoreProvider>
        {children}
        </EdgeStoreProvider>
          </ConvexClientProvider>
      </StackTheme></StackProvider></body>
    </html>
  );
}
