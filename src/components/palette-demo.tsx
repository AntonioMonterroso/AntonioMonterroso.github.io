import { T } from "@/components/t";
import { Split } from "@/components/split";
import { PaletteSwitcher } from "@/components/palette-switcher";

export function PaletteDemo() {
  return (
    <section aria-labelledby="demo-title" className="border-y border-[var(--line)] bg-[var(--navy)]">
      <div className="shell grid gap-8 py-[clamp(3.5rem,2rem+5vw,6rem)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <p className="kicker" data-reveal><T es="Pruébalo aquí mismo" en="Try it right here" /></p>
          <h2 id="demo-title" className="display mt-4 text-[length:var(--step-3)]" data-reveal="lines">
            <T es={<Split text="Cambia los colores de esta página." />} en={<Split text="Change this page's colors." />} />
          </h2>
          <p className="lead mt-4 max-w-[38rem]" data-reveal style={{ ["--d" as string]: "150ms" }}>
            <T
              es="Fondos, botones, textos y hasta los volcanes. Con tu sistema pasa lo mismo: se viste con tu marca desde el primer boceto."
              en="Backgrounds, buttons, text, even the volcanoes. Your system works the same way: it wears your brand from the first sketch."
            />
          </p>
        </div>
        <div data-reveal style={{ ["--d" as string]: "100ms" }}>
          <PaletteSwitcher size="lg" className="flex-wrap gap-3" />
        </div>
      </div>
    </section>
  );
}
