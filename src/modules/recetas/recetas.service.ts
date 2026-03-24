import { RecipeRow, RecipesData } from "../../core/types/recipes";
import { getRecipesRows } from "./recetas.model";

export const buildRecipesData = async () => {
  const rows = await getRecipesRows();

  const grouped: Map<number, RecipesData> = new Map<
    number,
    {
      id: number;
      nombre: string;
      precio: number;
      tiempo_produccion_min: number;
      dificultad: string;
      ingredientes: {
        id: number;
        id_inventario: number;
        nombre: string;
        tipo: string;
        cantidad: number;
        unidad: string;
      }[];
    }
  >();

  for (const row of rows as RecipeRow[]) {
    if (!grouped.has(row.id)) {
      grouped.set(row.id, {
        id: row.id,
        nombre: row.nombre_producto,
        precio: Number(row.precio_producto),
        tiempo_produccion_min: Number(row.tiempo_produccion_min),
        dificultad: row.dificultad,
        ingredientes: [],
      });
    }

    const recipe = grouped.get(row.id)!;

    if (row.ingrediente_id !== null) {
      recipe.ingredientes.push({
        id: row.ingrediente_id,
        id_inventario: row.id_inventario!,
        nombre: row.ingrediente_nombre!,
        tipo: row.ingrediente_tipo!,
        cantidad: Number(row.cantidad),
        unidad: row.unidad!,
      });
    }
  }

  return Array.from(grouped.values());
};
