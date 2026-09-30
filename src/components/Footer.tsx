import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-premium-dark mt-16 border-t border-black/40 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">{SITE.nombre}</h3>
          <p className="mt-3 text-sm text-neutral-300">{SITE.direccion}</p>
          <p className="mt-1 text-sm text-neutral-300">{SITE.horario}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Contacto
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-neutral-300">
            <li>Tel/WhatsApp: {SITE.telefono}</li>
            <li>Email: {SITE.email}</li>
          </ul>

          {(SITE.instagram || SITE.facebook || SITE.tiktok) && (
            <div className="mt-4 flex gap-3">
              {SITE.instagram && (
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-neutral-300 hover:border-white hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              )}
              {SITE.facebook && (
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-neutral-300 hover:border-white hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.9.25-1.5 1.6-1.5H16.6V4.3C16.3 4.26 15.3 4.17 14.15 4.17c-2.4 0-4.05 1.47-4.05 4.16V10.5H7.6v3H10.1V21h3.4Z" />
                  </svg>
                </a>
              )}
              {SITE.tiktok && (
                <a
                  href={SITE.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-neutral-300 hover:border-white hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 3c.4 2.2 1.8 3.7 4 3.9v3.1c-1.4 0-2.7-.4-3.9-1.2v6.4c0 3.2-2.6 5.8-5.8 5.8S5 18.4 5 15.2s2.6-5.8 5.8-5.8c.3 0 .6 0 .9.1v3.2c-.3-.1-.6-.2-.9-.2-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.8-1.1 2.8-2.6V3h3Z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Navegación
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-neutral-300">
            <li><Link className="hover:text-white hover:underline" href="/tienda">Tienda</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/catalogo">Catálogo</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/pqrs">PQRS</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/admin/login">Panel administrativo</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} {SITE.nombre}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
