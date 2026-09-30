import { MARCAS_VEHICULO, SITE, whatsappLink } from "@/lib/constants";
import PageHero from "@/components/PageHero";

export const metadata = { title: "Nosotros — Autopartes Escobar" };

export default function NosotrosPage() {
  return (
    <div>
      <PageHero title="Nosotros" subtitle={SITE.descripcion} />
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
          <h2 className="font-semibold">Nuestra especialidad</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Repuestos de motor, transmisión, frenos, suspensión y sincronización, además de
            accesorios y lujos, para las marcas:
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {MARCAS_VEHICULO.map((m) => (
              <li
                key={m}
                className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-neutral-900 dark:bg-white/10 dark:text-neutral-100"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
          <h2 className="font-semibold">Cobertura</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Atendemos en nuestro punto físico en {SITE.direccion} y hacemos envíos a todo
            Colombia a través de las principales transportadoras.
          </p>
        </div>

        <div className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
          <h2 className="font-semibold">Horario de atención</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{SITE.horario}</p>
        </div>

        <div className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
          <h2 className="font-semibold">Calidad garantizada</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Trabajamos con repuestos originales y homologados de alta calidad, verificados
            antes de despacharlos.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <a
          href={whatsappLink("Hola, quiero conocer más sobre Autopartes Escobar.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600"
        >
          Escríbenos por WhatsApp
        </a>
      </div>
      </div>
    </div>
  );
}
