import { useState, useEffect } from 'react';

const API_URL = 'https://acueducto-2.onrender.com/api';

function SolicitudesList() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const response = await fetch(`${API_URL}/solicitudes`);
      const data = await response.json();
      setSolicitudes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const getEstadoColor = (estado) => {
    const colors = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      en_proceso: 'bg-blue-100 text-blue-800',
      completado: 'bg-green-100 text-green-800',
      cancelado: 'bg-red-100 text-red-800'
    };
    return colors[estado] || 'bg-gray-100 text-gray-800';
  };

  const getPrioridadColor = (prioridad) => {
    const colors = {
      baja: 'bg-gray-100 text-gray-800',
      media: 'bg-blue-100 text-blue-800',
      alta: 'bg-orange-100 text-orange-800',
      urgente: 'bg-red-100 text-red-800'
    };
    return colors[prioridad] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="text-center py-8">Cargando solicitudes...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Solicitudes de Mantenimiento</h2>
      
      {solicitudes.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No hay solicitudes registradas</p>
      ) : (
        <div className="space-y-4">
          {solicitudes.map((solicitud) => (
            <div key={solicitud.codigo_solicitud} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{solicitud.codigo_solicitud}</h3>
                  <p className="text-sm text-gray-600">{solicitud.tipo_nombre}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(solicitud.estado)}`}>
                    {solicitud.estado}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPrioridadColor(solicitud.prioridad)}`}>
                    {solicitud.prioridad}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Matrícula: <span className="font-medium text-gray-900">{solicitud.matricula}</span></p>
                  <p className="text-gray-600">Dirección: <span className="font-medium text-gray-900">{solicitud.direccion}</span></p>
                  <p className="text-gray-600">Propietario: <span className="font-medium text-gray-900">{solicitud.propietario}</span></p>
                </div>
                <div>
                  <p className="text-gray-600">Fecha: <span className="font-medium text-gray-900">{new Date(solicitud.fecha_solicitud).toLocaleString()}</span></p>
                  <p className="text-gray-600">Solicitante: <span className="font-medium text-gray-900">{solicitud.cedula_solicitante}</span></p>
                </div>
              </div>
              
              {solicitud.observaciones && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600"><strong>Observaciones:</strong> {solicitud.observaciones}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SolicitudesList;
