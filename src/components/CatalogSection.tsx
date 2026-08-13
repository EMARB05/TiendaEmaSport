"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { Search, Filter } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  team: string;
  isRetro: boolean;
}

export function CatalogSection({ initialProducts }: { initialProducts: Product[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "RETRO" | "MODERN">("ALL");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.team.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedFilter === "ALL"
          ? true
          : selectedFilter === "RETRO"
          ? product.isRetro
          : !product.isRetro;

      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, searchTerm, selectedFilter]);

  return (
    <section id="catalogo" className="py-8">
      {/* Barra de Filtros y Buscador */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        
        {/* Selector de Categoría */}
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setSelectedFilter("ALL")}
            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition ${
              selectedFilter === "ALL"
                ? "bg-emerald-600 text-white shadow"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setSelectedFilter("MODERN")}
            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition ${
              selectedFilter === "MODERN"
                ? "bg-emerald-600 text-white shadow"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            Actuales
          </button>
          <button
            onClick={() => setSelectedFilter("RETRO")}
            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition ${
              selectedFilter === "RETRO"
                ? "bg-emerald-600 text-white shadow"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            Ediciones Retro ⭐
          </button>
        </div>

        {/* Input Buscador */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por equipo o camiseta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>
      </div>

      {/* Grid de Productos */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">
          No se encontraron camisetas que coincidan con tu búsqueda.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}