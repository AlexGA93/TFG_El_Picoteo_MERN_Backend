export type InventoryRow = {
  id: number;
  nombre: string;
  tipo: string;
  unidades: string;
  n_unidades: number;
  proveedor: string;
  precio_unidad: number;
  fecha_registro: string;
};

export type QueryParams = Array<string | number | boolean | Date | null>;

export type DashboardResponse = {
  recipes: unknown;
  stock: unknown;
  inventory: unknown;
  ingredients: unknown;
  ventas: unknown;
  gastos: unknown;
};