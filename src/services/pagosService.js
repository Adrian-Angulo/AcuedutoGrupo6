import { api } from "./api";

export const getPagos = async () => {
  // TODO: Implementar GET para listar pagos
  return await api.get("/pagos");
};

export const getPago = async (id) => {
  // TODO: Implementar GET para obtener un pago
  return await api.get(`/pagos/${id}`);
};

export const createPago = async (data) => {
  // TODO: Implementar POST para crear pago
  return await api.post("/pagos", data);
};

export const updatePago = async (id, data) => {
  // TODO: Implementar PUT para actualizar pago
  return await api.put(`/pagos/${id}`, data);
};

export const deletePago = async (id) => {
  // TODO: Implementar DELETE para eliminar pago
  return await api.delete(`/pagos/${id}`);
};
