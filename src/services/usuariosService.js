import { api } from "./api";

export const getUsuarios = async () => {
  // TODO: Implementar GET para listar usuarios
  return await api.get("/usuarios");
};

export const getUsuario = async (cc) => {
  // TODO: Implementar GET para obtener un usuario
  return await api.get(`/usuarios/${cc}`);
};

export const createUsuario = async (data) => {
  // TODO: Implementar POST para crear usuario
  return await api.post("/usuarios", data);
};

export const updateUsuario = async (cc, data) => {
  // TODO: Implementar PUT para actualizar usuario
  return await api.put(`/usuarios/${cc}`, data);
};

export const deleteUsuario = async (cc) => {
  // TODO: Implementar DELETE para eliminar usuario
  return await api.delete(`/usuarios/${cc}`);
};
