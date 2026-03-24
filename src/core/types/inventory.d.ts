export type QueryParams = Array<string | number | boolean | Date | null>;

export interface Inventory {
    id?: string;
  nombre: string;
  tipo: string;
  unidades: string;
  n_unidades: number;
  proveedor: string;
  precio_unidad: number;
}