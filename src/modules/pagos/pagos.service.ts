import {
  createPago,
  deletePago,
  getAllPagos,
  getPagoById,
  updatePago,
} from "./pagos.model";

export const getAllPagosService = () => getAllPagos();
export const getPagoByIdService = (id: string) => getPagoById(id);
export const createPagoService = (id_stock: number) => createPago(id_stock);
export const updatePagoService = (id: string, id_stock: number) => updatePago(id, id_stock);
export const deletePagoService = (id: string) => deletePago(id);
