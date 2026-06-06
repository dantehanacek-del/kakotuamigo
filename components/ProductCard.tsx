"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type Product, waLink } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const hasBack = product.images.length > 1;
  const currentImg = hovered && hasBack ? product.images[1] : product.images[0];

  const waMessage = `Hola Dante! Vi el "${product.brand} — ${product.name}" en kakotuamigo.store y me interesa. ¿Qué talles tenés disponibles?`;

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

        {/* Available badge */}
        {product.available && (
          <div className="absolute top-3 left-3">
            <span className="bg-accent text-primary text-[10px] font-bold tracking-widest uppercase px-2 py-1">
              DISPONIBLE
            </span>
          </div>
        )}

        {/* Hover image indicator */}
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

        {/* Sizes */}
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

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-secondary text-xs font-semibold tracking-widest uppercase">
            {product.price !== null
              ? `$${product.price.toLocaleString("es-AR")}`
              : "CONSULTAR"}
          </span>

          <a
            href={waLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold tracking-widest uppercase bg-primary text-base px-3 py-2 hover:bg-secondary transition-colors"
          >
            QUIERO ESTE
          </a>
        </div>
      </div>
    </div>
  );
}
