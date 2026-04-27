import { RecipesData } from "../../core/types/recipes";

const buildImageUrl = (baseUrl: string, fileName?: string) => {
  if (!fileName) return null;

  return `${baseUrl}/static/images/${fileName}`;
};

export const recipesView = (data: RecipesData[], baseUrl: string) => {
  return data.map((recipe) => ({
    id: recipe.id,
    nombre: recipe.nombre,
    precio: recipe.precio,
    tiempo_produccion_min: recipe.tiempo_produccion_min,
    dificultad: recipe.dificultad,
    imagen: buildImageUrl(baseUrl, recipe.url),
    ingredients: [...recipe.ingredients],
  }));
};

export const recipeView = (data: RecipesData, baseUrl: string) => {
  return {
    id: data.id,
    nombre: data.nombre,
    precio: data.precio,
    tiempo_produccion_min: data.tiempo_produccion_min,
    dificultad: data.dificultad,
    imagen: buildImageUrl(baseUrl, data.url),
    ingredients: [...data.ingredients],
  };
};


export const createdRecipeView = (data: RecipesData, baseUrl: string) => {
  return {
    id: data.id,
    nombre: data.nombre,
    precio: data.precio,
    tiempo_produccion_min: data.tiempo_produccion_min,
    dificultad: data.dificultad,
    imagen: buildImageUrl(baseUrl, data.url),
    ingredients: [...data.ingredients],
  };
};
