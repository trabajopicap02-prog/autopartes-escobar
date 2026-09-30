"use client";

import { useActionState } from "react";
import { submitPqrs, type PqrsFormState } from "./actions";

const initialState: PqrsFormState = { ok: false };

export default function PqrsForm() {
  const [state, formAction, pending] = useActionState(submitPqrs, initialState);

  if (state.ok) {
    return (
      <div className="rounded-lg border border-green-300 bg-green-50 p-6 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
        <p className="font-semibold">¡Gracias! Recibimos tu solicitud.</p>
        <p className="mt-1 text-sm">Te responderemos lo antes posible al contacto que nos dejaste.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Tipo de solicitud *</label>
        <select
          name="tipo"
          required
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
        >
          <option value="">Selecciona una opción</option>
          <option value="Petición">Petición</option>
          <option value="Queja">Queja</option>
          <option value="Reclamo">Reclamo</option>
          <option value="Sugerencia">Sugerencia</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Nombre completo *</label>
        <input
          name="nombre"
          required
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Teléfono</label>
          <input
            name="telefono"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Mensaje *</label>
        <textarea
          name="mensaje"
          required
          rows={5}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
        />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60"
      >
        {pending ? "Enviando..." : "Enviar solicitud"}
      </button>
    </form>
  );
}
