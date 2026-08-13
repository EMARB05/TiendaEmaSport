import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  league?: string;
  season?: string;
  team: string;
  isRetro: boolean;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative rounded-2xl border border-zinc-200 bg-white p-2.5 sm:p-4 flex flex-col justify-between transition hover:shadow-lg">
      
      {/* Contenedor de la Imagen */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100 mb-3 flex items-center justify-center p-2">
        <img
          src={product.images[0] || "/placeholder.png"}
          alt={product.name}
          className="h-full w-full object-contain object-center group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Información */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-0.5">
            {product.team || product.league}
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-zinc-900 line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        <div className="mt-2.5">
          <p className="text-sm sm:text-base font-black text-emerald-600 mb-2">
            ${product.price.toFixed(2)}
          </p>
          
          <Link
            href={`/productos/${product.slug}`}
            className="block w-full py-2 bg-zinc-900 hover:bg-emerald-600 text-white font-bold text-[11px] sm:text-xs rounded-lg text-center transition"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
}