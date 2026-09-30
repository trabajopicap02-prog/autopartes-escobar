import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { createClient } from "@/lib/supabase/server";
import { updateProduct } from "../actions";
import type { Producto } from "@/lib/types";

export const metadata = { title: "Editar producto — Panel administrativo" };

type Props = { params: Promise<{ id: string }> };

export default async function EditarProductoPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*").eq("id", id).single();

  if (!data) notFound();

  const producto = data as Producto;
  const actionConId = updateProduct.bind(null, id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold">Editar producto</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Ref. {producto.referencia}</p>
      <div className="mt-8">
        <ProductForm action={actionConId} producto={producto} />
      </div>
    </div>
  );
}
