// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "manurodriguez.garden",
  description: "Digital Garden",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mono.variable} font-mono bg-white text-black`}>
        <header className="container-narrow py-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl md:text-4xl font-bold inline-block  accent-underline"
          >
            manurodriguez.garden
          </Link>
          <nav className="text-sm flex gap-4">
            <Link href="/blog" className="link-accent">
              All posts
            </Link>
          </nav>
        </header>

        {children}

        <footer className="container-narrow py-12 text-xs opacity-70">
          © {new Date().getFullYear()} Manuel Rodriguez Sutil
        </footer>
      </body>
    </html>
  );
}
