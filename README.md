# Autopartes Escobar — sitio web + panel administrativo

Sitio hecho con **Next.js** + **Supabase** (base de datos, login y almacenamiento de
imágenes) + **Tailwind CSS**.

Páginas: Inicio, Tienda, Catálogo, Nosotros, PQRS y un panel administrativo (`/admin`)
protegido con usuario/contraseña donde puedes subir y editar productos (imágenes,
referencia, descripción, precio, cantidad, marca, categoría, vehículo/modelo/año
compatible, SKU interno y proveedor).

Costo real de operar esto: **$0/mes** (Vercel y Supabase en plan gratuito son más que
suficientes para este catálogo) + el precio de tu dominio propio (~10-15 USD/año).

---

## 1. Crear el proyecto de Supabase (gratis)

1. Ve a [supabase.com](https://supabase.com) → crea una cuenta → **New project**.
2. Elige un nombre (ej. `autopartes-escobar`), una contraseña de base de datos (guárdala)
   y la región más cercana (ej. `South America (São Paulo)`).
3. Cuando el proyecto esté listo, ve a **SQL Editor → New query**, pega todo el
   contenido del archivo [`supabase/schema.sql`](supabase/schema.sql) de este proyecto,
   y dale **Run**. Esto crea las tablas `products` y `pqrs`, sus reglas de seguridad,
   y el bucket de imágenes `productos`.
4. Ve a **Project Settings → API**. Copia:
   - **Project URL** → lo necesitas para `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → lo necesitas para `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Ve a **Authentication → Users → Add user** y crea tu usuario admin (tu correo y una
   contraseña segura). Con ese usuario vas a entrar a `/admin`. Puedes crear más de uno
   si luego quieres dar acceso a un empleado.

## 2. Configurar el proyecto localmente

1. Copia `.env.local.example` como `.env.local` (mismo folder) y pega los dos valores
   que copiaste de Supabase.
2. Instala dependencias y corre en local:

   ```powershell
   npm install
   npm run dev
   ```
3. Abre `http://localhost:3000`. Entra a `/admin/login` con el usuario que creaste en
   Supabase y sube tu primer producto.

## 3. Editar los datos de contacto de la empresa

Todo lo editable rápido (teléfono, WhatsApp, dirección, horario, redes sociales) está en
un solo archivo: [`src/lib/constants.ts`](src/lib/constants.ts). Reemplaza los valores
marcados con `TODO` antes de publicar.

## 4. Subir el código a GitHub

```powershell
git init
git add .
git commit -m "Sitio Autopartes Escobar"
```

Crea un repositorio nuevo (privado o público) en [github.com/new](https://github.com/new)
y sigue las instrucciones que te da GitHub para conectar tu carpeta local (`git remote add
origin ...` y `git push`).

## 5. Desplegar en Vercel (gratis) y conectar tu dominio propio

1. Ve a [vercel.com](https://vercel.com) → inicia sesión con tu cuenta de GitHub →
   **Add New → Project** → elige el repositorio que acabas de subir.
2. En **Environment Variables**, agrega las mismas dos variables de tu `.env.local`
   (`NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
3. Dale **Deploy**. En 1-2 minutos tendrás una URL gratis tipo
   `autopartes-escobar.vercel.app` ya funcionando en internet.
4. **Comprar tu propio dominio** (ej. `autopartesescobar.com`):
   - Opción barata internacional: [Namecheap](https://www.namecheap.com) o
     [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) (~10-15 USD/año).
   - Opción en Colombia: [NIC Colombia](https://nic.co) para un `.com.co` (~60.000-90.000 COP/año).
5. En Vercel: **Project → Settings → Domains** → escribe tu dominio → Vercel te da 1-2
   registros DNS (tipo `A` y/o `CNAME`) para agregar en el panel de tu proveedor de
   dominio. En unos minutos u horas tu sitio quedará en `www.autopartesescobar.com`
   (o el dominio que hayas comprado) con HTTPS automático.

Desde ese momento, cada vez que hagas `git push`, Vercel vuelve a publicar el sitio
automáticamente con los cambios.

## 6. Usar el panel administrativo

- Entra a `tudominio.com/admin` (o `/admin/login` si no hay sesión).
- **+ Nuevo producto**: sube imágenes, referencia, nombre, descripción, categoría, marca
  del vehículo, modelo, años compatibles, estado (original/homologado/usado), marca del
  repuesto (fabricante), precio, cantidad en stock, SKU interno y proveedor.
- Marca la casilla **"Mostrar en Tienda"** para que el producto aparezca destacado en la
  página Tienda (además de aparecer siempre en el Catálogo completo).
- Puedes editar o eliminar cualquier producto desde la tabla del panel.
- Las solicitudes que lleguen por el formulario **PQRS** quedan guardadas en la tabla
  `pqrs` de Supabase (Table Editor → pqrs) — desde ahí puedes revisarlas y marcarlas
  como atendidas cambiando la columna `estado`.

---

## Estructura del proyecto

```
src/
  app/
    page.tsx              → Inicio
    tienda/                → Tienda (productos destacados)
    catalogo/               → Catálogo completo con filtros
    nosotros/               → Nosotros
    pqrs/                   → Formulario PQRS
    admin/
      login/                → Login del panel
      dashboard/            → Lista de productos + crear/editar/eliminar
  components/               → Navbar, Footer, tarjetas de producto, formulario admin
  lib/
    constants.ts            → Datos de la empresa (edítalo primero)
    products.ts              → Consultas de productos con filtros
    supabase/                → Clientes de Supabase (browser, server, público)
supabase/schema.sql          → Script SQL para crear la base de datos en Supabase
```
