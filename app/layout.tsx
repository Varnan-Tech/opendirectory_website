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
  metadataBase: new URL("https://opendirectory.dev"),
  title: "Open Directory | Open-source agent skills and MCP servers",
  description:
    "The unified home for open-source GTM agent skills, CLI utilities, and automation pipelines designed for autonomous agents like Claude Code, OpenCode, and Gemini.",
  keywords: ["autonomous agents", "open source", "MCP servers", "Claude Code", "OpenCode", "developer tools", "skills"],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Open Directory | Agent Skills",
    description: "The unified home for open-source GTM agent skills and automation pipelines designed for autonomous agents.",
    url: "https://opendirectory.dev",
    siteName: "Open Directory",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Open Directory | Agent Skills",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Directory | Agent Skills",
    description: "The unified home for open-source GTM agent skills and automation pipelines designed for autonomous agents.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
