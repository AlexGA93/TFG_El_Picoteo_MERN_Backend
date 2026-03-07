import {
  getRecipesSample,
  getStockSample,
  getInventoryRows,
  getSalesPeriods,
  getExpensePeriods,
} from "../repositories/dashboard.repositories";

type InventoryRow = {
  id: number;
  nombre: string;
  tipo: string;
  unidades: string;
  n_unidades: number;
  proveedor: string;
  precio_unidad: number;
  fecha_registro: string;
};

export const buildDashboardData = async () => {
  const limit = 6;

  const [recipes, stock, inventoryRows, ventas, gastos] = await Promise.all([
    getRecipesSample(limit),
    getStockSample(limit),
    getInventoryRows(),
    getSalesPeriods(),
    getExpensePeriods(),
  ]);

  const grouped = new Map<
    string,
    { tipo: string; items: InventoryRow[]; totalItems: number; totalPrice: number }
  >();

  for (const row of inventoryRows as InventoryRow[]) {
    if (!grouped.has(row.tipo)) {
      grouped.set(row.tipo, {
        tipo: row.tipo,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
    }

    const group = grouped.get(row.tipo)!;

    if (group.items.length < limit) {
      group.items.push(row);
    }

    group.totalItems += Number(row.n_unidades);
    group.totalPrice += Number(row.n_unidades) * Number(row.precio_unidad);
  }

  const inventory = Array.from(grouped.values()).map((g) => ({
    ...g,
    totalPrice: Number(g.totalPrice.toFixed(2)),
  }));

  return {
    recipes,
    stock,
    inventory,
    ventas,
    gastos,
  };
};
