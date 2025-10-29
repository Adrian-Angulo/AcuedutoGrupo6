import { api } from "./api";

export const login = async (correo, cedula) => {
  try {
    // Obtener todos los usuarios
    const usuarios = await api.get("/usuarios");
    
    // Buscar usuario que coincida con correo y cédula
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.cc === cedula
    );
    
    if (usuario) {
      // Guardar usuario en localStorage
      localStorage.setItem("user", JSON.stringify(usuario));
      return { success: true, user: usuario };
    } else {
      return { success: false, message: "Correo o cédula incorrectos" };
    }
  } catch (error) {
    return { success: false, message: "Error al conectar con el servidor" };
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};
