import type { Metadata } from "next";
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
  title: "Veille Santé - Health & InsurTech News",
  description: "Outil de veille santé et insurtech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="w-full px-6 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  Veille Santé
                </span>
                <span className="text-sm text-gray-500">
                  Health & InsurTech
                </span>
              </a>
              <nav className="flex items-center gap-4">
                <a
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </a>
                <a
                  href="/articles"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Articles
                </a>
                <a
                  href="/competitors"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Concurrents
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main className="w-full px-6 py-6">{children}</main>
      </body>
    </html>
  );
}
