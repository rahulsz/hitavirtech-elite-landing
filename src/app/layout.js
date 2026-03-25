import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "HitaVirTech | Elite Data Engineering & Agentic AI residency",
  description:
    "Master the multi-cloud data stack and production-grade Agentic AI. Join the elite practitioners building the future of intelligence.",
  keywords: [
    "data engineering",
    "agentic AI",
    "HitaVirTech",
    "Databricks",
    "modern data stack",
    "residency",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} dark antialiased`}
    >
      <body className="bg-void text-starlight selection:bg-accent-teal/30 noise-overlay">
        {children}
      </body>
    </html>
  );
}
