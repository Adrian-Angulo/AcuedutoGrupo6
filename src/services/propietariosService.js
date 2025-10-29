import { api } from "./api";

export const getPropietarios = async () => {
  // TODO: Implementar GET para listar propietarios
  return await api.get("/propietarios");
};

export const getPropietario = async (cc) => {
  // TODO: Implementar GET para obtener un propietario
  return await api.get(`/propietarios/${cc}`);
};

export const createPropietario = async (data) => {
  // TODO: Implementar POST para crear propietario
  return await api.post("/propietarios", data);
};

export const updatePropietario = async (cc, data) => {
  // TODO: Implementar PUT para actualizar propietario
  return await api.put(`/propietarios/${cc}`, data);
};

export const deletePropietario = async (cc) => {
  // TODO: Implementar DELETE para eliminar propietario
  return await api.delete(`/propietarios/${cc}`);
};
