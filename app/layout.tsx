import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/src/context/CartContext";
import { Header } from "@/src/components/Header";
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
  title: "EmaSport | Las mejores camisetas de fútbol",
  description: "Tienda online de camisetas de fútbol oficiales y retro.",
};

// ESTO ES CLAVE PARA MÓVILES: Evita que el usuario o el navegador hagan zoom/deformen la pantalla
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <CartProvider>
          <Header />
          <div className="flex-1 w-full max-w-full overflow-x-hidden">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}