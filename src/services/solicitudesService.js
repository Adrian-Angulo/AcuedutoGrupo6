import { api } from "./api";

export const getSolicitudes = async () => {
  // TODO: Implementar GET para listar solicitudes
  return await api.get("/solicitudes");
};

export const getSolicitud = async (id) => {
  // TODO: Implementar GET para obtener una solicitud
  return await api.get(`/solicitudes/${id}`);
};

export const createSolicitud = async (data) => {
  // TODO: Implementar POST para crear solicitud
  return await api.post("/solicitudes", data);
};

export const updateSolicitud = async (id, data) => {
  // TODO: Implementar PUT para actualizar solicitud
  return await api.put(`/solicitudes/${id}`, data);
};

export const deleteSolicitud = async (id) => {
  // TODO: Implementar DELETE para eliminar solicitud
  return await api.delete(`/solicitudes/${id}`);
};
