import { useState, useEffect } from 'react';
import MatriculaSelector from './MatriculaSelector';

const API_URL = 'http://localhost:3001/api';

function SolicitudForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    matricula: '',
    id_tipo: '',
    cedula_solicitante: '',
    observaciones: '',
    prioridad: 'media'
  });
  const [predioInfo, setPredioInfo] = useState(null);
  const [tiposMantenimiento, setTiposMantenimiento] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTiposMantenimiento();
  }, []);

  const fetchTiposMantenimiento = async () => {
    try {
      const response = await fetch(`${API_URL}/tipos-mantenimiento`);
      const data = await response.json();
      setTiposMantenimiento(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const buscarPredio = async () => {
    if (!formData.matricula) return;
    try {
      const response = await fetch(`${API_URL}/predios/${formData.matricula}`);
      if (response.ok) {
        const data = await response.json();
        setPredioInfo(data);
      } else {
        setPredioInfo(null);
        setMessage('Predio no encontrado');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/solicitudes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Solicitud creada: ${data.codigo_solicitud}`);
        setFormData({
          matricula: '',
          id_tipo: '',
          cedula_solicitante: '',
          observaciones: '',
          prioridad: 'media'
        });
        setPredioInfo(null);
        if (onSuccess) {
          setTimeout(() => onSuccess(), 1500);
        }
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error al crear solicitud');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Nueva Solicitud de Mantenimiento</h2>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <MatriculaSelector
            value={formData.matricula}
            onChange={(matricula) => {
              setFormData({...formData, matricula});
              // Buscar automáticamente cuando se selecciona
              setTimeout(() => {
                fetch(`${API_URL}/predios/${matricula}`)
                  .then(res => res.json())
                  .then(data => setPredioInfo(data))
                  .catch(() => setPredioInfo(null));
              }, 100);
            }}
            label="Número de Matrícula"
          />
        </div>

        {predioInfo && (
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-semibold text-blue-900 mb-2">Información del Predio</h3>
            <p><strong>Dirección:</strong> {predioInfo.direccion}</p>
            <p><strong>Propietario:</strong> {predioInfo.propietario}</p>
            <p><strong>Teléfono:</strong> {predioInfo.telefono}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Mantenimiento
          </label>
          <select
            value={formData.id_tipo}
            onChange={(e) => setFormData({...formData, id_tipo: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccione un tipo</option>
            {tiposMantenimiento.map(tipo => (
              <option key={tipo.id_tipo} value={tipo.id_tipo}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cédula del Solicitante
          </label>
          <input
            type="text"
            value={formData.cedula_solicitante}
            onChange={(e) => setFormData({...formData, cedula_solicitante: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prioridad
          </label>
          <select
            value={formData.prioridad}
            onChange={(e) => setFormData({...formData, prioridad: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Observaciones
          </label>
          <textarea
            value={formData.observaciones}
            onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium"
        >
          Crear Solicitud
        </button>
      </form>
    </div>
  );
}

export default SolicitudForm;
