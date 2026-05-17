import { Purchase } from "../../core/types/purchases";
import {
  createPurchase,
  deletePurchase,
  deletePurchaseItemsByInventoryId,
  deletePurchaseItemsByPurchaseId,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
} from "./purchases.model";

export const getAllPurchasesService = () => getAllPurchases();
export const getPurchaseByIdService = (id: string) => getPurchaseById(id);
export const createPurchaseService = (payload: Purchase) => createPurchase(payload);
export const updatePurchaseService = (id: string, payload: Purchase) => updatePurchase(id, payload);
export const deletePurchaseService = async (id: string) => {
  await deletePurchaseItemsByPurchaseId(id);
  return deletePurchase(id);
};
export const deletePurchaseItemsByInventoryIdService = (idInventory: string) =>
  deletePurchaseItemsByInventoryId(idInventory);
