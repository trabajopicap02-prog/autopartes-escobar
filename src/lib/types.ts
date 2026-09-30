export type Producto = {
  id: string;
  referencia: string;
  nombre: string;
  descripcion: string | null;
  categoria: string;
  marca_vehiculo: string;
  modelo: string | null;
  anio_desde: number | null;
  anio_hasta: number | null;
  estado: string;
  marca_repuesto: string | null;
  precio: number;
  cantidad: number;
  sku_interno: string | null;
  proveedor: string | null;
  imagenes: string[];
  destacado: boolean;
  created_at: string;
  updated_at: string;
};

export type PqrsTipo = "Petición" | "Queja" | "Reclamo" | "Sugerencia";

export type PqrsSubmission = {
  id: string;
  tipo: PqrsTipo;
  nombre: string;
  email: string | null;
  telefono: string | null;
  mensaje: string;
  estado: string;
  created_at: string;
};
