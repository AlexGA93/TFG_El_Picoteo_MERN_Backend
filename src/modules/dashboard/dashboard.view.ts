type DashboardResponse = {
  recipes: unknown;
  stock: unknown;
  inventory: unknown;
  ventas: unknown;
  gastos: unknown;
};

export const dashboardView = (data: DashboardResponse) => {
  return {
    recipes: data.recipes,
    stock: data.stock,
    inventory: data.inventory,
    ventas: data.ventas,
    gastos: data.gastos,
  };
};
