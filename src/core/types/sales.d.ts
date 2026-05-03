export type QueryParams = Array<string | number | boolean | Date | null>;

export interface Sale {
  id?: number;
  fecha_venta: string;
  metodo_pago: "efectivo" | "tarjeta" | "bizum";
  id_usuario: number;
  total_venta: number;
}
