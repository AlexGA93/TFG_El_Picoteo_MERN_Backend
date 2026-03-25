import { Inventory } from "../../core/types/inventory";
import {
  createinventory,
  deleteinventory,
  getAllinventory,
  getinventoryById,
  updateinventory,
} from "./inventory.model";

export const getAllinventoryService = () => getAllinventory();
export const getinventoryByIdService = (id: string) => getinventoryById(id);
export const createinventoryService = (payload: Inventory) => createinventory(payload);
export const updateinventoryService = (payload: Inventory) => updateinventory(payload);
export const deleteinventoryService = (id: string) => deleteinventory(id);
