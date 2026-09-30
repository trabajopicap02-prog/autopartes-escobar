import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/admin/login/actions";
import { deleteProduct } from "./actions";
import type { Producto } from "@/lib/types";

export const metadata = { title: "Panel administrativo — Autopartes Escobar" };
export const dynamic = "force-dynamic";

const formatoCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const productos = (data ?? []) as Producto[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Panel administrativo</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {productos.length} producto(s) registrados
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/dashboard/nuevo"
            className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            + Nuevo producto
          </Link>
          <form action={signOut}>
            <button className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>

      {error && <p className="mt-6 text-sm text-red-600">Error cargando productos: {error.message}</p>}

      <div className="mt-8 overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-3">Imagen</th>
              <th className="px-4 py-3">Referencia</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Marca / Modelo</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
                    {p.imagenes?.[0] && (
                      <Image src={p.imagenes[0]} alt="" fill className="object-cover" unoptimized />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">{p.referencia}</td>
                <td className="px-4 py-3 font-medium">{p.nombre}</td>
                <td className="px-4 py-3">{p.marca_vehiculo} {p.modelo ? `· ${p.modelo}` : ""}</td>
                <td className="px-4 py-3">{p.categoria}</td>
                <td className="px-4 py-3">{formatoCOP.format(p.precio)}</td>
                <td className="px-4 py-3">{p.cantidad}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href={`/admin/dashboard/${p.id}`} className="text-neutral-900 hover:underline dark:text-neutral-100">
                      Editar
                    </Link>
                    <form action={deleteProduct.bind(null, p.id)}>
                      <button className="text-neutral-500 hover:text-black hover:underline dark:hover:text-white">
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-neutral-500">
                  Aún no has agregado productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
