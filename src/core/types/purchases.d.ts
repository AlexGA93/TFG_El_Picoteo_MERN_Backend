export type QueryParams = Array<string | number | boolean | Date | null>;

export interface Purchase {
  id?: number;
  fecha_compra: string;
  proveedor: string;
  id_usuario: number;
  total_compra: number;
}
