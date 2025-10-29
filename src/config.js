// Configuración del API
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://tu-backend.onrender.com/api'  // Cambia esto por tu URL de Render
    : 'http://localhost:3001/api');

export default API_URL;
