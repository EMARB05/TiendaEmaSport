"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Plus, Minus } from "lucide-react";

interface AddToCartProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
    sizes: string[];
  };
}

export function AddToCartSection({ product }: AddToCartProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError(true);
      return;
    }

    setError(false);
    
    // Guardamos la cantidad seleccionada en ese instante
    const currentQuantity = quantity;

    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: currentQuantity,
    });

    // Reseteamos el contador local de nuevo a 1
    setQuantity(1);

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-6 flex flex-col gap-6">
      {/* Tallas */}
      <div>
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Selecciona tu Talla:
        </h3>
        <div className="mt-2 flex gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(size);
                setError(false);
              }}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                selectedSize === size
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {error && (
          <p className="mt-2 text-xs font-semibold text-red-500">
            * Por favor selecciona una talla antes de añadir al carrito.
          </p>
        )}
      </div>

      {/* Cantidad */}
      <div>
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Cantidad:</h3>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-zinc-300 dark:border-zinc-700">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Botón Añadir */}
      <button
        onClick={handleAddToCart}
        className={`flex w-full items-center justify-center rounded-lg py-3 text-base font-medium text-white transition ${
          added ? "bg-zinc-800" : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        {added ? "¡Añadido al Carrito!" : "Añadir al carrito"}
      </button>
    </div>
  );
}