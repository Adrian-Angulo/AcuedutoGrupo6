import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api';

function ReporteForm({ onSuccess }) {
  const [busqueda, setBusqueda] = useState('');
  const [solicitud, setSolicitud] = useState(null);
  const [matriculas, setMatriculas] = useState([]);
  const [showMatriculasDropdown, setShowMatriculasDropdown] = useState(false);
  const [formData, setFormData] = useState({
    codigo_solicitud: '',
    cedula_fontanero: '',
    descripcion_trabajo: '',
    materiales_usados: '',
    costo: '',
    estado_final: 'completado',
    observaciones_finales: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMatriculas();
  }, []);

  const fetchMatriculas = async () => {
    try {
      const response = await fetch(`${API_URL}/predios/matriculas/lista`);
      const data = await response.json();
      setMatriculas(data);
    } catch (error) {
      console.error('Error al cargar matrículas:', error);
    }
  };
//mysql://root:dWMnGugGVHxwJkUaxDACMCcqytWJCyTM@shortline.proxy.rlwy.net:48485/railway
  const buscarSolicitud = async () => {
    if (!busqueda) return;
    try {
      const response = await fetch(`${API_URL}/solicitudes/buscar/${busqueda}`);
      const data = await response.json();
      if (data.length > 0) {
        setSolicitud(data[0]);
        setFormData({ ...formData, codigo_solicitud: data[0].codigo_solicitud });
        setMessage('');
      } else {
        setSolicitud(null);
        setMessage('No se encontró la solicitud');
      }
    } catch (error) {
      setMessage('Error al buscar solicitud');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/reportes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Reporte registrado exitosamente');
        setBusqueda('');
        setSolicitud(null);
        setFormData({
          codigo_solicitud: '',
          cedula_fontanero: '',
          descripcion_trabajo: '',
          materiales_usados: '',
          costo: '',
          estado_final: 'completado',
          observaciones_finales: ''
        });
        if (onSuccess) {
          setTimeout(() => onSuccess(), 1500);
        }
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error al registrar reporte');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Registrar Reporte de Mantenimiento</h2>

      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="mb-6" style={{ position: 'relative' }}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Buscar por Código, Matrícula o Cédula
        </label>
        <div className="flex gap-2">
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onFocus={() => setShowMatriculasDropdown(true)}
              placeholder="Ingrese código de solicitud, matrícula o cédula"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {showMatriculasDropdown && busqueda.length === 0 && matriculas.length > 0 && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  maxHeight: '250px',
                  overflowY: 'auto',
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  zIndex: 1000,
                  marginTop: '4px'
                }}
              >
                <div style={{ 
                  padding: '8px 12px', 
                  backgroundColor: '#f8f9fa', 
                  borderBottom: '1px solid #ddd',
                  fontWeight: 'bold',
                  fontSize: '0.9em',
                  color: '#495057'
                }}>
                  Seleccionar Matrícula
                </div>
                {matriculas.map((mat) => (
                  <div
                    key={mat.matricula}
                    onClick={() => {
                      setBusqueda(mat.matricula);
                      setShowMatriculasDropdown(false);
                    }}
                    style={{
                      padding: '10px 12px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    <div style={{ fontWeight: 'bold', color: '#2563eb' }}>{mat.matricula}</div>
                    <div style={{ fontSize: '0.85em', color: '#666', marginTop: '2px' }}>
                      📍 {mat.direccion}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showMatriculasDropdown && (
              <div 
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 999
                }}
                onClick={() => setShowMatriculasDropdown(false)}
              />
            )}
          </div>
          
          <button
            onClick={buscarSolicitud}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Buscar
          </button>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          💡 Haz clic en el campo para ver todas las matrículas disponibles
        </div>
      </div>

      {solicitud && (
        <div className="bg-yellow-50 p-4 rounded-md mb-6">
          <h3 className="font-semibold text-yellow-900 mb-2">Solicitud Encontrada</h3>
          <p><strong>Código:</strong> {solicitud.codigo_solicitud}</p>
          <p><strong>Matrícula:</strong> {solicitud.matricula}</p>
          <p><strong>Dirección:</strong> {solicitud.direccion}</p>
          <p><strong>Tipo:</strong> {solicitud.tipo_nombre}</p>
          <p><strong>Estado:</strong> {solicitud.estado}</p>
          <p><strong>Observaciones:</strong> {solicitud.observaciones}</p>
        </div>
      )}

      {solicitud && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cédula del Fontanero
            </label>
            <input
              type="text"
              value={formData.cedula_fontanero}
              onChange={(e) => setFormData({ ...formData, cedula_fontanero: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción del Trabajo Realizado
            </label>
            <textarea
              value={formData.descripcion_trabajo}
              onChange={(e) => setFormData({ ...formData, descripcion_trabajo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Materiales Usados
            </label>
            <textarea
              value={formData.materiales_usados}
              onChange={(e) => setFormData({ ...formData, materiales_usados: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Costo
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.costo}
              onChange={(e) => setFormData({ ...formData, costo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado Final
            </label>
            <select
              value={formData.estado_final}
              onChange={(e) => setFormData({ ...formData, estado_final: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="completado">Completado</option>
              <option value="requiere_seguimiento">Requiere Seguimiento</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones Finales
            </label>
            <textarea
              value={formData.observaciones_finales}
              onChange={(e) => setFormData({ ...formData, observaciones_finales: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 font-medium"
          >
            Registrar Reporte
          </button>
        </form>
      )}
    </div>
  );
}

export default ReporteForm;
