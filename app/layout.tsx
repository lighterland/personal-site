import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Erland Sadana | Data Analyst & Storyteller",
  description:
    "Portfolio of Erland Sadana — data analyst specializing in logistics, supply chain analytics, and data storytelling. Turning data into decisions.",
  keywords: [
    "Data Analyst",
    "Erland Sadana",
    "Power BI",
    "Python",
    "SQL",
    "Data Storytelling",
    "Logistics Analytics",
    "Supply Chain",
  ],
  authors: [{ name: "Erland Sadana" }],
  openGraph: {
    title: "Erland Sadana | Data & Narrative",
    description: "Turning data into decisions.",
    url: "https://sadanaerland.com",
    siteName: "Erland Sadana Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erland Sadana | Data & Narrative",
    description: "Turning data into decisions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
