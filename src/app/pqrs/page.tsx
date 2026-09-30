import PqrsForm from "./PqrsForm";
import PageHero from "@/components/PageHero";

export const metadata = { title: "PQRS — Autopartes Escobar" };

export default function PqrsPage() {
  return (
    <div>
      <PageHero
        title="PQRS"
        subtitle="Peticiones, Quejas, Reclamos y Sugerencias. Cuéntanos qué necesitas y te responderemos lo antes posible."
      />
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <PqrsForm />
      </div>
    </div>
  );
}
