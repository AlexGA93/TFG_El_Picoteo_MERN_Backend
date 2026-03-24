import { RecipesData } from "../../core/types/recipes";

export const recipesView = (data: RecipesData[]) => {
  return data.map((recipe) => ({
    id: recipe.id,
    nombre: recipe.nombre,
    precio: recipe.precio,
    tiempo_produccion_min: recipe.tiempo_produccion_min,
    dificultad: recipe.dificultad,
    ingredientes: [...recipe.ingredientes],
  }));
};
