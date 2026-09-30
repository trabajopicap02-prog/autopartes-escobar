"use server";

import { createPublicClient } from "@/lib/supabase/public";

export type PqrsFormState = {
  ok: boolean;
  error?: string;
};

export async function submitPqrs(
  _prevState: PqrsFormState,
  formData: FormData
): Promise<PqrsFormState> {
  const tipo = String(formData.get("tipo") ?? "");
  const nombre = String(formData.get("nombre") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim();
  const mensaje = String(formData.get("mensaje") ?? "").trim();

  if (!tipo || !nombre || !mensaje) {
    return { ok: false, error: "Por favor completa los campos obligatorios." };
  }

  const supabase = createPublicClient();
  const { error } = await supabase.from("pqrs").insert({
    tipo,
    nombre,
    email: email || null,
    telefono: telefono || null,
    mensaje,
  });

  if (error) {
    console.error("Error guardando PQRS:", error.message);
    return { ok: false, error: "No pudimos enviar tu solicitud. Intenta de nuevo." };
  }

  return { ok: true };
}
