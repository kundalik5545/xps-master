import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/ThemeProvider";

const inter = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "XPS Master",
  description: "XPS Master is a platform for managing XPS requests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
