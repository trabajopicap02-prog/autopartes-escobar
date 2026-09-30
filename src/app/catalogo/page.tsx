import { Suspense } from "react";
import ProductFilters from "@/components/ProductFilters";
import ProductCard from "@/components/ProductCard";
import PageHero from "@/components/PageHero";
import { fetchProductos } from "@/lib/products";

export const metadata = { title: "Catálogo — Autopartes Escobar" };
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<Record<string, string | undefined>> };

export default async function CatalogoPage({ searchParams }: Props) {
  const filtros = await searchParams;
  const productos = await fetchProductos(filtros);

  return (
    <div>
      <PageHero
        title="Catálogo completo"
        subtitle="Filtra por marca, modelo, año y categoría para encontrar el repuesto que necesitas."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mt-6">
        <Suspense>
          <ProductFilters />
        </Suspense>
      </div>

      <p className="mt-4 text-sm text-neutral-500">
        {productos.length} {productos.length === 1 ? "producto encontrado" : "productos encontrados"}
      </p>

      {productos.length === 0 ? (
        <p className="mt-10 text-center text-neutral-500">
          No encontramos productos con esos filtros. Escríbenos por WhatsApp, seguro lo tenemos
          disponible para pedir.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productos.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
