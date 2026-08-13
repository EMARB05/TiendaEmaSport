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