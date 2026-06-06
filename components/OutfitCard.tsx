"use client";

import Image from "next/image";
import { type Outfit, getItemById, waOrderLink, cnyToUsd } from "@/lib/catalog";

export default function OutfitCard({ outfit }: { outfit: Outfit }) {
  const validItems = outfit.items
    .map(getItemById)
    .filter((i): i is NonNullable<ReturnType<typeof getItemById>> => i !== undefined);

  const totalCny = validItems.reduce((sum, item) => sum + (item.price_cny ?? 0), 0);

  function handlePedirOutfit() {
    window.open(waOrderLink(validItems), "_blank");
  }

  return (
    <div className="border border-edge hover:border-primary transition-colors duration-300 flex flex-col">
      {/* Header */}
      <div className="bg-surface border-b border-edge px-5 py-4">
        <p className="text-dim text-[10px] font-semibold tracking-widest uppercase mb-1">
          OUTFIT
        </p>
        <p className="text-primary font-bold text-base uppercase tracking-wide">
          {outfit.name}
        </p>
        <p className="text-secondary text-[11px] mt-1">{outfit.vibe}</p>
      </div>

      {/* Product image grid */}
      <div className="grid grid-cols-3 border-b border-edge">
        {validItems.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square border-r border-edge last:border-r-0 overflow-hidden bg-surface"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="33vw"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-dim text-3xl font-bold">
                  {item.brand.charAt(0)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Item rows */}
      <div className="divide-y divide-edge flex-1">
        {validItems.map((item) => (
          <div
            key={item.id}
            className="px-5 py-3.5 flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="text-dim text-[9px] font-semibold tracking-widest uppercase">
                {item.brand}
              </p>
              <p className="text-primary text-[11px] font-semibold uppercase tracking-wide truncate">
                {item.name}
              </p>
              {item.price_cny && (
                <p className="text-secondary text-[10px] tracking-wide mt-0.5">
                  {cnyToUsd(item.price_cny)}
                </p>
              )}
            </div>
            <a
              href={`https://wa.me/5491141890565?text=${encodeURIComponent(
                `Hola Dante! Quiero encargar:\n*${item.brand} — ${item.name}*\nLink: ${item.kakobuy_url}\n\n¿Cuál es el precio y talle disponible?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold tracking-widest uppercase border border-edge text-secondary px-3 py-1.5 hover:border-primary hover:text-primary transition-colors shrink-0"
            >
              SOLO →
            </a>
          </div>
        ))}
      </div>

      {/* Total + CTA */}
      <div className="p-5 border-t border-edge">
        <div className="flex items-center justify-between mb-4">
          <span className="text-dim text-[10px] font-semibold tracking-widest uppercase">
            PRECIO TOTAL EST.
          </span>
          <span className="text-primary font-bold text-sm tracking-wide">
            {cnyToUsd(totalCny)}
          </span>
        </div>
        <button
          onClick={handlePedirOutfit}
          className="w-full bg-primary text-base text-[11px] font-bold tracking-widest uppercase py-4 hover:bg-secondary transition-colors cursor-pointer"
        >
          PEDIR OUTFIT COMPLETO →
        </button>
        <p className="text-dim text-[10px] text-center mt-3 tracking-wide">
          Se abre WhatsApp con los {validItems.length} items
        </p>
      </div>
    </div>
  );
}
