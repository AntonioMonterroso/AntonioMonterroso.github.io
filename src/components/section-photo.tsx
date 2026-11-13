import { basePath } from "@/lib/site";

/** Foto de fondo de una sección (como la portada). Se carga solo al acercarse a la sección. */
export function SectionPhoto({ name }: { name: string }) {
  const src = `${basePath}/images/${name}.webp`;
  return (
    <>
      <picture>
        <source media="(max-width: 767px)" srcSet={`${basePath}/images/${name}-m.webp`} />
        <img src={src} width={1600} height={1000} alt="" loading="lazy" decoding="async" className="ph-img" />
      </picture>
      <div aria-hidden="true" className="ph-veil" />
    </>
  );
}
