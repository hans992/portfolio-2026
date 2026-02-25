import "./globals.css";
import { Inter } from "next/font/google";
import { Syne } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://damir-andrijanic.com"),
  title: { default: "Damir Andrijanic | Full-Stack AI Engineer", template: "%s | Damir Andrijanic" },
  description:
    "Full-stack engineer building AI-powered web applications for the European market. GDPR, SGB XI, logistics.",
  openGraph: {
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable} font-sans min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
