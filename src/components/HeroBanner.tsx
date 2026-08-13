import Link from "next/link";

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-900 text-white my-4 sm:my-6 shadow-2xl">
      {/* Efecto de luces/glow de fondo */}
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative px-4 py-8 sm:px-12 sm:py-16 text-center max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Badge Centrado */}
        <span className="inline-block px-3 py-1 mb-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 rounded-full text-center">
          NUEVA TEMPORADA 2026/2027
        </span>

        {/* Título Principal con ajuste automático de palabra */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-3 wrap-break-word w-full">
          Viste la pasión <br className="hidden sm:inline" /> de tu equipo
        </h1>

        {/* Subtítulo */}
        <p className="text-xs sm:text-sm text-zinc-300 max-w-md sm:max-w-xl mb-6 leading-relaxed">
          Equipaciones oficiales, ediciones especiales y joyas retro coleccionables con envíos a todo el mundo.
        </p>

        {/* Botones Apilados en Móvil / En fila en Desktop */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <Link
            href="/catalogo"
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-emerald-600/20 text-center"
          >
            Explorar Catálogo
          </Link>
          
          <Link
            href="/catalogo?filtro=RETRO"
            className="w-full sm:w-auto px-6 py-3 bg-zinc-800/90 hover:bg-zinc-800 text-zinc-200 font-bold text-xs sm:text-sm rounded-xl border border-zinc-700/50 transition text-center"
          >
            Ver Colección Retro ⭐
          </Link>
        </div>

      </div>
    </div>
  );
}