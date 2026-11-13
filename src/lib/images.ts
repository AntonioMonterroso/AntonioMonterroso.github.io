// Fotos de la página en public/images/ (WebP). La acuarela es del cliente; las demás son de Unsplash (licencia libre).
// Se cargan solo cuando el visitante llega a cada sección (la portada se carga primero).

import { basePath } from "@/lib/site";

export type SiteImage = { src: string; width: number; height: number };

export const bocetoAcuarela: SiteImage = { src: basePath + "/images/boceto-acuarela.webp", width: 1200, height: 800 };
export const manosLaptop: SiteImage = { src: basePath + "/images/manos-laptop.webp", width: 1400, height: 933 };
export const antiguaArco: SiteImage = { src: basePath + "/images/antigua-arco.webp", width: 900, height: 1125 };
export const atitlanMuelle: SiteImage = { src: basePath + "/images/atitlan-muelle.webp", width: 1600, height: 900 };
export const escritorioDiseno: SiteImage = { src: basePath + "/images/escritorio-diseno.webp", width: 1400, height: 1000 };

// Portada: Volcán de Agua (escritorio 2200 px y celular 900×1500 recortada).
export const volcanAgua = { src: basePath + "/images/volcan-agua-calido.webp", mobile: basePath + "/images/volcan-agua-calido-m.webp", width: 2200, height: 1468 };
