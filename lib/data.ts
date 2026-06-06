export const WHATSAPP_NUMBER = "5491141890565";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type Category = "ropa" | "zapatillas" | "accesorios";

export type Product = {
  id: number;
  brand: string;
  name: string;
  price: number | null;
  sizes: string[];
  images: string[];
  category: Category;
  available: boolean;
};

export const stockProducts: Product[] = [
  {
    id: 1,
    brand: "Stone Island",
    name: "Crewneck Gris",
    price: null,
    sizes: ["XL"],
    images: ["/products/stone-front.jpg", "/products/stone-back.jpg"],
    category: "ropa",
    available: true,
  },
  {
    id: 2,
    brand: "Maison Margiela",
    name: "Hoodie Números Rojo",
    price: null,
    sizes: ["L"],
    images: ["/products/mm-hoodie-front.jpg", "/products/mm-hoodie-back.jpg"],
    category: "ropa",
    available: true,
  },
  {
    id: 3,
    brand: "Maison Margiela",
    name: "Tee Negro Números",
    price: null,
    sizes: ["L"],
    images: ["/products/mm-tee-front.jpg", "/products/mm-tee-back.jpg"],
    category: "ropa",
    available: true,
  },
  {
    id: 4,
    brand: "MM6 Maison Margiela",
    name: "Tee Blanco Manos",
    price: null,
    sizes: ["L"],
    images: ["/products/mm6-tee-front.jpg"],
    category: "ropa",
    available: true,
  },
  {
    id: 5,
    brand: "Chrome Hearts",
    name: "Tee Negro Logo Cruz",
    price: null,
    sizes: ["L"],
    images: ["/products/chromeh-front.jpg", "/products/chromeh-back.jpg"],
    category: "ropa",
    available: true,
  },
  {
    id: 6,
    brand: "Supreme",
    name: "Tee Maradona",
    price: null,
    sizes: ["L"],
    images: ["/products/supreme-maradona-front.jpg"],
    category: "ropa",
    available: true,
  },
  {
    id: 7,
    brand: "Streetwear",
    name: "Zip Hoodie Emotion Never Die",
    price: null,
    sizes: ["L"],
    images: ["/products/emotion-front.jpg"],
    category: "ropa",
    available: true,
  },
  {
    id: 8,
    brand: "Nike SB",
    name: "Dunk Low Multicolor",
    price: null,
    sizes: ["US 10"],
    images: ["/products/nike-sb-front.jpg", "/products/nike-sb-2.jpg"],
    category: "zapatillas",
    available: true,
  },
  {
    id: 9,
    brand: "Goyard",
    name: "Card Holder Verde",
    price: null,
    sizes: ["Único"],
    images: ["/products/goyard-cardholder.jpg"],
    category: "accesorios",
    available: true,
  },
  {
    id: 10,
    brand: "Goyard",
    name: "iPhone Case 15 Pro",
    price: null,
    sizes: ["15 Pro"],
    images: ["/products/goyard-case.jpg"],
    category: "accesorios",
    available: true,
  },
];

export type CatalogSheet = {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
};

export const catalogSheets: CatalogSheet[] = [
  {
    id: 1,
    title: "Catálogo General Kakobuy",
    description: "+50,000 productos. Ropa, zapatillas, accesorios y más.",
    url: "https://docs.google.com/spreadsheets/d/1bWLa0m6TTmVX7LpuymbrvFhDYV068FcdMH6mGi3pvNo/edit#gid=780031361",
    tags: ["ropa", "zapatillas", "accesorios"],
  },
  {
    id: 2,
    title: "LATAM Finds",
    description: "Selección curada para el mercado latinoamericano.",
    url: "https://www.latamfinds.xyz/",
    tags: ["curado", "latam"],
  },
  {
    id: 3,
    title: "Finds Adicionales",
    description: "Más opciones y drops exclusivos.",
    url: "https://docs.google.com/spreadsheets/d/1pSuRSWrSNaNhdMITduM5yp8jG1x6u03j28e4DfvoijA/edit#gid=1701484990",
    tags: ["drops", "exclusivos"],
  },
];

export type Combo = {
  id: number;
  name: string;
  description: string;
  items: string[];
  estimatedTotal: string;
};

export const combos: Combo[] = [
  {
    id: 1,
    name: "Kit Streetwear Básico",
    description: "Arrancar con lo esencial. Remera + hoodie + accesorio.",
    items: ["1x Remera de marca", "1x Hoodie", "1x Accesorio (billetera/case)"],
    estimatedTotal: "Consultar",
  },
  {
    id: 2,
    name: "Full Fit",
    description: "De la cabeza a los pies. Outfit completo.",
    items: ["1x Remera", "1x Pantalón/Short", "1x Zapatillas"],
    estimatedTotal: "Consultar",
  },
  {
    id: 3,
    name: "Pack Accesorios",
    description: "Los detalles que hacen la diferencia.",
    items: ["1x Billetera/Card holder", "1x Case iPhone", "1x Extra a elección"],
    estimatedTotal: "Consultar",
  },
];
