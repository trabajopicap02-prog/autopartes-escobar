"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SITE, whatsappLink } from "@/lib/constants";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/pqrs", label: "PQRS" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 shadow-lg shadow-black/20">
      {/* Fila superior: logo grande + contacto rápido, sobre fondo oscuro con brillo rojo */}
      <div className="bg-premium-dark border-b border-black/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <Link href="/" className="relative flex shrink-0 items-center py-1">
            <Image
              src="/logo.png"
              alt={SITE.nombre}
              width={297}
              height={240}
              priority
              className="h-28 w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:h-36"
            />
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href={`tel:${SITE.telefono}`}
              className="flex items-center gap-2 text-sm font-semibold text-neutral-200"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" className="text-neutral-300">
                <path d="M4.4 2.5c.6-.3 1.3-.1 1.7.4l1.4 1.9c.4.5.4 1.2 0 1.7L6.6 7.9c.5 1.3 1.3 2.5 2.3 3.5s2.2 1.8 3.5 2.3l1.4-.9c.5-.4 1.2-.4 1.7 0l1.9 1.4c.5.4.7 1.1.4 1.7l-.7 1.5c-.3.6-.9 1-1.6 1-6 0-11-5-11-11 0-.7.4-1.3 1-1.6l1.5-.3Z" />
              </svg>
              {SITE.telefono}
            </a>
            <a
              href={whatsappLink("Hola, quiero más información sobre sus repuestos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
            >
              Escríbenos por WhatsApp
            </a>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            <span className="sr-only">Menú</span>
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Fila inferior: navegación (fondo negro, solo escritorio) */}
      <nav className="hidden bg-black md:block">
        <div className="mx-auto flex max-w-6xl justify-center px-4 sm:px-6">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
                pathname === link.href
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-300 hover:bg-neutral-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div className="bg-neutral-950 border-t border-black/40 md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-black text-white"
                    : "text-neutral-200 hover:bg-neutral-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 border-t border-white/10 px-4 py-3">
            <a href={`tel:${SITE.telefono}`} className="text-sm font-semibold text-neutral-200">
              📞 {SITE.telefono}
            </a>
            <a
              href={whatsappLink("Hola, quiero más información sobre sus repuestos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-green-500 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-green-600"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
