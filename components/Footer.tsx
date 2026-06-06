import Link from "next/link";
import { waLink } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-edge mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="text-primary font-bold tracking-[0.15em] text-lg uppercase mb-4">
              KAKOTUAMIGO
            </p>
            <p className="text-secondary text-sm leading-relaxed">
              Imports desde China vía Kakobuy. Stock en mano y encargos
              personalizados. Argentina.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-dim text-xs font-semibold tracking-widest uppercase mb-5">
              NAVEGACIÓN
            </p>
            <div className="flex flex-col gap-3">
              {[
                { href: "/stock", label: "Stock disponible" },
                { href: "/encargos", label: "Hacer un encargo" },
                { href: "/encargos/pedir", label: "Formulario de pedido" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-secondary text-sm hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-dim text-xs font-semibold tracking-widest uppercase mb-5">
              CONTACTO
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={waLink("Hola Dante! Te escribo desde kakotuamigo.store")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary text-sm hover:text-primary transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="https://tiktok.com/@kakotuamigo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary text-sm hover:text-primary transition-colors"
              >
                TikTok @kakotuamigo
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-edge mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-dim text-xs tracking-widest uppercase">
            © 2025 KAKOTUAMIGO. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <p className="text-dim text-xs">
            Imports vía{" "}
            <a
              href="https://kakobuy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors"
            >
              Kakobuy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
