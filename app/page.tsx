import { prisma } from "../src/lib/prisma";
import { HeroBanner } from "../src/components/HeroBanner";
import { CatalogSection } from "../src/components/CatalogSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EmaSport | Tienda Oficial de Camisetas de Fútbol",
  description: "Consigue las mejores camisetas oficiales de fútbol y colecciones retro con envío gratis.",
};

export default async function HomePage() {
  const products = await prisma.product.findMany();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Banner Principal */}
      <HeroBanner />

      {/* Título de la sección */}
      <div className="mt-12 mb-4">
        <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 uppercase">
          Nuestra Colección
        </h2>
        <p className="text-sm text-zinc-500">
          Explora las últimas camisetas de fútbol disponibles.
        </p>
      </div>

      {/* Catálogo con Filtros y Buscador */}
      <CatalogSection initialProducts={products} />
    </main>
  );
}