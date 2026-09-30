"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CATEGORIAS, ESTADOS, MARCAS_VEHICULO } from "@/lib/constants";

export default function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function set(name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(name, value);
    else params.delete(name);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="grid gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 sm:grid-cols-2 md:grid-cols-5 dark:border-neutral-800 dark:bg-neutral-900">
      <input
        type="text"
        placeholder="Buscar por nombre, referencia o modelo..."
        defaultValue={searchParams.get("q") ?? ""}
        onKeyDown={(e) => {
          if (e.key === "Enter") set("q", (e.target as HTMLInputElement).value);
        }}
        onBlur={(e) => set("q", e.target.value)}
        className="rounded-md border border-neutral-300 px-3 py-2 text-sm md:col-span-2 dark:border-neutral-700 dark:bg-neutral-950"
      />

      <select
        value={searchParams.get("marca_vehiculo") ?? ""}
        onChange={(e) => set("marca_vehiculo", e.target.value)}
        className="rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-950"
      >
        <option value="">Todas las marcas</option>
        {MARCAS_VEHICULO.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select
        value={searchParams.get("categoria") ?? ""}
        onChange={(e) => set("categoria", e.target.value)}
        className="rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-950"
      >
        <option value="">Todas las categorías</option>
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={searchParams.get("estado") ?? ""}
        onChange={(e) => set("estado", e.target.value)}
        className="rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-950"
      >
        <option value="">Original / Homologado / Usado</option>
        {ESTADOS.map((e) => (
          <option key={e} value={e}>{e}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Año del vehículo"
        defaultValue={searchParams.get("anio") ?? ""}
        onBlur={(e) => set("anio", e.target.value)}
        className="rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-950"
      />
    </div>
  );
}
