import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Edward Serna | Computer Engineering Portfolio",
  description: "Computer Engineering graduate from UTSA specializing in embedded systems, machine learning, and full-stack development. This web app is a compulation of all my projects and ideas in one place. The goal is to have a outline of what I have done and will be doing in the upcoming years.",
  keywords: [
    "Edward Serna",
    "Computer Engineering",
    "Embedded Systems",
    "Machine Learning",
    "Full-Stack Developer",
    "MSP430",
    "ESP32",
    "React",
    "Next.js",
    "C/C++",
    "Python",
    "IoT",
    "Autonomous Systems",
    "UTSA",
    "Portfolio"
  ],
  authors: [{ name: "Edward Serna", url: "https://edwardserna.dev" }],
  creator: "Edward Serna",
  publisher: "Edward Serna",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://edwardserna.dev",
    title: "Edward Serna | Computer Engineering Portfolio",
    description: "Computer Engineering graduate from UTSA specializing in embedded systems, machine learning, and full-stack development. This web app is a compulation of all my projects and ideas in one place. The goal is to have a outline of what I have done and will be doing in the upcoming years.",
    siteName: "Edward Serna Portfolio",
    images: [
      {
        url: "https://edwardserna.dev/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Edward Serna - Computer Engineering Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edward Serna | Computer Engineering Portfolio",
    description: "Computer Engineering graduate from UTSA specializing in embedded systems, machine learning, and full-stack development. This web app is a compulation of all my projects and ideas in one place. The goal is to have a outline of what I have done and will be doing in the upcoming years.",
    images: ["https://edwardserna.dev/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#00ff88" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}