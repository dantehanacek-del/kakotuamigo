"use client";

import Image from "next/image";
import { type CatalogItem, cnyToUsd } from "@/lib/catalog";

const categoryLabel: Record<string, string> = {
  remera: "REMERA",
  hoodie: "HOODIE",
  sweatshirt: "SWEATSHIRT",
  pantalon: "PANTALÓN",
  short: "SHORT",
  zapatilla: "ZAPATILLA",
  accesorio: "ACCESORIO",
  conjunto: "CONJUNTO",
};

export default function CatalogCard({ item }: { item: CatalogItem }) {
  function handlePedir() {
    const msg = `Hola Dante! Quiero encargar:\n\n*${item.name}*\nLink: ${item.kakobuy_url}\n${item.variants ? `Variantes disponibles: ${item.variants}` : ""}\n\n¿Cuál es el precio final y el talle?`;
    window.open(
      `https://wa.me/5491141890565?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  return (
    <div className="group flex flex-col bg-base border border-edge hover:border-primary transition-colors duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-surface">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-dim text-5xl font-bold">
              {item.brand.charAt(0)}
            </span>
          </div>
        )}

        {item.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-accent text-primary text-[10px] font-bold tracking-widest uppercase px-2 py-1">
              DESTACADO
            </span>
          </div>
        )}

        {item.variants && (
          <div className="absolute bottom-0 left-0 right-0 bg-base/80 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-secondary text-[10px] tracking-wide truncate">
              {item.variants}
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-dim text-[10px] font-semibold tracking-widest uppercase mb-1">
            {item.brand}
          </p>
          <p className="text-primary font-semibold text-sm uppercase tracking-wide leading-snug">
            {item.name}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-semibold tracking-wider border border-edge text-dim px-2 py-0.5 uppercase">
            {categoryLabel[item.category]}
          </span>
          {item.price_cny && (
            <span className="text-secondary text-[10px] font-semibold tracking-wide uppercase">
              {cnyToUsd(item.price_cny)}
            </span>
          )}
        </div>

        <button
          onClick={handlePedir}
          className="w-full text-[10px] font-bold tracking-widest uppercase bg-primary text-base py-2.5 hover:bg-secondary transition-colors cursor-pointer mt-auto"
        >
          PEDIR ESTE →
        </button>
      </div>
    </div>
  );
}
