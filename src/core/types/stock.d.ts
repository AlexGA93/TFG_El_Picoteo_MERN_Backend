export type QueryParams = Array<string | number | boolean | Date | null>;

export interface Stock {
  id: string;
  nombre_producto: string;
  precio_producto: number;
  tiempo_produccion_min: number;
  dificultad: string;
}

export interface CompleteStock extends Stock {
  url: string | number | boolean | Date | null;
}
