"use client";
import type { Metadata, Viewport } from "next";
import { useState } from "react";
import { CartProvider } from "@/src/context/CartContext";
import { CartDrawer } from "@/src/components/CartDrawer";
import { Header } from "@/src/components/Header";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Client } from "pg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <CartProvider>
       {/* Le pasamos la función para abrir el carrito */}
          <Header onOpenCart={() => setIsCartOpen(true)} />
          
          <div className="flex-1 w-full max-w-full overflow-x-hidden">
            {children}
          </div>
          {/* Componente del carrito visible cuando isCartOpen es true */}
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </CartProvider>
      </body>
    </html>
  );
}