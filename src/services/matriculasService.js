import { api } from "./api";

export const getMatriculas = async () => {
  // TODO: Implementar GET para listar matrículas
  return await api.get("/matriculas");
};

export const getMatricula = async (cod) => {
  // TODO: Implementar GET para obtener una matrícula
  return await api.get(`/matriculas/${cod}`);
};

export const createMatricula = async (data) => {
  // TODO: Implementar POST para crear matrícula
  return await api.post("/matriculas", data);
};

export const updateMatricula = async (cod, data) => {
  // TODO: Implementar PUT para actualizar matrícula
  return await api.put(`/matriculas/${cod}`, data);
};

export const deleteMatricula = async (cod) => {
  // TODO: Implementar DELETE para eliminar matrícula
  return await api.delete(`/matriculas/${cod}`);
};
