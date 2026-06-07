"use client";

import Image from "next/image";
import { useState } from "react";
import { type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [adding, setAdding] = useState(false);
  const [selectedTalle, setSelectedTalle] = useState(product.sizes[0] ?? "");
  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);

  const hasBack = product.images.length > 1;
  const currentImg = hovered && hasBack ? product.images[1] : product.images[0];

  function handleAdd() {
    addItem({
      productId: String(product.id),
      brand: product.brand,
      name: product.name,
      talle: selectedTalle,
      cantidad,
      type: "stock",
      image: product.images[0],
    });
    setAdding(false);
    setCantidad(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="group flex flex-col bg-base border border-edge hover:border-primary transition-colors duration-300">
      {/* Image */}
      <div
        className="relative aspect-square overflow-hidden bg-surface cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={currentImg}
          alt={`${product.brand} ${product.name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {product.available && (
          <div className="absolute top-3 left-3">
            <span className="bg-accent text-primary text-[10px] font-bold tracking-widest uppercase px-2 py-1">
              DISPONIBLE
            </span>
          </div>
        )}

        {hasBack && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-secondary tracking-widest uppercase bg-base/80 px-2 py-1">
              {hovered ? "FRENTE →" : "DORSO →"}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-dim text-[10px] font-semibold tracking-widest uppercase mb-1">
            {product.brand}
          </p>
          <p className="text-primary font-semibold text-sm uppercase tracking-wide leading-snug">
            {product.name}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {product.sizes.map((s) => (
            <span
              key={s}
              className="text-[10px] font-semibold tracking-wider border border-edge text-secondary px-2 py-0.5 uppercase"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-secondary text-xs font-semibold tracking-widest uppercase">
            {product.price !== null
              ? `$${product.price.toLocaleString("es-AR")}`
              : "CONSULTAR"}
          </span>

          <button
            onClick={() => setAdding(!adding)}
            aria-label={`Agregar ${product.brand} ${product.name} al carrito`}
            className={`text-[10px] font-bold tracking-widest uppercase px-3 py-2 transition-colors ${
              added
                ? "bg-primary text-base"
                : "border border-edge text-secondary hover:border-primary hover:text-primary"
            }`}
          >
            {added ? "✓ AGREGADO" : adding ? "CANCELAR" : "AGREGAR AL CARRITO"}
          </button>
        </div>
      </div>

      {/* Add to cart panel */}
      {adding && (
        <div className="border-t border-edge p-4 bg-surface flex flex-col gap-3">
          {product.sizes.length > 1 && (
            <div>
              <p className="text-dim text-[9px] font-semibold tracking-widest uppercase mb-2">
                TALLE
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedTalle(s)}
                    className={`text-[10px] font-bold tracking-widest uppercase border px-3 py-1.5 transition-colors ${
                      selectedTalle === s
                        ? "border-primary text-primary"
                        : "border-edge text-secondary hover:border-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
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
              className="flex-1 bg-primary text-base text-[10px] font-bold tracking-widest uppercase py-2 hover:bg-secondary transition-colors"
            >
              AGREGAR →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
