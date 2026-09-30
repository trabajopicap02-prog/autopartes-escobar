export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-premium-dark relative overflow-hidden text-white">
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-neutral-300">{subtitle}</p>}
      </div>
    </section>
  );
}
