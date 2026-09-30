import Image from "next/image";
import Link from "next/link";

type Props = {
  marca: string;
  imagen: string;
  eyebrow: string;
  descripcion: string;
  /** "left" pone el texto a la izquierda con foto a la derecha, y viceversa */
  align?: "left" | "right";
};

export default function BrandBanner({ marca, imagen, eyebrow, descripcion, align = "left" }: Props) {
  const textOnRight = align === "right";

  return (
    <section className="relative isolate flex min-h-[420px] items-center overflow-hidden bg-neutral-900 sm:min-h-[480px]">
      <Image
        src={imagen}
        alt={`Repuestos ${marca}`}
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Degradado oscuro para que el texto sea legible sobre la foto */}
      <div
        className={`absolute inset-0 bg-gradient-to-${textOnRight ? "l" : "r"} from-black/90 via-black/60 to-black/20`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className={`max-w-lg ${textOnRight ? "ml-auto text-right" : ""}`}>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Venta de repuestos {marca}
          </h2>
          <p className="mt-2 text-lg font-bold text-neutral-300">{eyebrow}</p>
          <p className="mt-4 text-neutral-200">{descripcion}</p>
          <Link
            href={`/catalogo?marca_vehiculo=${encodeURIComponent(marca)}`}
            className="mt-6 inline-block rounded-md border border-white/10 bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Ver repuestos {marca}
          </Link>
        </div>
      </div>
    </section>
  );
}
