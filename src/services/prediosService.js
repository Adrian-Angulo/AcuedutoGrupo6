import { api } from "./api";

export const getPredios = async () => {
  // TODO: Implementar GET para listar predios
  return await api.get("/predios");
};

export const getPredio = async (id) => {
  // TODO: Implementar GET para obtener un predio
  return await api.get(`/predios/${id}`);
};

export const createPredio = async (data) => {
  // TODO: Implementar POST para crear predio
  return await api.post("/predios", data);
};

export const updatePredio = async (id, data) => {
  // TODO: Implementar PUT para actualizar predio
  return await api.put(`/predios/${id}`, data);
};

export const deletePredio = async (id) => {
  // TODO: Implementar DELETE para eliminar predio
  return await api.delete(`/predios/${id}`);
};
