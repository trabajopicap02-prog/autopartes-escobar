// Datos generales de la empresa — edita aquí para actualizar todo el sitio.
export const SITE = {
  nombre: "Autopartes Escobar",
  direccion: "Carrera 27A #66-82",
  ciudad: "Colombia",
  telefono: "3142093715",
  whatsapp: "573142093715",
  email: "autopartesescobar0228@gmail.com",
  horario: "Lunes a viernes 8:30 a.m. - 5:00 p.m. | Sábados 8:30 a.m. - 1:00 p.m.",
  instagram: "https://www.instagram.com/autopartesescobar2",
  facebook: "",
  tiktok: "https://www.tiktok.com/@autopartescobar",
  descripcion:
    "Vendemos autopartes de la línea VAG (Volkswagen, Audi, Skoda, Seat) homologadas y originales, con alta calidad de repuestos y envíos a todo Colombia. También manejamos repuestos para BMW, Mercedes-Benz y Porsche.",
};

export const MARCAS_VEHICULO = [
  "Volkswagen",
  "Audi",
  "Skoda",
  "Seat",
  "BMW",
  "Mercedes-Benz",
  "Porsche",
] as const;

export const CATEGORIAS = [
  "Motor",
  "Transmisión",
  "Frenos",
  "Suspensión",
  "Sincronización",
  "Accesorios y Lujos",
] as const;

export const ESTADOS = ["Original", "Homologado", "Usado"] as const;

// Nombre del bucket de Supabase Storage donde se guardan las imágenes de productos.
export const STORAGE_BUCKET = "productos";

export function whatsappLink(mensaje: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export function whatsappLinkProducto(referencia: string, nombre: string) {
  const mensaje = `Hola, quiero información sobre el repuesto "${nombre}" (Ref. ${referencia}) que vi en la página web.`;
  return whatsappLink(mensaje);
}
