// Fotos del cliente (contexto/diseno/), recortadas y comprimidas a WebP: 176 KB entre las cuatro.
// Viven en public/images/ y se cargan solo cuando el visitante llega a cada sección.

import { basePath } from "@/lib/site";

export type SiteImage = { src: string; width: number; height: number };

export const bocetoAcuarela: SiteImage = { src: basePath + "/images/boceto-acuarela.webp", width: 1200, height: 800 };
export const escritorioResponsive: SiteImage = { src: basePath + "/images/escritorio-responsive.webp", width: 1100, height: 852 };
export const laptopEntrega: SiteImage = { src: basePath + "/images/laptop-entrega.webp", width: 800, height: 1200 };
export const sistemasIsometrico: SiteImage = { src: basePath + "/images/sistemas-isometrico.webp", width: 1200, height: 700 };

// Portada: muelle del Lago de Atitlán (Unsplash, licencia libre). Escritorio, celular (recorte vertical) y miniatura redonda.
export const atitlanMuelle = {
  src: basePath + "/images/atitlan-muelle.webp",
  mobile: basePath + "/images/atitlan-muelle-m.webp",
  thumb: basePath + "/images/atitlan-muelle-sm.webp",
  width: 2400,
  height: 1800,
};
