import Image from "next/image";
import { whatsappLinkProducto } from "@/lib/constants";
import type { Producto } from "@/lib/types";

const formatoCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function ProductCard({ producto }: { producto: Producto }) {
  const imagen = producto.imagenes?.[0];
  const rangoAnios =
    producto.anio_desde && producto.anio_hasta
      ? `${producto.anio_desde} - ${producto.anio_hasta}`
      : producto.anio_desde
      ? `Desde ${producto.anio_desde}`
      : null;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      <div className="relative aspect-square w-full bg-neutral-100 dark:bg-neutral-800">
        {imagen ? (
          <Image src={imagen} alt={producto.nombre} fill className="object-cover" unoptimized />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-400 text-sm">
            Sin imagen
          </div>
        )}
        {producto.cantidad <= 0 && (
          <span className="absolute left-2 top-2 rounded bg-neutral-800 px-2 py-0.5 text-xs font-semibold text-white">
            Agotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">
          {producto.marca_vehiculo}
          {producto.modelo ? ` · ${producto.modelo}` : ""}
        </span>
        <h3 className="font-semibold text-neutral-900 dark:text-white">{producto.nombre}</h3>
        <p className="text-xs text-neutral-500">Ref. {producto.referencia}</p>
        {rangoAnios && <p className="text-xs text-neutral-500">Años: {rangoAnios}</p>}
        <p className="text-xs text-neutral-500">{producto.categoria} · {producto.estado}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-neutral-900 dark:text-white">
            {formatoCOP.format(producto.precio)}
          </span>
        </div>

        <a
          href={whatsappLinkProducto(producto.referencia, producto.nombre)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center gap-2 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-600"
        >
          Solicitar por WhatsApp
        </a>
      </div>
    </div>
  );
}
