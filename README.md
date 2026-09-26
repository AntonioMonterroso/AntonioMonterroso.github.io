# Monterroso Dev Studio — página web

Páginas web y sistemas a la medida, hechos en Guatemala.

## Cómo cambiar datos (sin programar)

Todo lo que se actualiza seguido está en un solo archivo: **`src/lib/site.ts`**.

- Contacto (correo, teléfono, WhatsApp), horario
- Link de tu GitHub y redes sociales
- El link de demo de cada proyecto (sección "Trabajos")
- Precios de los planes

Desde github.com:

1. Abre `src/lib/site.ts` en este repositorio.
2. Toca el lápiz (Edit this file).
3. Cambia lo que necesites. Donde dice `null` significa "todavía no hay": cámbialo por el texto o link entre comillas.
4. Toca **Commit changes**.

En uno o dos minutos la página se publica sola con el cambio (pestaña **Actions** para ver el avance).

## Fotos

Están en `public/images/`, en WebP comprimido. Para cambiar una, sube otra con el mismo nombre.

## Para programadores

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # genera la página estática en out/
```

Next.js (exportación estática) + Tailwind 4 + shadcn/ui. Se publica con GitHub Actions en GitHub Pages (`.github/workflows/publicar.yml`).
