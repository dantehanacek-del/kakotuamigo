import Link from "next/link";
import { stockProducts, waLink } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featuredProducts = stockProducts.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="min-h-[90vh] flex flex-col justify-center border-b border-edge px-6 py-24 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl">
            <p className="text-dim text-xs font-semibold tracking-[0.3em] uppercase mb-8">
              BUENOS AIRES, ARGENTINA
            </p>
            <h1 className="text-[clamp(4rem,12vw,10rem)] font-bold leading-[0.9] tracking-[-0.02em] uppercase text-primary mb-8">
              KAKO
              <br />
              <span className="inline-flex items-center gap-4">
                TU
                {/* Argentina + China flag circle */}
                <svg
                  viewBox="0 0 100 100"
                  className="inline-block"
                  style={{ width: "0.55em", height: "0.55em", flexShrink: 0 }}
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id="arg-clip">
                      <path d="M50,2 A48,48 0 0,0 50,98 Z" />
                    </clipPath>
                    <clipPath id="chn-clip">
                      <path d="M50,2 A48,48 0 0,1 50,98 Z" />
                    </clipPath>
                    <clipPath id="circle-clip">
                      <circle cx="50" cy="50" r="48" />
                    </clipPath>
                  </defs>
                  {/* Argentina left half — blue/white/blue */}
                  <rect x="2" y="2" width="48" height="96" fill="#74ACDF" clipPath="url(#circle-clip)" />
                  <rect x="2" y="34" width="48" height="32" fill="white" clipPath="url(#circle-clip)" />
                  {/* China right half — red + star */}
                  <rect x="50" y="2" width="48" height="96" fill="#DE2910" clipPath="url(#circle-clip)" />
                  <text x="72" y="58" textAnchor="middle" fontSize="28" fill="#FFDE00">★</text>
                  {/* Border */}
                  <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="2" />
                  {/* Center divider */}
                  <line x1="50" y1="2" x2="50" y2="98" stroke="white" strokeWidth="1.5" />
                </svg>
              </span>
              <br />
              AMIGO
            </h1>
            <div className="w-full h-px bg-edge mb-8" />
            <p className="text-secondary text-base md:text-lg max-w-lg leading-relaxed mb-12">
              Stock en mano + encargos desde China. Ropa, zapatillas y accesorios
              de marcas premium. Calidad garantizada vía Kakobuy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/stock"
                className="bg-primary text-base font-bold text-sm tracking-widest uppercase px-8 py-4 hover:bg-secondary transition-colors"
              >
                VER STOCK
              </Link>
              <Link
                href="/encargos"
                className="border border-primary text-primary font-bold text-sm tracking-widest uppercase px-8 py-4 hover:bg-primary hover:text-base transition-colors"
              >
                HACER UN ENCARGO
              </Link>
            </div>
          </div>
      </section>

      {/* STATS BAR */}
      <section className="border-b border-edge">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 divide-x divide-edge">
            {[
              { value: "10+", label: "ITEMS EN STOCK" },
              { value: "50K+", label: "PRODUCTOS EN CATÁLOGO" },
              { value: "100%", label: "CALIDAD VERIFICADA" },
            ].map((s) => (
              <div key={s.label} className="py-10 px-6 text-center">
                <p className="text-primary font-bold text-3xl md:text-4xl mb-2">
                  {s.value}
                </p>
                <p className="text-dim text-[10px] font-semibold tracking-widest uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STOCK PREVIEW */}
      <section className="py-24 border-b border-edge">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-dim text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                DISPONIBLE AHORA
              </p>
              <h2 className="text-primary font-bold text-4xl md:text-5xl uppercase tracking-tight">
                STOCK EN MANO
              </h2>
            </div>
            <Link
              href="/stock"
              className="hidden md:block text-xs font-bold tracking-widest uppercase text-secondary hover:text-primary transition-colors border-b border-dim hover:border-primary pb-1"
            >
              VER TODO →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              href="/stock"
              className="block text-center border border-edge text-secondary font-bold text-xs tracking-widest uppercase py-4 hover:border-primary hover:text-primary transition-colors"
            >
              VER TODO EL STOCK →
            </Link>
          </div>
        </div>
      </section>

      {/* ENCARGOS BANNER */}
      <section className="py-24 border-b border-edge">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-surface border border-edge p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="max-w-xl">
              <p className="text-dim text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                +50,000 PRODUCTOS
              </p>
              <h2 className="text-primary font-bold text-4xl md:text-5xl uppercase tracking-tight mb-6 leading-none">
                ENCARGAR
                <br />
                DESDE CHINA
              </h2>
              <p className="text-secondary text-sm leading-relaxed">
                Encontrá lo que buscás en nuestros catálogos. Elegís el
                producto, el talle y la cantidad — nosotros lo traemos.
                Fotos de calidad (QC) antes de enviar.
              </p>
            </div>
            <div className="flex flex-col gap-4 shrink-0">
              <Link
                href="/encargos"
                className="bg-primary text-base font-bold text-sm tracking-widest uppercase px-10 py-4 text-center hover:bg-secondary transition-colors"
              >
                VER CATÁLOGO
              </Link>
              <Link
                href="/encargos/pedir"
                className="border border-edge text-secondary font-bold text-sm tracking-widest uppercase px-10 py-4 text-center hover:border-primary hover:text-primary transition-colors"
              >
                HACER UN PEDIDO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 border-b border-edge">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-dim text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              CÓMO FUNCIONA
            </p>
            <h2 className="text-primary font-bold text-4xl md:text-5xl uppercase tracking-tight">
              EL PROCESO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-edge">
            {[
              {
                step: "01",
                title: "ELEGÍS",
                desc: "Navegás el catálogo o el stock disponible. Encontrás lo que querés.",
              },
              {
                step: "02",
                title: "PEDÍS",
                desc: "Completás el formulario o me escribís por WhatsApp con el producto y talle.",
              },
              {
                step: "03",
                title: "RECIBÍS",
                desc: "Lo encargo vía Kakobuy, te mando el QC para aprobación y te lo entrego.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-base p-10">
                <p className="text-dim font-bold text-5xl mb-6">{item.step}</p>
                <p className="text-primary font-bold text-xl uppercase tracking-wide mb-4">
                  {item.title}
                </p>
                <p className="text-secondary text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIKTOK CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-dim text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            COMUNIDAD
          </p>
          <h2 className="text-primary font-bold text-4xl md:text-6xl uppercase tracking-tight mb-6">
            SEGUINOS EN TIKTOK
          </h2>
          <p className="text-secondary text-sm mb-10 max-w-md mx-auto leading-relaxed">
            Reviews de productos, unboxings, QC comparisons y tips para hacer
            tus primeros pedidos desde China.
          </p>
          <a
            href="https://tiktok.com/@kakotuamigo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-base font-bold text-sm tracking-widest uppercase px-10 py-4 hover:bg-secondary transition-colors"
          >
            @KAKOTUAMIGO →
          </a>
        </div>
      </section>
    </>
  );
}
