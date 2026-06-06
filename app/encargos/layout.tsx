import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Encargos desde China",
  description:
    "Más de 100 productos para encargar vía Kakobuy. Nike, Jordan, Balenciaga, Louis Vuitton, Gucci y mucho más. QC incluido antes del envío.",
  openGraph: {
    title: "Encargos desde China | KAKOTUAMIGO",
    description:
      "Más de 100 productos para encargar vía Kakobuy. Nike, Jordan, Balenciaga, Louis Vuitton y mucho más. QC incluido.",
    url: "https://kakotuamigo.vercel.app/encargos",
    images: [{ url: "/logo.png", width: 1080, height: 1080 }],
  },
};

export default function EncargosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
