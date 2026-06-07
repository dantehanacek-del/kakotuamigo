"use client";

import Image from "next/image";
import { useState } from "react";
import { type CatalogItem, cnyToUsd } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

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
  const { addItem } = useCart();
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);
  const [talle, setTalle] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (!talle.trim()) return;
    addItem({
      productId: item.id,
      brand: item.brand,
      name: item.name,
      price_cny: item.price_cny,
      kakobuy_url: item.kakobuy_url,
      image: item.image,
      talle: talle.trim(),
      cantidad,
      type: "catalog",
    });
    setAdding(false);
    setTalle("");
    setCantidad(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="group flex flex-col bg-base border border-edge hover:border-primary transition-colors duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-surface">
        {item.image && !imgError ? (
          <Image
            src={item.image}
            alt={`${item.brand} ${item.name}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
            onError={() => setImgError(true)}
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
          onClick={() => setAdding(!adding)}
          aria-label={`Agregar ${item.brand} ${item.name} al carrito`}
          className={`w-full text-[10px] font-bold tracking-widest uppercase py-2.5 transition-colors cursor-pointer mt-auto ${
            added
              ? "bg-primary text-base"
              : adding
              ? "border border-primary text-primary"
              : "bg-primary text-base hover:bg-secondary"
          }`}
        >
          {added ? "✓ AGREGADO" : adding ? "CANCELAR" : "AGREGAR AL CARRITO"}
        </button>
      </div>

      {/* Add to cart panel */}
      {adding && (
        <div className="border-t border-edge p-4 bg-surface flex flex-col gap-3">
          {item.variants && (
            <p className="text-dim text-[9px] tracking-wide">{item.variants}</p>
          )}
          <div>
            <p className="text-dim text-[9px] font-semibold tracking-widest uppercase mb-2">
              TALLE / NÚMERO
            </p>
            <input
              type="text"
              value={talle}
              onChange={(e) => setTalle(e.target.value)}
              placeholder="M / 42 / Único"
              autoFocus
              className="w-full bg-base border border-edge text-primary text-xs px-3 py-2 placeholder:text-dim"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="99"
              value={cantidad}
              onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
              aria-label="Cantidad"
              className="w-16 bg-base border border-edge text-primary text-sm px-2 py-2 text-center"
            />
            <button
              onClick={handleAdd}
              disabled={!talle.trim()}
              className="flex-1 bg-primary text-base text-[10px] font-bold tracking-widest uppercase py-2 hover:bg-secondary transition-colors disabled:opacity-40"
            >
              AGREGAR →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
