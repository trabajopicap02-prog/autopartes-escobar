-- ============================================================
-- Esquema de base de datos para Autopartes Escobar
-- Ejecuta este archivo completo en: Supabase → SQL Editor → New query → Run
-- ============================================================

-- Tabla de productos
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  referencia text not null,
  nombre text not null,
  descripcion text,
  categoria text not null,
  marca_vehiculo text not null,
  modelo text,
  anio_desde int,
  anio_hasta int,
  estado text not null default 'Original',
  marca_repuesto text,
  precio numeric(12,2) not null default 0,
  cantidad int not null default 0,
  sku_interno text,
  proveedor text,
  imagenes text[] not null default '{}',
  destacado boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tabla de solicitudes PQRS
create table if not exists pqrs (
  id uuid primary key default gen_random_uuid(),
  tipo text not null,
  nombre text not null,
  email text,
  telefono text,
  mensaje text not null,
  estado text not null default 'Nuevo',
  created_at timestamptz not null default now()
);

-- Actualiza updated_at automáticamente en products
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

-- ============================================================
-- Seguridad (Row Level Security)
-- ============================================================
alter table products enable row level security;
alter table pqrs enable row level security;

-- products: cualquiera puede leer (catálogo público);
-- solo un usuario autenticado (tú, desde el panel admin) puede escribir.
drop policy if exists "products_select_public" on products;
create policy "products_select_public" on products
  for select using (true);

drop policy if exists "products_write_authenticated" on products;
create policy "products_write_authenticated" on products
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- pqrs: cualquiera puede insertar (enviar el formulario);
-- solo un usuario autenticado puede leer/gestionar las solicitudes.
drop policy if exists "pqrs_insert_public" on pqrs;
create policy "pqrs_insert_public" on pqrs
  for insert with check (true);

drop policy if exists "pqrs_manage_authenticated" on pqrs;
create policy "pqrs_manage_authenticated" on pqrs
  for select using (auth.uid() is not null);

drop policy if exists "pqrs_update_authenticated" on pqrs;
create policy "pqrs_update_authenticated" on pqrs
  for update using (auth.uid() is not null);

-- ============================================================
-- Storage: bucket público para las imágenes de productos
-- ============================================================
insert into storage.buckets (id, name, public)
values ('productos', 'productos', true)
on conflict (id) do nothing;

drop policy if exists "productos_public_read" on storage.objects;
create policy "productos_public_read" on storage.objects
  for select using (bucket_id = 'productos');

drop policy if exists "productos_authenticated_write" on storage.objects;
create policy "productos_authenticated_write" on storage.objects
  for insert with check (bucket_id = 'productos' and auth.uid() is not null);

drop policy if exists "productos_authenticated_update" on storage.objects;
create policy "productos_authenticated_update" on storage.objects
  for update using (bucket_id = 'productos' and auth.uid() is not null);

drop policy if exists "productos_authenticated_delete" on storage.objects;
create policy "productos_authenticated_delete" on storage.objects
  for delete using (bucket_id = 'productos' and auth.uid() is not null);
