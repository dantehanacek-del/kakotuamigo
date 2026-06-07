"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { waLink } from "./data";
import { cnyToUsd } from "./catalog";

export type CartItem = {
  cartId: string;
  productId: string;
  brand: string;
  name: string;
  price_cny?: number;
  kakobuy_url?: string;
  image?: string;
  talle: string;
  cantidad: number;
  type: "stock" | "catalog";
};

type AddItemInput = Omit<CartItem, "cartId" | "cantidad"> & { cantidad?: number };

type CartContextType = {
  items: CartItem[];
  addItem: (item: AddItemInput) => void;
  removeItem: (cartId: string) => void;
  updateItem: (cartId: string, changes: Partial<Pick<CartItem, "talle" | "cantidad">>) => void;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("kkt-cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("kkt-cart", JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(item: AddItemInput) {
    const cartId = `${item.type}-${item.productId}-${Date.now()}`;
    setItems((prev) => [...prev, { ...item, cartId, cantidad: item.cantidad ?? 1 }]);
  }

  function removeItem(cartId: string) {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  }

  function updateItem(cartId: string, changes: Partial<Pick<CartItem, "talle" | "cantidad">>) {
    setItems((prev) => prev.map((i) => (i.cartId === cartId ? { ...i, ...changes } : i)));
  }

  function clearCart() {
    setItems([]);
    localStorage.removeItem("kkt-cart");
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        totalItems: items.reduce((s, i) => s + i.cantidad, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function buildCartMessage(items: CartItem[]): string {
  const lines = items.map(
    (item, i) =>
      [
        `${i + 1}. *${item.brand} — ${item.name}*`,
        item.kakobuy_url ? `   Link: ${item.kakobuy_url}` : null,
        `   Talle: ${item.talle} | Cantidad: ${item.cantidad}`,
        item.price_cny
          ? `   Precio est.: ${cnyToUsd(item.price_cny * item.cantidad)}`
          : null,
      ]
        .filter(Boolean)
        .join("\n")
  );

  return [
    `🛍️ *PEDIDO — KAKOTUAMIGO*`,
    ``,
    ...lines,
    ``,
    `¿Podés confirmar precios y disponibilidad?`,
  ].join("\n");
}

export function waCartLink(items: CartItem[]): string {
  return waLink(buildCartMessage(items));
}
