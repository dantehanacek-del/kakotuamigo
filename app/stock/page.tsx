"use client";

import { useState } from "react";
import { stockProducts, type Category } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

const filters: { label: string; value: "all" | Category }[] = [
  { label: "TODO", value: "all" },
  { label: "ROPA", value: "ropa" },
  { label: "ZAPATILLAS", value: "zapatillas" },
  { label: "ACCESORIOS", value: "accesorios" },
];

export default function StockPage() {
  const [active, setActive] = useState<"all" | Category>("all");

  const filtered =
    active === "all"
      ? stockProducts
      : stockProducts.filter((p) => p.category === active);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="border-b border-edge pb-12 mb-12">
        <p className="text-dim text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          DISPONIBLE AHORA
        </p>
        <h1 className="text-primary font-bold text-5xl md:text-7xl uppercase tracking-tight">
          STOCK
        </h1>
      </div>

      {/* Filters */}
      <div className="flex gap-0 border border-edge mb-12 w-fit">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`px-6 py-3 text-xs font-bold tracking-widest uppercase transition-colors border-r border-edge last:border-r-0 cursor-pointer ${
              active === f.value
                ? "bg-primary text-base"
                : "bg-base text-secondary hover:text-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-dim text-xs font-semibold tracking-widest uppercase mb-8">
        {filtered.length} PRODUCTO{filtered.length !== 1 ? "S" : ""}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center">
          <p className="text-secondary text-sm tracking-widest uppercase">
            SIN PRODUCTOS EN ESTA CATEGORÍA
          </p>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-24 border-t border-edge pt-16 text-center">
        <p className="text-secondary text-sm mb-6">
          ¿No encontrás lo que buscás? Podemos encargarlo desde China.
        </p>
        <a
          href="/encargos"
          className="inline-block border border-edge text-secondary font-bold text-xs tracking-widest uppercase px-8 py-4 hover:border-primary hover:text-primary transition-colors"
        >
          VER CATÁLOGO DE ENCARGOS →
        </a>
      </div>
    </div>
  );
}
