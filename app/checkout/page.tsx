"use client";

import { useState, useEffect } from "react";
import { useCart } from "../../src/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, CreditCard, ShieldCheck, ShoppingBag, Truck } from "lucide-react";

export default function CheckoutPage() {
  const { cart, totalAmount, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de procesamiento de pago
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      clearCart();
    }, 1500);
  };

  // PANTALLA DE CONFIRMACIÓN DE COMPRA EXITOSA
  if (isSubmitted) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mb-4">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
            ¡Gracias por tu compra!
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Tu pedido <span className="font-bold text-emerald-600">#EMA-{Math.floor(100000 + Math.random() * 900000)}</span> ha sido procesado con éxito.
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Hemos enviado los detalles y el número de seguimiento a tu correo electrónico.
          </p>

          <div className="mt-8">
            <Link
              href="/catalogo"
              className="block w-full rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-500"
            >
              Volver a la Tienda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // PANTALLA SI EL CARRITO ESTÁ VACÍO
  if (cart.length === 0) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-4">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Tu carrito está vacío</h2>
        <p className="text-sm text-zinc-500 mt-1 max-w-sm">
          Añade algunas camisetas de tus equipos preferidos antes de realizar el pedido.
        </p>
        <Link
          href="/catalogo"
          className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-500"
        >
          Explorar Catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Botón Volver */}
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-emerald-600 transition">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a la tienda</span>
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
        Finalizar Compra
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FORMULARIO (Se muestra arriba en Móvil / Izquierda en Desktop) */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Sección 1: Datos de Envío */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-base text-zinc-900 dark:text-zinc-100 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <Truck className="h-5 w-5 text-emerald-600" />
                <span>1. Información de Envío</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Ej: Emanuel Rodríguez"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Dirección de Entrega</label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Calle, número, piso..."
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Ciudad</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="Madrid / Buenos Aires..."
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Código Postal</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    placeholder="28001"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Sección 2: Pago Simulado */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-4">
                <div className="flex items-center gap-2 font-bold text-base text-zinc-900 dark:text-zinc-100">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  <span>2. Método de Pago</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded-md">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Prueba Segura</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Número de Tarjeta</label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    maxLength={19}
                    placeholder="4532 •••• •••• 8892"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Expiración</label>
                    <input
                      type="text"
                      name="cardExp"
                      required
                      placeholder="MM/AA"
                      maxLength={5}
                      value={formData.cardExp}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">CVC / CVV</label>
                    <input
                      type="text"
                      name="cardCvc"
                      required
                      placeholder="123"
                      maxLength={4}
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Botón Pagar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 disabled:opacity-50"
            >
              {loading ? "Procesando Pedido..." : `Confirmar y Pagar $${totalAmount.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* RESUMEN DEL PEDIDO (Arriba en Móvil / Derecha sticky en Desktop) */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 sticky top-24">
            <h2 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
              Resumen del Pedido ({cart.length})
            </h2>

            {/* Lista de Productos */}
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <div className="relative h-14 w-14 flex-shrink-0 rounded-lg overflow-hidden bg-white border border-zinc-200 dark:border-zinc-800">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">{item.name}</h3>
                    <p className="text-[11px] text-zinc-500">Cant: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Desglose de Precios */}
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Envío</span>
                <span className="text-emerald-600 font-semibold">GRATIS</span>
              </div>
              <div className="flex justify-between font-black text-sm text-zinc-900 dark:text-zinc-100 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span>Total</span>
                <span className="text-emerald-600">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}