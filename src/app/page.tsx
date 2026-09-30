import Link from "next/link";
import { CATEGORIAS, SITE, whatsappLink } from "@/lib/constants";
import BrandBanner from "@/components/BrandBanner";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-premium-dark relative overflow-hidden text-white">
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
            Repuestos originales y homologados
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
            {SITE.nombre}
          </h1>
          <p className="mt-4 max-w-xl text-neutral-300">{SITE.descripcion}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/catalogo"
              className="rounded-md border border-white/10 bg-black px-5 py-3 text-sm font-semibold hover:bg-neutral-800"
            >
              Ver catálogo
            </Link>
            <a
              href={whatsappLink("Hola, quiero más información sobre sus repuestos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Marcas: banner fotográfico por marca */}
      <BrandBanner
        marca="Volkswagen"
        imagen="/images/marcas/volkswagen-v4.jpg"
        eyebrow="Especialistas en la línea alemana"
        descripcion="Repuestos originales y homologados para toda la gama Volkswagen: motor, transmisión, frenos, suspensión y sincronización. Alta calidad garantizada y envíos a todo Colombia."
        align="left"
      />
      <BrandBanner
        marca="Audi"
        imagen="/images/marcas/audi-v2.jpg"
        eyebrow="Piezas originales y homologadas"
        descripcion="Encuentra el repuesto exacto para tu Audi: motor, transmisión, frenos, suspensión, sincronización, accesorios y lujos. Calidad alemana, precio justo."
        align="right"
      />
      <BrandBanner
        marca="BMW"
        imagen="/images/marcas/bmw.jpg"
        eyebrow="Piezas originales para todos los modelos"
        descripcion="Descubre nuestra selección de repuestos BMW originales y homologados, con la calidad que tu vehículo necesita para un rendimiento óptimo y una mayor durabilidad."
        align="left"
      />
      <BrandBanner
        marca="Mercedes-Benz"
        imagen="/images/marcas/mercedes.jpg"
        eyebrow="Calidad y precisión alemana"
        descripcion="Repuestos originales y homologados para Mercedes-Benz: motor, transmisión, frenos, suspensión y sincronización. Atención personalizada y envío a todo el país."
        align="right"
      />

      {/* Categorías */}
      <section className="bg-neutral-50 py-14 dark:bg-neutral-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold">Líneas de repuestos</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {CATEGORIAS.map((cat) => (
              <Link
                key={cat}
                href={`/catalogo?categoria=${encodeURIComponent(cat)}`}
                className="flex h-24 items-center justify-center rounded-lg border border-neutral-200 bg-white p-3 text-center text-sm font-semibold text-neutral-800 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación / contacto rápido */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 rounded-xl border border-neutral-200 p-8 sm:grid-cols-2 dark:border-neutral-800">
          <div>
            <h2 className="text-xl font-bold">Visítanos</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">{SITE.direccion}</p>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400">{SITE.horario}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Envíos a todo Colombia</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Consulta disponibilidad y precio de tu repuesto por WhatsApp y te
              cotizamos el envío a tu ciudad.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
