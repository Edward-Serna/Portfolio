import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Edward Serna | Computer Engineering Portfolio",
  description: "Computer Engineering graduate from UTSA specializing in embedded systems, machine learning, and full-stack development.",
  keywords: ["Edward Serna","Computer Engineering","Embedded Systems","Machine Learning","Full-Stack Developer","MSP430","ESP32","React","Next.js","C/C++","Python","IoT","Autonomous Systems","UTSA","Portfolio"],
  authors: [{ name: "Edward Serna", url: "https://edwardserna.dev" }],
  creator: "Edward Serna",
  openGraph: {
    type: "website", locale: "en_US", url: "https://edwardserna.dev",
    title: "Edward Serna | Computer Engineering Portfolio",
    description: "Computer Engineering graduate from UTSA specializing in embedded systems, machine learning, and full-stack development.",
    siteName: "Edward Serna Portfolio",
    images: [{ url: "https://edwardserna.dev/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edward Serna | Computer Engineering Portfolio",
    description: "Computer Engineering graduate from UTSA specializing in embedded systems, machine learning, and full-stack development.",
    images: ["https://edwardserna.dev/og-image.jpg"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#009dff" />
      </head>
      <body className={inter.variable}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}