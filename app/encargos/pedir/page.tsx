"use client";

import { useState } from "react";
import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/data";

type FormData = {
  nombre: string;
  whatsapp: string;
  producto: string;
  link: string;
  talle: string;
  cantidad: string;
  notas: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const empty: FormData = {
  nombre: "",
  whatsapp: "",
  producto: "",
  link: "",
  talle: "",
  cantidad: "1",
  notas: "",
};

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (form.nombre.trim().length < 2)
    errors.nombre = "Ingresá tu nombre completo.";
  if (!/^\+?[\d\s\-()]{8,}$/.test(form.whatsapp.trim()))
    errors.whatsapp = "Número de WhatsApp inválido.";
  if (form.producto.trim().length < 3)
    errors.producto = "Describí el producto (mínimo 3 caracteres).";
  if (!form.talle.trim())
    errors.talle = "Indicá el talle o número.";
  const qty = parseInt(form.cantidad, 10);
  if (isNaN(qty) || qty < 1 || qty > 99)
    errors.cantidad = "Cantidad inválida (1-99).";
  return errors;
}

export default function PedirPage() {
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  function set(k: keyof FormData, v: string) {
    setForm((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  }

  function buildMessage(): string {
    return [
      `🛍️ *NUEVO ENCARGO — KAKOTUAMIGO*`,
      ``,
      `👤 *Nombre:* ${form.nombre.trim()}`,
      `📱 *WhatsApp:* ${form.whatsapp.trim()}`,
      ``,
      `📦 *Producto:* ${form.producto.trim()}`,
      form.link.trim() ? `🔗 *Link:* ${form.link.trim()}` : null,
      `📐 *Talle/Número:* ${form.talle.trim()}`,
      `🔢 *Cantidad:* ${form.cantidad}`,
      form.notas.trim() ? `📝 *Notas:* ${form.notas.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank");
    setSent(true);
  }

  const inputClass =
    "w-full bg-surface border border-edge text-primary text-sm px-4 py-3 placeholder:text-dim focus:border-primary transition-colors font-sans";

  const labelClass =
    "block text-[10px] font-semibold tracking-widest uppercase text-dim mb-2";

  if (sent) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 border border-edge flex items-center justify-center mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-primary font-bold text-3xl uppercase tracking-tight mb-4">
          PEDIDO ENVIADO
        </h2>
        <p className="text-secondary text-sm mb-10 max-w-sm leading-relaxed">
          Se abrió WhatsApp con el detalle de tu pedido. Dante te va a responder
          a la brevedad con el precio y disponibilidad.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => { setForm(empty); setSent(false); }}
            className="border border-edge text-secondary font-bold text-xs tracking-widest uppercase px-8 py-4 hover:border-primary hover:text-primary transition-colors"
          >
            HACER OTRO PEDIDO
          </button>
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
          ENCARGOS DESDE CHINA
        </p>
        <h1 className="text-primary font-bold text-5xl md:text-7xl uppercase tracking-tight leading-none">
          HACER UN
          <br />
          PEDIDO
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-8">
          {/* Personal */}
          <div>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-6 pb-4 border-b border-edge">
              TUS DATOS
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nombre completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Juan García"
                  value={form.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                  className={inputClass}
                  aria-describedby={errors.nombre ? "err-nombre" : undefined}
                />
                {errors.nombre && (
                  <p id="err-nombre" className="text-accent text-[10px] mt-1">{errors.nombre}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Tu WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+54 9 11 1234 5678"
                  value={form.whatsapp}
                  onChange={(e) => set("whatsapp", e.target.value)}
                  className={inputClass}
                  aria-describedby={errors.whatsapp ? "err-whatsapp" : undefined}
                />
                {errors.whatsapp && (
                  <p id="err-whatsapp" className="text-accent text-[10px] mt-1">{errors.whatsapp}</p>
                )}
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-6 pb-4 border-b border-edge">
              EL PRODUCTO
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <label className={labelClass}>Descripción del producto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Nike SB Dunk Low Supreme, remera Stone Island gris..."
                  value={form.producto}
                  onChange={(e) => set("producto", e.target.value)}
                  className={inputClass}
                  aria-describedby={errors.producto ? "err-producto" : undefined}
                />
                {errors.producto && (
                  <p id="err-producto" className="text-accent text-[10px] mt-1">{errors.producto}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Link del producto (si tenés)</label>
                <input
                  type="url"
                  placeholder="https://kakobuy.com/..."
                  value={form.link}
                  onChange={(e) => set("link", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Talle / Número *</label>
                  <input
                    type="text"
                    required
                    placeholder="M / 42 / Único"
                    value={form.talle}
                    onChange={(e) => set("talle", e.target.value)}
                    className={inputClass}
                    aria-describedby={errors.talle ? "err-talle" : undefined}
                  />
                  {errors.talle && (
                    <p id="err-talle" className="text-accent text-[10px] mt-1">{errors.talle}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Cantidad *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="99"
                    value={form.cantidad}
                    onChange={(e) => set("cantidad", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Notas adicionales</label>
                <textarea
                  rows={3}
                  placeholder="Color preferido, variante, o cualquier detalle extra..."
                  value={form.notas}
                  onChange={(e) => set("notas", e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-base font-bold text-sm tracking-widest uppercase py-5 hover:bg-secondary transition-colors cursor-pointer"
          >
            ENVIAR POR WHATSAPP →
          </button>
          <p className="text-dim text-xs text-center tracking-wide">
            Al enviar se va a abrir WhatsApp con el detalle de tu pedido
          </p>
        </form>

        {/* SIDEBAR */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface border border-edge p-6">
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-5">
              ANTES DE PEDIR
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "Buscá el producto en los catálogos y copiá el link si podés.",
                "Los precios varían según el producto — te confirmo el costo por WA.",
                "El plazo de entrega es de 15-30 días según el método de envío.",
                "Te mando las fotos de calidad (QC) para que apruebes antes de enviar.",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-dim font-bold text-xs mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-secondary text-xs leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface border border-edge p-6">
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-4">
              CATÁLOGOS
            </p>
            <p className="text-secondary text-xs leading-relaxed mb-5">
              Buscá el producto antes de pedir:
            </p>
            <Link
              href="/encargos"
              className="block text-center border border-edge text-secondary font-bold text-xs tracking-widest uppercase py-3 hover:border-primary hover:text-primary transition-colors"
            >
              VER CATÁLOGOS →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
