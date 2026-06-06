import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kakotuamigo.vercel.app"),
  title: {
    default: "KAKOTUAMIGO — Imports desde China",
    template: "%s | KAKOTUAMIGO",
  },
  description:
    "Stock en mano y encargos desde China vía Kakobuy. Ropa, zapatillas y accesorios de marcas premium con QC incluido. Envíos a todo Argentina.",
  keywords: ["kakobuy", "imports china", "ropa", "zapatillas", "accesorios", "argentina", "streetwear", "replicas"],
  openGraph: {
    title: "KAKOTUAMIGO — Imports desde China",
    description:
      "Stock en mano y encargos desde China vía Kakobuy. Ropa, zapatillas y accesorios de marcas premium con QC incluido.",
    url: "https://kakotuamigo.vercel.app",
    siteName: "KAKOTUAMIGO",
    images: [
      {
        url: "/logo.png",
        width: 1080,
        height: 1080,
        alt: "KAKOTUAMIGO — Imports desde China",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KAKOTUAMIGO — Imports desde China",
    description:
      "Stock en mano y encargos desde China vía Kakobuy. Ropa, zapatillas y accesorios de marcas premium con QC incluido.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={spaceGrotesk.variable}>
      <body className="min-h-screen bg-base text-primary flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
