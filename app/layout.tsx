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
  title: "KAKOTUAMIGO — Imports desde China",
  description:
    "Stock disponible y encargos desde China. Ropa, zapatillas y accesorios de marcas premium. Calidad garantizada vía Kakobuy.",
  keywords: ["kakobuy", "imports china", "ropa", "zapatillas", "accesorios", "argentina"],
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
