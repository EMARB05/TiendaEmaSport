"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fondo oscuro */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-900 shadow-xl flex flex-col">
          
          {/* Header del Carrito */}
          <div className="flex items-center justify-between px-4 py-6 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Tu Carrito ({cart.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Lista de productos */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                Tu carrito está vacío.
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 p-3 border rounded-lg border-zinc-200 dark:border-zinc-800"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-zinc-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        <h3 className="line-clamp-1">{item.name}</h3>
                        <p className="ml-2">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-xs text-zinc-500">Talla: {item.size}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="p-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="p-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer con Total y Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
              <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-zinc-100">
                <p>Total:</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full rounded-lg bg-emerald-600 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700 transition"
              >
                Proceder al Pago
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}