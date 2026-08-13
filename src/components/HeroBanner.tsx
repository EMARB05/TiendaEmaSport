import Link from "next/link";

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-zinc-900 text-white shadow-2xl my-6">
      {/* Imagen de fondo opcional o gradiente moderno */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-900/40 via-zinc-900 to-zinc-950" />
      
      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-24 text-center">
        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
          NUEVA TEMPORADA 2026/2027
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl uppercase">
          Viste la Pasión de tu Equipo
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
          Equipaciones oficiales, ediciones especiales y joyas retro coleccionables con envíos a todo el mundo.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/catalogo"
            className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-500"
          >
            Explorar Catálogo
          </Link>
          <a
            href="#catalogo"
            className="rounded-xl border border-zinc-700 bg-zinc-800/80 px-6 py-3 text-sm font-bold text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
          >
            Ver Ofertas
          </a>
        </div>
      </div>
    </div>
  );
}