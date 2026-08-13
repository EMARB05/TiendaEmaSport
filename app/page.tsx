import { prisma } from "../src/lib/prisma";
import { ProductCard } from "../src/components/ProductCard";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Tienda de Camisetas
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Equipaciones oficiales, retro y personalizadas de tus equipos favoritos.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}