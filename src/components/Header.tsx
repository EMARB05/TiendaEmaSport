"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Shirt, Search, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { UserMenu } from "./UserMenu";

export function Header() {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const leagues = [
    { name: "LaLiga", filter: "LaLiga" },
    { name: "Premier League", filter: "Premier League" },
    { name: "Serie A", filter: "Serie A" },
    { name: "Selecciones / Internacionales", filter: "Internacionales" },
    { name: "Colección Retro ⭐", filter: "retro" },
  ];

  return (
    <>
      <div className="bg-zinc-900 px-4 py-2 text-center text-xs font-semibold text-zinc-200">
        <span>★ ENVÍO GRATUITO EN COMPRAS SUPERIORES A $50 ★ 14 DÍAS DE DEVOLUCIÓN FÁCIL ★</span>
      </div>

      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
            <Shirt className="h-6 w-6 text-emerald-600" />
            <span>EMA<span className="text-emerald-600">SPORT</span></span>
          </Link>

          {/* Navegación con Dropdown */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            <Link href="/" className="hover:text-emerald-600 transition">Inicio</Link>
            
            {/* Desplegable de Camisetas / Ligas */}
            <div 
              className="relative"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-emerald-600 transition py-2">
                <span>Camisetas por Liga</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isMenuOpen ? "rotate-180 text-emerald-600" : ""}`} />
              </button>

              {isMenuOpen && (
                <div className="absolute top-full left-0 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl py-2 z-50">
                  <Link
                    href="/catalogo"
                    className="block px-4 py-2 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 transition"
                  >
                    Ver Todo el Catálogo
                  </Link>
                  <hr className="my-1 border-zinc-100 dark:border-zinc-800" />
                  {leagues.map((item) => (
                    <Link
                      key={item.filter}
                      href={`/catalogo?filtro=${item.filter}`}
                      className="block px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-emerald-600 transition"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/catalogo?filtro=retro" className="hover:text-emerald-600 transition">Colección Retro</Link>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/catalogo" className="p-2 text-zinc-700 hover:text-emerald-600 dark:text-zinc-300 transition" title="Buscar">
              <Search className="h-5 w-5" />
            </Link>

            <UserMenu />

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