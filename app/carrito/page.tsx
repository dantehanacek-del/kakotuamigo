"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart, waCartLink, type CartItem } from "@/lib/cart";
import { cnyToUsd } from "@/lib/catalog";

function CartRow({ item }: { item: CartItem }) {
  const { removeItem, updateItem } = useCart();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="py-6 flex gap-4 items-start">
      {/* Thumbnail */}
      <div className="relative w-20 h-20 flex-shrink-0 bg-surface overflow-hidden border border-edge">
        {item.image && !imgError ? (
          <Image
            src={item.image}
            alt={`${item.brand} ${item.name}`}
            fill
            className="object-cover"
            sizes="80px"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-dim text-2xl font-bold">{item.brand.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-dim text-[9px] font-semibold tracking-widest uppercase mb-0.5">
          {item.brand}
        </p>
        <p className="text-primary font-semibold text-sm uppercase tracking-wide leading-snug">
          {item.name}
        </p>
        {item.price_cny && (
          <p className="text-secondary text-[11px] mt-1">
            {cnyToUsd(item.price_cny * item.cantidad)}
          </p>
        )}

        <div className="flex items-end gap-3 mt-3 flex-wrap">
          <div>
            <label className="block text-[9px] font-semibold tracking-widest uppercase text-dim mb-1">
              TALLE
            </label>
            <input
              type="text"
              value={item.talle}
              onChange={(e) => updateItem(item.cartId, { talle: e.target.value })}
              className="w-24 bg-surface border border-edge text-primary text-xs px-2 py-1.5 text-center"
            />
          </div>
          <div>
            <label className="block text-[9px] font-semibold tracking-widest uppercase text-dim mb-1">
              CANT.
            </label>
            <input
              type="number"
              min="1"
              max="99"
              value={item.cantidad}
              onChange={(e) =>
                updateItem(item.cartId, {
                  cantidad: Math.max(1, parseInt(e.target.value) || 1),
                })
              }
              className="w-16 bg-surface border border-edge text-primary text-xs px-2 py-1.5 text-center"
            />
          </div>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.cartId)}
        aria-label={`Eliminar ${item.brand} ${item.name}`}
        className="text-dim hover:text-primary transition-colors mt-1 shrink-0"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export default function CarritoPage() {
  const { items, clearCart, totalItems } = useCart();

  const totalCny = items.reduce(
    (s, i) => s + (i.price_cny ?? 0) * i.cantidad,
    0
  );
  const hasPrice = items.some((i) => i.price_cny);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 border border-edge flex items-center justify-center mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <h2 className="text-primary font-bold text-3xl uppercase tracking-tight mb-4">
          TU CARRITO ESTÁ VACÍO
        </h2>
        <p className="text-secondary text-sm mb-10 max-w-sm leading-relaxed">
          Explorá el stock o el catálogo y agregá los productos que querés encargar.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/stock"
            className="border border-edge text-secondary font-bold text-xs tracking-widest uppercase px-8 py-4 hover:border-primary hover:text-primary transition-colors"
          >
            VER STOCK
          </Link>
          <Link
            href="/encargos"
            className="bg-primary text-base font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-secondary transition-colors"
          >
            VER CATÁLOGO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="border-b border-edge pb-12 mb-16">
        <p className="text-dim text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          {totalItems} {totalItems === 1 ? "PRODUCTO" : "PRODUCTOS"}
        </p>
        <h1 className="text-primary font-bold text-5xl md:text-7xl uppercase tracking-tight leading-none">
          TU CARRITO
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Item list */}
        <div className="lg:col-span-2 divide-y divide-edge">
          {items.map((item) => (
            <CartRow key={item.cartId} item={item} />
          ))}
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface border border-edge p-6">
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-5">
              RESUMEN DEL PEDIDO
            </p>
            <div className="flex flex-col gap-2.5 mb-6">
              {items.map((item) => (
                <div key={item.cartId} className="flex justify-between items-start gap-2">
                  <span className="text-secondary text-[11px] leading-snug">
                    {item.brand} {item.name}
                    <span className="text-dim"> ×{item.cantidad}</span>
                  </span>
                  <span className="text-secondary text-[11px] shrink-0">
                    {item.price_cny ? cnyToUsd(item.price_cny * item.cantidad) : "—"}
                  </span>
                </div>
              ))}
            </div>

            {hasPrice && (
              <div className="border-t border-edge pt-4 flex justify-between items-center">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">
                  TOTAL EST.
                </span>
                <span className="text-primary font-bold text-base">
                  {cnyToUsd(totalCny)}
                </span>
              </div>
            )}
          </div>

          <a
            href={waCartLink(items)}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-primary text-base font-bold text-xs tracking-widest uppercase py-5 hover:bg-secondary transition-colors"
          >
            ENVIAR PEDIDO POR WHATSAPP →
          </a>
          <p className="text-dim text-[10px] text-center tracking-wide">
            Se abre WhatsApp con todos los productos del carrito
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/encargos"
              className="text-dim text-[10px] font-semibold tracking-widest uppercase hover:text-primary transition-colors"
            >
              + AGREGAR MÁS
            </Link>
            <span className="text-edge">|</span>
            <button
              onClick={clearCart}
              className="text-dim text-[10px] font-semibold tracking-widest uppercase hover:text-primary transition-colors"
            >
              VACIAR CARRITO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
