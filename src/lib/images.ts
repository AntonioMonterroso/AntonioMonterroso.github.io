// Fotos del cliente (contexto/diseno/), recortadas y comprimidas a WebP: 176 KB entre las cuatro.
// Viven en public/images/ y se cargan solo cuando el visitante llega a cada sección.

import { basePath } from "@/lib/site";

export type SiteImage = { src: string; width: number; height: number };

export const bocetoAcuarela: SiteImage = { src: basePath + "/images/boceto-acuarela.webp", width: 1200, height: 800 };
export const escritorioResponsive: SiteImage = { src: basePath + "/images/escritorio-responsive.webp", width: 1100, height: 852 };
export const laptopEntrega: SiteImage = { src: basePath + "/images/laptop-entrega.webp", width: 800, height: 1200 };
export const sistemasIsometrico: SiteImage = { src: basePath + "/images/sistemas-isometrico.webp", width: 1200, height: 700 };

// Portadas (Unsplash, licencia libre): escritorio 2200 px y celular 900×1500 recortada.
export const volcanAgua = { src: basePath + "/images/volcan-agua-calido.webp", mobile: basePath + "/images/volcan-agua-calido-m.webp", width: 2200, height: 1468 };
export const volcanFuego = { src: basePath + "/images/volcan-fuego-noche.webp", mobile: basePath + "/images/volcan-fuego-noche-m.webp", width: 2200, height: 1467 };
