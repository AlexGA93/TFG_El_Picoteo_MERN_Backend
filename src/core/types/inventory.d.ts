export type QueryParams = Array<string | number | boolean | Date | null>;

export interface Inventory {
  id?: number;
  nombre: string;
  tipo: string;
  unidades: string;
  n_unidades: number;
  proveedor: string;
  precio_unidad: number;
}