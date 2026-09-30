import { createPublicClient } from "@/lib/supabase/public";
import type { Producto } from "@/lib/types";

export type FiltrosProducto = {
  categoria?: string;
  marca_vehiculo?: string;
  estado?: string;
  anio?: string;
  q?: string; // búsqueda libre: nombre, referencia o modelo
};

export async function fetchProductos(
  filtros: FiltrosProducto,
  opciones: { soloDestacados?: boolean } = {}
): Promise<Producto[]> {
  const supabase = createPublicClient();
  let query = supabase.from("products").select("*").order("created_at", { ascending: false });

  if (opciones.soloDestacados) query = query.eq("destacado", true);
  if (filtros.categoria) query = query.eq("categoria", filtros.categoria);
  if (filtros.marca_vehiculo) query = query.eq("marca_vehiculo", filtros.marca_vehiculo);
  if (filtros.estado) query = query.eq("estado", filtros.estado);
  if (filtros.anio) {
    const anio = Number(filtros.anio);
    if (!Number.isNaN(anio)) {
      query = query.lte("anio_desde", anio).gte("anio_hasta", anio);
    }
  }
  if (filtros.q) {
    const term = `%${filtros.q}%`;
    query = query.or(
      `nombre.ilike.${term},referencia.ilike.${term},modelo.ilike.${term}`
    );
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error consultando productos:", error.message);
    return [];
  }
  return (data ?? []) as Producto[];
}
