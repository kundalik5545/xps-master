"use client";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function DarkModeButton() {
  const [isDark, setIsDark] = useState(
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  function toggleDarkMode() {
    if (typeof window === "undefined") return;
    const htmlEl = document.documentElement;
    if (htmlEl.classList.contains("dark")) {
      htmlEl.classList.remove("dark");
      setIsDark(false);
      localStorage.setItem("theme", "light");
    } else {
      htmlEl.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  }

  // Sync with theme on mount
  useState(() => {
    if (typeof window === "undefined") return;
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  });

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
      className="rounded-md border border-border bg-background/70 px-2.5 py-1.5 text-xs font-medium shadow hover:bg-muted transition-colors dark:bg-neutral-900 dark:border-neutral-800 absolute top-6 right-6 z-20"
    >
      {isDark ? "☀️ Light" : "🌑 Dark"}
    </button>
  );
}

export default function HomeLanding() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-neutral-50 to-muted dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-800">
      <DarkModeButton />
      <section className="flex flex-col items-center justify-center h-[70vh]">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
            Welcome to XPS Master
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground mb-8">
            Supercharge your productivity with the all-in-one portal built for
            speed, focus, and creativity.
          </p>
          <Link href="/basics/portals">
            <Button variant="default">
              Get Started <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-center gap-6 py-12">
        <div className="flex-1 bg-background dark:bg-neutral-900 rounded-xl shadow p-8 flex flex-col items-center text-center">
          <span className="text-3xl mb-4">🚀</span>
          <h2 className="text-xl font-semibold mb-2">Fast & Modern</h2>
          <p className="text-muted-foreground mb-0">
            Built on Next.js 15 and React 19 with instant load times and smooth
            transitions.
          </p>
        </div>
        <div className="flex-1 bg-background dark:bg-neutral-900 rounded-xl shadow p-8 flex flex-col items-center text-center">
          <span className="text-3xl mb-4">🎨</span>
          <h2 className="text-xl font-semibold mb-2">Beautifully Themed</h2>
          <p className="text-muted-foreground mb-0">
            Tailwind CSS v4 design, full dark mode, and responsive on every
            device.
          </p>
        </div>
        <div className="flex-1 bg-background dark:bg-neutral-900 rounded-xl shadow p-8 flex flex-col items-center text-center">
          <span className="text-3xl mb-4">🔒</span>
          <h2 className="text-xl font-semibold mb-2">Secure & Private</h2>
          <p className="text-muted-foreground mb-0">
            Powered by Prisma and SQLite — your data, your control.
          </p>
        </div>
      </section>
      <footer className="w-full py-8 mt-12 border-t border-border bg-background/70 dark:bg-neutral-900/80">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>
            &copy; {new Date().getFullYear()} XPS Master by JK. All rights
            reserved.
          </span>
          <span>
            <Link
              href="https://github.com/JK"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </span>
        </div>
      </footer>
    </main>
  );
}
