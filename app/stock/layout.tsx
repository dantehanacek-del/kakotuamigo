import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock Disponible",
  description:
    "Productos en stock listo para entrega inmediata. Stone Island, Maison Margiela, Chrome Hearts, Nike SB y más. Talles limitados.",
  openGraph: {
    title: "Stock Disponible | KAKOTUAMIGO",
    description:
      "Productos en stock listo para entrega inmediata. Stone Island, Maison Margiela, Chrome Hearts, Nike SB y más.",
    url: "https://kakotuamigo.vercel.app/stock",
    images: [{ url: "/logo.png", width: 1080, height: 1080 }],
  },
};

export default function StockLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
