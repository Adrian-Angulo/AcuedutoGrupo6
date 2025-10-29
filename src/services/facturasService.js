import { api } from "./api";

export const getFacturas = async () => {
  // TODO: Implementar GET para listar facturas
  return await api.get("/facturas");
};

export const getFactura = async (id) => {
  // TODO: Implementar GET para obtener una factura
  return await api.get(`/facturas/${id}`);
};

export const createFactura = async (data) => {
  // TODO: Implementar POST para crear factura
  return await api.post("/facturas", data);
};

export const updateFactura = async (id, data) => {
  // TODO: Implementar PUT para actualizar factura
  return await api.put(`/facturas/${id}`, data);
};

export const deleteFactura = async (id) => {
  // TODO: Implementar DELETE para eliminar factura
  return await api.delete(`/facturas/${id}`);
};
