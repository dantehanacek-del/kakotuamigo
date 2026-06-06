import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hacer un Pedido",
  description:
    "Completá el formulario con el producto que querés y te confirmo precio y disponibilidad por WhatsApp.",
  openGraph: {
    title: "Hacer un Pedido | KAKOTUAMIGO",
    description:
      "Completá el formulario con el producto que querés y te confirmo precio y disponibilidad por WhatsApp.",
    url: "https://kakotuamigo.vercel.app/encargos/pedir",
  },
};

export default function PedirLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
