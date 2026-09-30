import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "../actions";

export const metadata = { title: "Nuevo producto — Panel administrativo" };

export default function NuevoProductoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        Completa la información del repuesto. Los campos marcados con * son obligatorios.
      </p>
      <div className="mt-8">
        <ProductForm action={createProduct} />
      </div>
    </div>
  );
}
