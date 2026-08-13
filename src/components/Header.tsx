"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Search, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Header({ onOpenCart }: { onOpenCart?: () => void }) {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // 1. Estado para detectar si ya estamos en el navegador
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const leagues = [
    { name: "LaLiga", filter: "LaLiga" },
    { name: "Premier League", filter: "Premier League" },
    { name: "Serie A", filter: "Serie A" },
    { name: "Selecciones Nacionales", filter: "Selecciones" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">

      {/* Top Banner Ofertas */}
      <div className="bg-zinc-900 text-white text-[10px] sm:text-xs py-1.5 text-center font-bold uppercase tracking-wider px-2 whitespace-nowrap overflow-hidden text-ellipsis">
        ★ Envío gratuito en compras superiores a $50 ★ 14 días de devolución fácil ★
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Botón Menú Hamburguesa (Solo Móvil) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-700 dark:text-zinc-200"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-zinc-900 dark:text-white">
            <span className="text-emerald-600">👕</span> EMASPORT
          </Link>

          {/* Menú Desktop (Oculto en móvil) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <Link href="/" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition">
              Inicio
            </Link>

            {/* Dropdown Ligas */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white py-2 transition">
                Camisetas por Liga <ChevronDown className="h-4 w-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-2 z-50">
                  {leagues.map((league) => (
                    <Link
                      key={league.name}
                      href={`/catalogo?filtro=${encodeURIComponent(league.filter)}`}
                      className="block px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-zinc-800 hover:text-emerald-600 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {league.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/catalogo?filtro=RETRO" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition">
              Colección Retro ⭐
            </Link>
          </nav>

          {/* Acciones (Buscador, User, Carrito) */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/catalogo" className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400">
              <Search className="h-5 w-5" />
            </Link>

            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-full px-3 py-1.5 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            >
              <User className="h-4 w-4" />
              Iniciar sesión
            </Link>

            {/* Botón Carrito */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-zinc-800 dark:text-zinc-100 hover:opacity-80 transition"
              aria-label="Carrito"
            >
              <ShoppingBag className="h-5 w-5" />

              {/* SOLO mostramos la insignia si mounted es true Y hay items */}
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-900"
          >
            Inicio
          </Link>

          <div className="py-2 border-b border-zinc-100 dark:border-zinc-900">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Por Liga</p>
            <div className="pl-2 space-y-2">
              {leagues.map((league) => (
                <Link
                  key={league.name}
                  href={`/catalogo?filtro=${encodeURIComponent(league.filter)}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-zinc-600 dark:text-zinc-400"
                >
                  {league.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/catalogo?filtro=RETRO"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-900"
          >
            Colección Retro ⭐
          </Link>

          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-xs font-bold"
          >
            <User className="h-4 w-4" />
            Iniciar sesión
          </Link>
        </div>
      )}
    </header>
  );
}