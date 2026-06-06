"use client";

import { useState } from "react";
import Link from "next/link";
import {
  catalogItems,
  outfits,
  getFeatured,
  getAllBrands,
  getItemsByBrand,
  type ItemCategory,
} from "@/lib/catalog";
import { waLink } from "@/lib/data";
import CatalogCard from "@/components/CatalogCard";
import OutfitCard from "@/components/OutfitCard";

type Tab = "destacados" | "marcas" | "outfits";

const tabs: { id: Tab; label: string }[] = [
  { id: "destacados", label: "DESTACADOS" },
  { id: "marcas", label: "POR MARCA" },
  { id: "outfits", label: "OUTFITS" },
];

const categoryFilters: { label: string; value: "all" | ItemCategory }[] = [
  { label: "TODO", value: "all" },
  { label: "REMERAS", value: "remera" },
  { label: "HOODIES", value: "hoodie" },
  { label: "SHORTS", value: "short" },
  { label: "PANTALONES", value: "pantalon" },
  { label: "ZAPATILLAS", value: "zapatilla" },
  { label: "ACCESORIOS", value: "accesorio" },
];

export default function EncargosPage() {
  const [tab, setTab] = useState<Tab>("destacados");
  const [activeBrand, setActiveBrand] = useState<string>("all");
  const [activeCat, setActiveCat] = useState<"all" | ItemCategory>("all");

  const brands = getAllBrands();
  const featured = getFeatured();

  const byBrandItems =
    activeBrand === "all"
      ? catalogItems
      : getItemsByBrand(activeBrand);

  const filteredByBrand =
    activeCat === "all"
      ? byBrandItems
      : byBrandItems.filter((i) => i.category === activeCat);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="border-b border-edge pb-12 mb-12">
        <p className="text-dim text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          CATÁLOGO COMPLETO
        </p>
        <h1 className="text-primary font-bold text-5xl md:text-7xl uppercase tracking-tight leading-none mb-6">
          ENCARGAR
          <br />
          DESDE CHINA
        </h1>
        <p className="text-secondary text-sm max-w-xl leading-relaxed">
          Elegís el producto, el talle y la cantidad — yo lo encargo vía
          Kakobuy. QC (fotos de calidad) incluido antes de enviar.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border border-edge mb-12 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors border-r border-edge last:border-r-0 cursor-pointer ${
              tab === t.id
                ? "bg-primary text-base"
                : "bg-base text-secondary hover:text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: DESTACADOS ── */}
      {tab === "destacados" && (
        <div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-dim text-xs font-semibold tracking-[0.3em] uppercase mb-2">
                PICKS SELECCIONADOS
              </p>
              <h2 className="text-primary font-bold text-3xl uppercase tracking-tight">
                PRODUCTOS DESTACADOS
              </h2>
            </div>
            <span className="text-dim text-xs tracking-widest uppercase">
              {featured.length} ITEMS
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {featured.map((item) => (
              <CatalogCard key={item.id} item={item} />
            ))}
          </div>

          {/* All products below featured */}
          <div className="border-t border-edge pt-12">
            <h3 className="text-primary font-bold text-xl uppercase tracking-tight mb-8">
              TODOS LOS PRODUCTOS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {catalogItems
                .filter((i) => !i.featured)
                .map((item) => (
                  <CatalogCard key={item.id} item={item} />
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: POR MARCA ── */}
      {tab === "marcas" && (
        <div>
          {/* Brand selector */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveBrand("all")}
              className={`px-5 py-2 text-xs font-bold tracking-widest uppercase border transition-colors cursor-pointer ${
                activeBrand === "all"
                  ? "bg-primary text-base border-primary"
                  : "bg-base text-secondary border-edge hover:border-primary hover:text-primary"
              }`}
            >
              TODAS
            </button>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setActiveBrand(b)}
                className={`px-5 py-2 text-xs font-bold tracking-widest uppercase border transition-colors cursor-pointer ${
                  activeBrand === b
                    ? "bg-primary text-base border-primary"
                    : "bg-base text-secondary border-edge hover:border-primary hover:text-primary"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex gap-0 border border-edge mb-10 w-fit">
            {categoryFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveCat(f.value)}
                className={`px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-colors border-r border-edge last:border-r-0 cursor-pointer ${
                  activeCat === f.value
                    ? "bg-primary text-base"
                    : "bg-base text-secondary hover:text-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p className="text-dim text-xs font-semibold tracking-widest uppercase mb-6">
            {filteredByBrand.length} RESULTADO
            {filteredByBrand.length !== 1 ? "S" : ""}
          </p>

          {filteredByBrand.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredByBrand.map((item) => (
                <CatalogCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border border-edge">
              <p className="text-secondary text-sm tracking-widest uppercase">
                SIN PRODUCTOS EN ESTA SELECCIÓN
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── TAB: OUTFITS ── */}
      {tab === "outfits" && (
        <div>
          <div className="mb-10">
            <p className="text-dim text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              COMBINACIONES LISTAS
            </p>
            <h2 className="text-primary font-bold text-3xl uppercase tracking-tight">
              OUTFITS ARMADOS
            </h2>
          </div>
          <p className="text-secondary text-sm mb-10 max-w-lg leading-relaxed">
            Outfits completos listos para encargar. Podés pedir cada pieza por
            separado o el outfit completo de una sola vez vía WhatsApp.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-24 border-t border-edge pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-primary font-bold text-2xl uppercase tracking-tight mb-2">
            ¿NO ENCONTRÁS LO QUE BUSCÁS?
          </h3>
          <p className="text-secondary text-sm">
            Escribime directamente y lo buscamos juntos en el catálogo.
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
          <Link
            href="/encargos/pedir"
            className="bg-primary text-base font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-secondary transition-colors"
          >
            FORMULARIO
          </Link>
          <a
            href={waLink("Hola Dante! Estoy buscando un producto y no lo encuentro en el catálogo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-edge text-secondary font-bold text-xs tracking-widest uppercase px-8 py-4 hover:border-primary hover:text-primary transition-colors"
          >
            WHATSAPP
          </a>
        </div>
      </div>
    </div>
  );
}
