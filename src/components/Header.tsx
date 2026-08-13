"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Shirt, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { UserMenu } from "./UserMenu";

export function Header() {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Barra de anuncios superior estilo e-commerce */}
      <div className="bg-zinc-900 px-4 py-2 text-center text-xs font-semibold text-zinc-200">
        <span>★ ENVÍO GRATUITO EN COMPRAS SUPERIORES A $50 ★ 14 DÍAS DE DEVOLUCIÓN FÁCIL ★</span>
      </div>

      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
            <Shirt className="h-6 w-6 text-emerald-600" />
            <span>CAMISETAS<span className="text-emerald-600">FC</span></span>
          </Link>

          {/* Navegación */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            <Link href="/" className="hover:text-emerald-600 transition">Inicio</Link>
            <Link href="/catalogo" className="hover:text-emerald-600 transition">Catálogo</Link>
            <Link href="/#retro" className="hover:text-emerald-600 transition">Colección Retro</Link>
          </nav>

          {/* Acciones del usuario */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Buscador */}
            <Link
              href="/catalogo"
              className="p-2 text-zinc-700 hover:text-emerald-600 dark:text-zinc-300 transition"
              title="Buscar productos"
            >
              <Search className="h-5 w-5" />
            </Link>

            {/* Menu Usuario */}
            <UserMenu />

            {/* Carrito */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center p-2 text-zinc-700 hover:text-emerald-600 dark:text-zinc-300 transition"
            >
              <ShoppingBag className="h-5 w-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}