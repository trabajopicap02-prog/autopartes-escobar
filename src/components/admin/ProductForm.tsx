"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { CATEGORIAS, ESTADOS, MARCAS_VEHICULO } from "@/lib/constants";
import type { Producto } from "@/lib/types";
import type { ProductFormState } from "@/app/admin/dashboard/actions";

type Props = {
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  producto?: Producto;
};

const initialState: ProductFormState = {};

export default function ProductForm({ action, producto }: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [imagenesActuales, setImagenesActuales] = useState<string[]>(producto?.imagenes ?? []);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo label="Referencia *">
          <input name="referencia" required defaultValue={producto?.referencia} className={inputClass} />
        </Campo>
        <Campo label="Nombre del repuesto *">
          <input name="nombre" required defaultValue={producto?.nombre} className={inputClass} />
        </Campo>
      </div>

      <Campo label="Descripción">
        <textarea name="descripcion" rows={3} defaultValue={producto?.descripcion ?? ""} className={inputClass} />
      </Campo>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Campo label="Categoría *">
          <select name="categoria" required defaultValue={producto?.categoria ?? ""} className={inputClass}>
            <option value="">Selecciona</option>
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Campo>
        <Campo label="Marca del vehículo *">
          <select name="marca_vehiculo" required defaultValue={producto?.marca_vehiculo ?? ""} className={inputClass}>
            <option value="">Selecciona</option>
            {MARCAS_VEHICULO.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </Campo>
        <Campo label="Modelo">
          <input name="modelo" defaultValue={producto?.modelo ?? ""} className={inputClass} placeholder="Ej: Golf, A4, Clase C" />
        </Campo>
        <Campo label="Estado">
          <select name="estado" defaultValue={producto?.estado ?? "Original"} className={inputClass}>
            {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </Campo>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Campo label="Año desde">
          <input type="number" name="anio_desde" defaultValue={producto?.anio_desde ?? ""} className={inputClass} />
        </Campo>
        <Campo label="Año hasta">
          <input type="number" name="anio_hasta" defaultValue={producto?.anio_hasta ?? ""} className={inputClass} />
        </Campo>
        <Campo label="Precio (COP) *">
          <input type="number" name="precio" required min={0} defaultValue={producto?.precio ?? ""} className={inputClass} />
        </Campo>
        <Campo label="Cantidad en stock *">
          <input type="number" name="cantidad" required min={0} defaultValue={producto?.cantidad ?? ""} className={inputClass} />
        </Campo>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Campo label="Marca del repuesto (fabricante)">
          <input name="marca_repuesto" defaultValue={producto?.marca_repuesto ?? ""} className={inputClass} placeholder="Ej: Bosch, Febi, OEM" />
        </Campo>
        <Campo label="SKU interno">
          <input name="sku_interno" defaultValue={producto?.sku_interno ?? ""} className={inputClass} />
        </Campo>
        <Campo label="Proveedor">
          <input name="proveedor" defaultValue={producto?.proveedor ?? ""} className={inputClass} />
        </Campo>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" name="destacado" defaultChecked={producto?.destacado} className="h-4 w-4" />
        Mostrar en la página &quot;Tienda&quot; (producto destacado)
      </label>

      {imagenesActuales.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium">Imágenes actuales</p>
          <div className="flex flex-wrap gap-3">
            {imagenesActuales.map((url) => (
              <div key={url} className="relative">
                <input type="hidden" name="imagenes_actuales" value={url} />
                <div className="relative h-24 w-24 overflow-hidden rounded-md border border-neutral-300">
                  <Image src={url} alt="" fill className="object-cover" unoptimized />
                </div>
                <button
                  type="button"
                  onClick={() => setImagenesActuales((prev) => prev.filter((u) => u !== url))}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white"
                  aria-label="Quitar imagen"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Campo label={imagenesActuales.length > 0 ? "Agregar más imágenes" : "Imágenes del producto"}>
        <input type="file" name="imagenes" accept="image/*" multiple className={inputClass} />
      </Campo>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60"
      >
        {pending ? "Guardando..." : "Guardar producto"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900";

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
