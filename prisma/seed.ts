import { PrismaClient } from "../src/generated/client/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const initialProducts = [
  {
    name: "Camiseta Argentina Local 2022",
    slug: "camiseta-argentina-local-2022",
    description: "Edición especial del campeón del mundo con las tres estrellas bordadas.",
    price: 89.99,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/argentina2022.jpg"],
    league: "Selecciones",
    team: "Argentina",
    season: "2022",
    isRetro: false,
    isCustom: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Camiseta Real Madrid Local 2024/25",
    slug: "camiseta-real-madrid-local-2024-25",
    description: "Diseño elegante en blanco tradicional con detalles dorados y tejido transpirable.",
    price: 95.00,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/madrid2425.png"],
    league: "LaLiga",
    team: "Real Madrid",
    season: "2024/25",
    isRetro: false,
    isCustom: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Camiseta AC Milan Retro 1988",
    slug: "camiseta-ac-milan-retro-1988",
    description: "Diseño clásico de la era dorada italiana. Tejido de alta densidad estilo vintage.",
    price: 75.00,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/milan1988.webp"],
    league: "Serie A",
    team: "AC Milan",
    season: "1988",
    isRetro: true,
    isCustom: false,
    sizes: ["M", "L", "XL"],
  },
  {
    name: "Camiseta Arsenal Visitante 2024/25",
    slug: "camiseta-arsenal-visitante-2024-25",
    description: "Segunda equipación de alto rendimiento con los colores alternativos oficiales.",
    price: 85.00,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/arsenalvisitante2425.jpg"],
    league: "Premier League",
    team: "Arsenal",
    season: "2024/25",
    isRetro: false,
    isCustom: true,
    sizes: ["S", "M", "L"],
  },
  {
    name: "Camiseta FC Barcelona Local 2025/26",
    slug: "camiseta-fc-barcelona-local-2025-26",
    description: "Primera equipación oficial del FC Barcelona para la temporada 2024/25 con el icónico diseño de dos mitades conmemorativo.",
    price: 89.99,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/barca2526.jpg"],
    league: "LaLiga",
    team: "FC Barcelona",
    season: "2025/26",
    isRetro: false,
    isCustom: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Camiseta Real Madrid Local 2025/26",
    slug: "camiseta-real-madrid-local-2025-26",
    description: "Equipación principal de los merengues con detalles en pata de gallo sobre el blanco clásico.",
    price: 89.99,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/milan9394.jpg"],
    league: "LaLiga",
    team: "Real Madrid",
    season: "2025/26",
    isRetro: false,
    isCustom: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Camiseta FC Barcelona Retro 1998/99",
    slug: "camiseta-fc-barcelona-retro-1998-99",
    description: "Histórica camiseta del Centenario del Barça luciendo el escudo en el centro del pecho.",
    price: 75.00,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/barca199899.jpg"],
    league: "LaLiga",
    team: "FC Barcelona",
    season: "1998/99",
    isRetro: true,
    isCustom: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Camiseta Manchester City Local 2025/26",
    slug: "camiseta-manchester-city-local-2025-26",
    description: "Equipación titular en azul celeste con detalles que rinden homenaje al prefijo telefónico 0161 de Mánchester.",
    price: 85.00,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/city2526.jpg"],
    league: "Premier League",
    team: "Manchester City",
    season: "2025/26",
    isRetro: false,
    isCustom: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Camiseta Arsenal Retro Visitante 1991/93 Bruised Banana",
    slug: "camiseta-arsenal-retro-1991-93",
    description: "Mítica e icónica camiseta 'Bruised Banana' del Arsenal, una de las más aclamadas de la historia del fútbol.",
    price: 79.99,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/arsenalretro9193.jpg"],
    league: "Premier League",
    team: "Arsenal",
    season: "1991/93",
    isRetro: true,
    isCustom: true,
    sizes: ["M", "L", "XL"],
  },
  {
    name: "Camiseta Inter de Milán Local 2025/26",
    slug: "camiseta-inter-milan-local-2025-26",
    description: "Primera equipación de los nerazzurri luciendo la segunda estrella del club en el pecho.",
    price: 85.00,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/intermilan2526.jpg"],
    league: "Serie A",
    team: "Inter de Milán",
    season: "2025/26",
    isRetro: false,
    isCustom: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Camiseta AC Milan Retro Local 1993/94",
    slug: "camiseta-ac-milan-retro-1993-94",
    description: "Camiseta clásica del legendario AC Milan de los holandeses (Van Basten, Gullit, Rijkaard).",
    price: 75.00,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/milan9394.jpg"],
    league: "Serie A",
    team: "AC Milan",
    season: "1993/94",
    isRetro: true,
    isCustom: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Camiseta Brasil Retro Local 1998",
    slug: "camiseta-brasil-retro-1998",
    description: "Clásica canarinha vestida por Ronaldo Nazário en el Mundial de Francia 1998.",
    price: 79.99,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/brasil1998.avif"],
    league: "Selecciones",
    team: "Brasil",
    season: "1998",
    isRetro: true,
    isCustom: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Camiseta Francia Local 2026",
    slug: "camiseta-francia-local-2026",
    description: "Equipación oficial en azul con el gallo dorado de gran tamaño en el pecho.",
    price: 85.00,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/francia2026.jpg"],
    league: "Selecciones",
    team: "Francia",
    season: "2026",
    isRetro: false,
    isCustom: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Camiseta Alemania Retro Visitante 1990",
    slug: "camiseta-alemania-retro-1990",
    description: "Mítica camiseta verde alternativa con la que Alemania disputó el Mundial de Italia 90.",
    price: 75.00,
    images: ["https://muenqbvupsbbmxlicbia.supabase.co/storage/v1/object/public/camisetas/alemaniarvisitanteeto1990.jpg"],
    league: "Selecciones",
    team: "Alemania",
    season: "1990",
    isRetro: true,
    isCustom: true,
    sizes: ["S", "M", "L", "XL"],
  },
];

async function main() {
  console.log("Cargando productos de prueba en Supabase...");
  
  await prisma.product.deleteMany();

  for (const product of initialProducts) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("¡Productos cargados con éxito!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });