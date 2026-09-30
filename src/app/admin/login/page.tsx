import LoginForm from "./LoginForm";

export const metadata = { title: "Ingresar — Panel administrativo" };

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-20 sm:px-6">
      <h1 className="text-2xl font-bold">Panel administrativo</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        Ingresa con tu usuario para gestionar los productos.
      </p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
