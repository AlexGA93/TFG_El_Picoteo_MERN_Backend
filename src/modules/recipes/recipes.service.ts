import mysqlPool from "../../core/db/db";
import { PoolConnection } from "mysql2/promise";
import { unlink } from "fs/promises";
import path from "path";
import { RecipeRow, RecipesData, RecipeToBeCreated } from "../../core/types/recipes";
import {
  createIngredientRow,
  createStockRow,
  decrementInventoryUnits,
  deleteIngredientsByStockId,
  deleteSaleItemsByStockId,
  deleteStockRow,
  getInventoryById,
  getRecipesRows,
  incrementInventoryUnits,
  updateStockRow,
} from "./recipes.model";

const validateIngredients = async (
  connection: PoolConnection,
  ingredients: RecipeToBeCreated["ingredients"],
) => {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    throw new Error("La receta debe contener al menos un ingrediente");
  }

  for (const ingredient of ingredients) {
    if (
      typeof ingredient.id_inventory !== "number" ||
      typeof ingredient.cantidad !== "number" ||
      !ingredient.unidad
    ) {
      throw new Error("Ingrediente invalido");
    }

    const inventoryRow = await getInventoryById(connection, ingredient.id_inventory);
    if (!inventoryRow) {
      throw new Error(
        `Inventario no encontrado para id ${ingredient.id_inventory}`,
      );
    }

    const currentUnits = Number(inventoryRow.n_unidades);
    if (currentUnits < ingredient.cantidad) {
      throw new Error(`Inventario insuficiente para id ${ingredient.id_inventory}`);
    }
  }
};

const syncRecipeIngredients = async (
  connection: PoolConnection,
  stockId: number,
  ingredients: RecipeToBeCreated["ingredients"],
) => {
  await validateIngredients(connection, ingredients);

  for (const ingredient of ingredients) {
    const createdIngredient = await createIngredientRow(connection, stockId, ingredient);
    if (!createdIngredient) {
      throw new Error("Error al crear el registro de ingrediente");
    }

    const decrementResult = await decrementInventoryUnits(
      connection,
      ingredient.id_inventory,
      ingredient.cantidad,
    );
    if (!decrementResult) {
      throw new Error("Error al decrementar las unidades del inventario");
    }
  }
};

export const getRecipesData = async () => {
  const rows = await getRecipesRows();

  const grouped: Map<number, RecipesData> = new Map<
    number,
    {
      id: number;
      nombre: string;
      precio: number;
      tiempo_produccion_min: number;
      dificultad: string;
      ingredients: {
        id: number;
        id_inventory: number;
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
        url: row.url ?? undefined,
        ingredients: [],
      });
    }

    const recipe = grouped.get(row.id)!;

    if (row.ingrediente_id !== null) {
      recipe.ingredients.push({
        id: row.ingrediente_id,
        id_inventory: row.id_inventory!,
        nombre: row.ingrediente_nombre!,
        tipo: row.ingrediente_tipo!,
        cantidad: Number(row.cantidad),
        unidad: row.unidad!,
      });
    }
  }

  return Array.from(grouped.values());
};

export const getRecipeDataById = async (id: string) => {
  const rows = await getRecipesRows();
  // Filter rows by the specified ID
  const filteredRows = rows.filter((row) => row.id === parseInt(id));

  if (filteredRows.length === 0) {
    return null; // No recipe found with the given ID
  }

  const row = filteredRows[0]; // Get the first row (since all rows with the same ID will have the same recipe data)

  const recipeData: RecipesData = {
    id: row.id,
    nombre: row.nombre_producto,
    precio: Number(row.precio_producto),
    tiempo_produccion_min: Number(row.tiempo_produccion_min),
    dificultad: row.dificultad,
    url: row.url ?? undefined,
    ingredients: [],
  };

  for (const r of filteredRows as RecipeRow[]) {
    if (r.ingrediente_id !== null) {
      recipeData.ingredients.push({
        id: r.ingrediente_id,
        id_inventory: r.id_inventory!,
        nombre: r.ingrediente_nombre!,
        tipo: r.ingrediente_tipo!,
        cantidad: Number(r.cantidad),
        unidad: r.unidad!,
      });
    }
  }

  return recipeData;
};

export const createRecipeData = async (data: RecipeToBeCreated) => {
  const connection = await mysqlPool.promise().getConnection();

  try {
    await connection.beginTransaction();

    const stockResult = await createStockRow(connection, data);
    if (!stockResult) {
      throw new Error("Error al crear el registro de stock");
    }

    const stockId = Number(stockResult.insertId);
    if (!stockId) {
      throw new Error("Error al crear el registro de stock");
    }

    await syncRecipeIngredients(connection, stockId, data.ingredients);

    await connection.commit();
    return getRecipeDataById(stockId.toString());
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const updateRecipeData = async (id: string, data: RecipeToBeCreated) => {
  const currentRecipe = await getRecipeDataById(id);

  if (!currentRecipe) {
    return null;
  }

  const connection = await mysqlPool.promise().getConnection();

  try {
    await connection.beginTransaction();

    for (const ingredient of currentRecipe.ingredients) {
      const incrementResult = await incrementInventoryUnits(
        connection,
        ingredient.id_inventory,
        ingredient.cantidad,
      );

      if (!incrementResult) {
        throw new Error("Error al restaurar las unidades del inventario");
      }
    }

    await updateStockRow(connection, Number(id), data);
    await deleteIngredientsByStockId(connection, Number(id));
    await syncRecipeIngredients(connection, Number(id), data.ingredients);

    await connection.commit();

    const previousImageFileName = currentRecipe.url?.split("/").pop();
    const nextImageFileName = data.url?.split("/").pop();
    const shouldDeletePreviousImage =
      !!previousImageFileName &&
      !!nextImageFileName &&
      previousImageFileName !== nextImageFileName;

    if (shouldDeletePreviousImage) {
      const filePath = path.join(
        process.cwd(),
        "public",
        "images",
        previousImageFileName,
      );

      try {
        await unlink(filePath);
      } catch (error: any) {
        if (error?.code !== "ENOENT") {
          console.error(
            `No se pudo eliminar la imagen local ${previousImageFileName}:`,
            error,
          );
        }
      }
    }

    return getRecipeDataById(id);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteRecipeData = async (id: string) => {
  const currentRecipe = await getRecipeDataById(id);

  if (!currentRecipe) {
    return false;
  }

  const connection = await mysqlPool.promise().getConnection();

  try {
    await connection.beginTransaction();

    for (const ingredient of currentRecipe.ingredients) {
      const incrementResult = await incrementInventoryUnits(
        connection,
        ingredient.id_inventory,
        ingredient.cantidad,
      );

      if (!incrementResult) {
        throw new Error("Error al restaurar las unidades del inventario");
      }
    }

    await deleteSaleItemsByStockId(connection, Number(id));
    await deleteIngredientsByStockId(connection, Number(id));
    await deleteStockRow(connection, Number(id));

    await connection.commit();

    const imageFileName = currentRecipe.url?.split("/").pop();
    if (imageFileName) {
      const filePath = path.join(process.cwd(), "public", "images", imageFileName);

      try {
        await unlink(filePath);
      } catch (error: any) {
        if (error?.code !== "ENOENT") {
          console.error(`No se pudo eliminar la imagen local ${imageFileName}:`, error);
        }
      }
    }

    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
