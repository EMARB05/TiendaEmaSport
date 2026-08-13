import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  team: string;
  isRetro: boolean;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover object-center transition group-hover:scale-105"
        />
        {product.isRetro && (
          <span className="absolute top-2 left-2 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
            Retro
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <p className="text-xs text-zinc-500 uppercase tracking-wider">{product.team}</p>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
          ${product.price.toFixed(2)}
        </p>
      </div>

      <Link
        href={`/productos/${product.slug}`}
        className="mt-3 flex w-full items-center justify-center rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Ver detalle
      </Link>
    </div>
  );
}