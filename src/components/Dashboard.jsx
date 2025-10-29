import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api';

function Dashboard({ onNuevaSolicitud }) {
  const [stats, setStats] = useState({
    solicitadas: 0,
    asignadas: 0,
    atendidas: 0,
    requiere_seguimiento: 0
  });
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/solicitudes`);
      const data = await response.json();
      setSolicitudes(data.slice(0, 5));
      
      // Calcular estadísticas
      const stats = {
        solicitadas: data.filter(s => s.estado === 'pendiente').length,
        asignadas: data.filter(s => s.estado === 'en_proceso').length,
        atendidas: data.filter(s => s.estado === 'completado').length,
        requiere_seguimiento: data.filter(s => s.prioridad === 'urgente' && s.estado !== 'completado').length
      };
      setStats(stats);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          </div>
          <button
            onClick={onNuevaSolicitud}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <span>+</span>
            <span>Nueva Solicitud</span>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Solicitadas"
            value={stats.solicitadas}
            icon={<span className="text-2xl">📄</span>}
            color="bg-blue-100"
          />
          <StatCard
            title="Asignadas"
            value={stats.asignadas}
            icon={<span className="text-2xl">⏰</span>}
            color="bg-yellow-100"
          />
          <StatCard
            title="Atendidas"
            value={stats.atendidas}
            icon={<span className="text-2xl">✅</span>}
            color="bg-green-100"
          />
          <StatCard
            title="Requiere Seguimiento"
            value={stats.requiere_seguimiento}
            icon={<span className="text-2xl">⚠️</span>}
            color="bg-red-100"
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Últimas Solicitudes</h3>
          {solicitudes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hay solicitudes recientes</p>
          ) : (
            <div className="space-y-3">
              {solicitudes.map((solicitud) => (
                <div
                  key={solicitud.codigo_solicitud}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{solicitud.codigo_solicitud}</p>
                    <p className="text-sm text-gray-600">{solicitud.tipo_nombre}</p>
                    <p className="text-xs text-gray-500">{solicitud.direccion}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      solicitud.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      solicitud.estado === 'en_proceso' ? 'bg-blue-100 text-blue-800' :
                      solicitud.estado === 'completado' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {solicitud.estado}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(solicitud.fecha_solicitud).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
