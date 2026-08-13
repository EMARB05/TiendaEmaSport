import { prisma } from "../../src/lib/prisma";
import { CatalogSection } from "../../src/components/CatalogSection";

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ filtro?: string }>;
}) {
  const products = await prisma.product.findMany();
  const params = await searchParams;

  const defaultFilter = params.filtro || "ALL";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
          Catálogo de Camisetas
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Explora por liga, busca tu equipo preferido y viste los colores de tu pasión.
        </p>
      </div>

      <CatalogSection initialProducts={products} defaultFilter={defaultFilter} />
    </main>
  );
}