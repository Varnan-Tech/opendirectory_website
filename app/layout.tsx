import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theaterFont = localFont({
  src: "../public/theater/Theater_Bold.otf",
  variable: "--font-theater",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Open Directory | Open-source tools, skills, and MCP servers",
  description:
    "Open Directory is the home for Varnan's open-source tools, skills, MCP servers, and automation pipelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${theaterFont.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col bg-background text-foreground font-sans"
        suppressHydrationWarning
      >
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
