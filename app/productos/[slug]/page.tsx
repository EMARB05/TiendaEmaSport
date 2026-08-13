import { prisma } from "../../../src/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartSection } from "../../../src/components/AddToCartSection";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
            {product.league} - {product.team}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>

          <AddToCartSection product={product} />
        </div>
      </div>
    </main>
  );
}