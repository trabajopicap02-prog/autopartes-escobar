import { Suspense } from "react";
import ProductFilters from "@/components/ProductFilters";
import ProductCard from "@/components/ProductCard";
import PageHero from "@/components/PageHero";
import { fetchProductos } from "@/lib/products";

export const metadata = { title: "Tienda — Autopartes Escobar" };
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<Record<string, string | undefined>> };

export default async function TiendaPage({ searchParams }: Props) {
  const filtros = await searchParams;
  const productos = await fetchProductos(filtros, { soloDestacados: true });

  return (
    <div>
      <PageHero
        title="Tienda"
        subtitle="Productos destacados y ofertas del momento. Escríbenos por WhatsApp para confirmar disponibilidad y precio."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mt-6">
        <Suspense>
          <ProductFilters />
        </Suspense>
      </div>

      {productos.length === 0 ? (
        <p className="mt-10 text-center text-neutral-500">
          Aún no hay productos destacados con estos filtros. Prueba en el{" "}
          <a href="/catalogo" className="underline">catálogo completo</a>.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productos.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
