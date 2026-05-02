import { DashboardResponse } from "../../core/types/dashboard";


export const dashboardView = (data: DashboardResponse) => {
  return {
    recipes: data.recipes,
    stock: data.stock,
    inventory: data.inventory,
    ingredients: data.ingredients,
    ventas: data.ventas,
    gastos: data.gastos,
  };
};
