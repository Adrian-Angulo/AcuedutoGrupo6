import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api';

function ReportesList() {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [reportesFiltrados, setReportesFiltrados] = useState([]);
  const [selectedReporte, setSelectedReporte] = useState(null);

  useEffect(() => {
    fetchReportes();
  }, []);

  useEffect(() => {
    if (busqueda.trim() === '') {
      setReportesFiltrados(reportes);
    } else {
      const filtrados = reportes.filter(reporte => 
        reporte.codigo_solicitud.toLowerCase().includes(busqueda.toLowerCase()) ||
        reporte.matricula.toLowerCase().includes(busqueda.toLowerCase()) ||
        (reporte.fontanero_nombre && reporte.fontanero_nombre.toLowerCase().includes(busqueda.toLowerCase())) ||
        (reporte.cedula_fontanero && reporte.cedula_fontanero.includes(busqueda))
      );
      setReportesFiltrados(filtrados);
    }
  }, [busqueda, reportes]);

  const fetchReportes = async () => {
    try {
      const response = await fetch(`${API_URL}/reportes`);
      const data = await response.json();
      setReportes(data);
      setReportesFiltrados(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const getEstadoColor = (estado) => {
    return estado === 'completado' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-orange-100 text-orange-800';
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 p-6">
        <div className="bg-white rounded-lg p-6">
          <p className="text-center text-gray-500">Cargando reportes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="bg-white rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reportes de Mantenimiento</h2>
          <p className="text-gray-600">Buscar y consultar reportes realizados</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar por Código, Matrícula o Cédula del Fontanero
          </label>
          <div className="relative">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Ingrese código de solicitud, matrícula o cédula..."
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-3.5 text-gray-400 text-lg">🔍</span>
          </div>
        </div>

        {reportesFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">
              {busqueda ? 'No se encontraron reportes' : 'No hay reportes registrados'}
            </p>
            {busqueda && (
              <button
                onClick={() => setBusqueda('')}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Mostrando {reportesFiltrados.length} de {reportes.length} reportes
            </div>
            
            <div className="space-y-4">
              {reportesFiltrados.map((reporte) => (
                <div
                  key={reporte.id_reporte}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div 
                    className="p-5 bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedReporte(selectedReporte === reporte.id_reporte ? null : reporte.id_reporte)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {reporte.codigo_solicitud}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(reporte.estado_final)}`}>
                            {reporte.estado_final === 'completado' ? '✓ Completado' : '⚠ Requiere Seguimiento'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">
                              📍 Matrícula: <span className="font-medium text-gray-900">{reporte.matricula}</span>
                            </p>
                            <p className="text-gray-600">
                              🔧 Fontanero: <span className="font-medium text-gray-900">
                                {reporte.fontanero_nombre && reporte.fontanero_apellido 
                                  ? `${reporte.fontanero_nombre} ${reporte.fontanero_apellido}`
                                  : reporte.cedula_fontanero || 'No asignado'}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">
                              📅 Fecha: <span className="font-medium text-gray-900">
                                {new Date(reporte.fecha_realizacion).toLocaleString()}
                              </span>
                            </p>
                            {reporte.costo && (
                              <p className="text-gray-600">
                                💰 Costo: <span className="font-medium text-gray-900">
                                  ${parseFloat(reporte.costo).toLocaleString()}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <button className="text-gray-400 hover:text-gray-600">
                        {selectedReporte === reporte.id_reporte ? '▲' : '▼'}
                      </button>
                    </div>
                  </div>

                  {selectedReporte === reporte.id_reporte && (
                    <div className="p-5 bg-white border-t border-gray-200">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Descripción del Trabajo Realizado</h4>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded">
                            {reporte.descripcion_trabajo}
                          </p>
                        </div>

                        {reporte.materiales_usados && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Materiales Usados</h4>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded">
                              {reporte.materiales_usados}
                            </p>
                          </div>
                        )}

                        {reporte.observaciones_finales && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Observaciones Finales</h4>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded">
                              {reporte.observaciones_finales}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <span className="text-sm text-gray-500">
                            ID Reporte: #{reporte.id_reporte}
                          </span>
                          {reporte.costo && (
                            <span className="text-lg font-bold text-green-600">
                              Total: ${parseFloat(reporte.costo).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ReportesList;
