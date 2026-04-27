export type RecipeRow = {
  id: number;
  nombre_producto: string;
  precio_producto: number;
  tiempo_produccion_min: number;
  dificultad: "facil" | "media" | "dificil";
  url: string | null;
  ingrediente_id: number | null;
  id_inventory: number | null;
  ingrediente_nombre: string | null;
  ingrediente_tipo: string | null;
  cantidad: number | null;
  unidad: string | null;
};

export type QueryParams = Array<string | number | boolean | Date | null>;

export interface RecipesIngredients {
  id: number;
  id_inventory: number;
  nombre: string;
  tipo: string;
  cantidad: number;
  unidad: string;
}

export interface RecipesData {
  id: number;
  nombre: string;
  precio: number;
  tiempo_produccion_min: number;
  dificultad: string;
  ingredients: RecipesIngredients[];
  url?: string;
}

export interface RecipeIngredientToCreate {
  id_inventory: number;
  cantidad: number;
  unidad: string;
}

export type RecipeToBeCreated = {
  nombre: string;
  precio: number;
  tiempo_produccion_min: number;
  dificultad: string;
  url: string;
  ingredients: RecipeIngredientToCreate[];
};
