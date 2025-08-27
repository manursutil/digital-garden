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
      <body className={`${mono.variable} font-mono`}>
        <header className="container-narrow py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link
              href="/"
              className="text-2xl sm:text-3xl md:text-4xl font-bold inline-block accent-underline"
            >
              manurodriguez.garden
            </Link>
            <nav className="text-sm flex gap-4">
              <Link href="/blog" className="link-accent">
                All posts
              </Link>
              <Link href="/tags" className="link-accent">
                Tags
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="container-narrow py-12 text-xs opacity-70 dark:opacity-80">
          © {new Date().getFullYear()} Manuel Rodriguez Sutil
        </footer>
      </body>
    </html>
  );
}
