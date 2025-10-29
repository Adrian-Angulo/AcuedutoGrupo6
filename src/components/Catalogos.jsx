import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api';

function Catalogos() {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTipos();
  }, []);

  const fetchTipos = async () => {
    try {
      const response = await fetch(`${API_URL}/tipos-mantenimiento`);
      const data = await response.json();
      setTipos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/tipos-mantenimiento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Tipo de mantenimiento creado exitosamente');
        setFormData({
          nombre: '',
          descripcion: ''
        });
        setShowForm(false);
        fetchTipos();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error al crear tipo de mantenimiento');
    }
  };

  const getIconoTipo = (nombre) => {
    const iconos = {
      'Reparación de fuga': '💧',
      'Instalación de tubería': '🔧',
      'Mantenimiento preventivo': '🛠️',
      'Cambio de válvulas': '⚙️',
      'Limpieza de tanques': '🧹',
      'Destape de tuberías': '🚰'
    };
    return iconos[nombre] || '🔨';
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 p-6">
        <div className="bg-white rounded-lg p-6">
          <p className="text-center text-gray-500">Cargando tipos de mantenimiento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Catálogos</h2>
            <p className="text-gray-600">Gestión de tipos de mantenimiento</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <span>{showForm ? '✕' : '+'}</span>
            <span>{showForm ? 'Cancelar' : 'Nuevo Tipo'}</span>
          </button>
        </div>

        {message && (
          <div className={`p-4 mb-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        {showForm && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Nuevo Tipo de Mantenimiento</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Tipo
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Reparación de fuga"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Descripción detallada del tipo de mantenimiento"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium"
              >
                Crear Tipo de Mantenimiento
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tipos.length === 0 ? (
            <div className="col-span-full">
              <p className="text-gray-500 text-center py-8">No hay tipos de mantenimiento registrados</p>
            </div>
          ) : (
            tipos.map((tipo) => (
              <div
                key={tipo.id_tipo}
                className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {getIconoTipo(tipo.nombre)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {tipo.nombre}
                    </h3>
                    {tipo.descripcion && (
                      <p className="text-sm text-gray-600 mb-2">
                        {tipo.descripcion}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tipo.activo 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tipo.activo ? '✓ Activo' : 'Inactivo'}
                      </span>
                      <span className="text-xs text-gray-500">
                        ID: {tipo.id_tipo}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {tipos.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <span className="text-lg">ℹ️</span>
              <p>
                <strong>Total de tipos:</strong> {tipos.length} tipos de mantenimiento disponibles
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalogos;
