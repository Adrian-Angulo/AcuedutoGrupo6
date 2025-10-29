import { api } from "./api";

export const getMantenimientos = async () => {
  return await api.get("/mantenimientos");
};

export const getMantenimiento = async (id) => {
  return await api.get(`/mantenimientos/${id}`);
};

export const createMantenimiento = async (data) => {
  return await api.post("/mantenimientos", data);
};

export const updateMantenimiento = async (id, data) => {
  return await api.put(`/mantenimientos/${id}`, data);
};

export const deleteMantenimiento = async (id) => {
  return await api.delete(`/mantenimientos/${id}`);
};
