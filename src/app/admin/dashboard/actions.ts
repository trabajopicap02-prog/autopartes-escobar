"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { STORAGE_BUCKET } from "@/lib/constants";

export type ProductFormState = {
  error?: string;
};

function num(formData: FormData, key: string): number {
  const v = formData.get(key);
  const n = Number(v);
  return Number.isNaN(n) ? 0 : n;
}

function numOrNull(formData: FormData, key: string): number | null {
  const v = String(formData.get(key) ?? "").trim();
  if (!v) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

async function subirImagenes(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  files: File[],
  referencia: string
): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    if (!file || file.size === 0) continue;
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${referencia || "producto"}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      console.error("Error subiendo imagen:", error.message);
      continue;
    }
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}

function buildProductoBase(formData: FormData) {
  return {
    referencia: String(formData.get("referencia") ?? "").trim(),
    nombre: String(formData.get("nombre") ?? "").trim(),
    descripcion: String(formData.get("descripcion") ?? "").trim() || null,
    categoria: String(formData.get("categoria") ?? ""),
    marca_vehiculo: String(formData.get("marca_vehiculo") ?? ""),
    modelo: String(formData.get("modelo") ?? "").trim() || null,
    anio_desde: numOrNull(formData, "anio_desde"),
    anio_hasta: numOrNull(formData, "anio_hasta"),
    estado: String(formData.get("estado") ?? "Original"),
    marca_repuesto: String(formData.get("marca_repuesto") ?? "").trim() || null,
    precio: num(formData, "precio"),
    cantidad: num(formData, "cantidad"),
    sku_interno: String(formData.get("sku_interno") ?? "").trim() || null,
    proveedor: String(formData.get("proveedor") ?? "").trim() || null,
    destacado: formData.get("destacado") === "on",
  };
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const supabase = await createClient();
  const base = buildProductoBase(formData);

  if (!base.referencia || !base.nombre || !base.categoria || !base.marca_vehiculo) {
    return { error: "Completa referencia, nombre, categoría y marca del vehículo." };
  }

  const archivos = formData.getAll("imagenes").filter((f): f is File => f instanceof File);
  const imagenes = await subirImagenes(supabase, archivos, base.referencia);

  const { error } = await supabase.from("products").insert({ ...base, imagenes });
  if (error) {
    console.error("Error creando producto:", error.message);
    return { error: "No se pudo guardar el producto. Verifica los datos e intenta de nuevo." };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/tienda");
  revalidatePath("/catalogo");
  redirect("/admin/dashboard");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const supabase = await createClient();
  const base = buildProductoBase(formData);

  if (!base.referencia || !base.nombre || !base.categoria || !base.marca_vehiculo) {
    return { error: "Completa referencia, nombre, categoría y marca del vehículo." };
  }

  const imagenesActuales = formData.getAll("imagenes_actuales").map(String);
  const archivos = formData.getAll("imagenes").filter((f): f is File => f instanceof File);
  const nuevasImagenes = await subirImagenes(supabase, archivos, base.referencia);

  const { error } = await supabase
    .from("products")
    .update({ ...base, imagenes: [...imagenesActuales, ...nuevasImagenes] })
    .eq("id", id);

  if (error) {
    console.error("Error actualizando producto:", error.message);
    return { error: "No se pudo actualizar el producto." };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/tienda");
  revalidatePath("/catalogo");
  redirect("/admin/dashboard");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/admin/dashboard");
  revalidatePath("/tienda");
  revalidatePath("/catalogo");
}
