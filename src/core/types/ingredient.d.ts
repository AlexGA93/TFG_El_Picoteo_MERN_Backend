export type QueryParams = Array<string | number | boolean | Date | null>;

export type IngredientUnit = 'kg' | 'litros' | 'unidad' | 'metros' | 'gramos';

export interface Ingredient {
    id: string;
    id_producto_stock: number;
    id_inventario: number;
    cantidades: number;
    unidad: InventoryUnit;
}