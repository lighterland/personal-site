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
  title: "Sadana Erland | Data Analyst & Storyteller",
  description:
    "Portfolio of Sadana Erland — data analyst specializing in logistics, supply chain analytics, and data storytelling. Turning data into decisions.",
  keywords: [
    "Data Analyst",
    "Sadana Erland",
    "Power BI",
    "Python",
    "SQL",
    "Data Storytelling",
    "Logistics Analytics",
    "Supply Chain",
  ],
  authors: [{ name: "Sadana Erland" }],
  openGraph: {
    title: "Sadana Erland | Data & Narrative",
    description: "Turning data into decisions.",
    url: "https://sadanaerland.com",
    siteName: "Sadana Erland Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadana Erland | Data & Narrative",
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
