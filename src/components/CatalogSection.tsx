"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  team: string;
  isRetro: boolean;
  league?: string; // Ej: "LaLiga", "Premier League", "Serie A", "Internacionales"
}

const LEAGUES = [
  { id: "ALL", name: "Todas las Ligas" },
  { id: "LaLiga", name: "LaLiga" },
  { id: "Premier League", name: "Premier League" },
  { id: "Serie A", name: "Serie A" },
  { id: "Selecciones", name: "Selecciones" },
  { id: "RETRO", name: "Colección Retro ⭐" },
];

export function CatalogSection({ 
  initialProducts, 
  defaultFilter = "ALL" 
}: { 
  initialProducts: Product[];
  defaultFilter?: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeague, setSelectedLeague] = useState<string>(defaultFilter);

  useEffect(() => {
    setSelectedLeague(defaultFilter);
  }, [defaultFilter]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Filtro de Búsqueda
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.team.toLowerCase().includes(searchTerm.toLowerCase());

     // Filtro de Liga / Categoría
let matchesCategory = true;
if (selectedLeague === "RETRO") {
  matchesCategory = product.isRetro;
} else if (selectedLeague !== "ALL") {
  const currentLeague = (product.league || "").toLowerCase();
  const searchLeague = selectedLeague.toLowerCase();

  matchesCategory =
    currentLeague === searchLeague ||
    // Soporte para variaciones (por si acaso conviven Selecciones e Internacionales)
    (searchLeague === "selecciones" && currentLeague === "internacionales") ||
    (searchLeague === "internacionales" && currentLeague === "selecciones") ||
    product.name.toLowerCase().includes(searchLeague) ||
    product.team.toLowerCase().includes(searchLeague);
}

      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, searchTerm, selectedLeague]);

  return (
    <section id="catalogo" className="py-4">
      {/* Barra de Filtros y Buscador */}
      <div className="flex flex-col gap-4 mb-8">
        
        {/* Buscador Superior */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar por equipo, jugador o camiseta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-sm"
            />
          </div>

          <span className="text-xs font-semibold text-zinc-500 self-end md:self-center">
            {filteredProducts.length} {filteredProducts.length === 1 ? "camiseta encontrada" : "camisetas encontradas"}
          </span>
        </div>

        {/* Chips / Píldoras de Ligas */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {LEAGUES.map((league) => {
            const isActive = selectedLeague.toLowerCase() === league.id.toLowerCase();
            return (
              <button
                key={league.id}
                onClick={() => setSelectedLeague(league.id)}
                className={`whitespace-nowrap px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {league.name}
              </button>
            );
          })}
        </div>

      </div>

      {/* Grid de Productos */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
          <p className="text-zinc-500 text-sm font-medium">
            No se encontraron camisetas para el filtro seleccionado.
          </p>
          <button
            onClick={() => { setSelectedLeague("ALL"); setSearchTerm(""); }}
            className="mt-4 text-xs font-bold text-emerald-600 hover:underline"
          >
            Ver todas las camisetas
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
  {filteredProducts.map((product) => (
    <ProductCard key={product.id || product.slug} product={product} />
  ))}
</div>
      )}
    </section>
  );
}