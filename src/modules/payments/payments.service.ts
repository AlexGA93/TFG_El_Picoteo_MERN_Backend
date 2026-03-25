import {
  createPago,
  deletePago,
  getAllpayments,
  getPagoById,
  updatePago,
} from "./payments.model";

export const getAllpaymentsService = () => getAllpayments();
export const getPagoByIdService = (id: string) => getPagoById(id);
export const createpaymentservice = (id_stock: number) => createPago(id_stock);
export const updatepaymentservice = (id: string, id_stock: number) => updatePago(id, id_stock);
export const deletepaymentservice = (id: string) => deletePago(id);
