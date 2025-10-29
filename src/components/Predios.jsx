import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api';

function Predios() {
  const [predios, setPredios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    matricula: '',
    direccion: '',
    propietario: '',
    telefono: '',
    email: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPredios();
  }, []);

  const fetchPredios = async () => {
    try {
      const response = await fetch(`${API_URL}/predios`);
      const data = await response.json();
      setPredios(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/predios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Predio creado exitosamente');
        setFormData({
          matricula: '',
          direccion: '',
          propietario: '',
          telefono: '',
          email: ''
        });
        setShowForm(false);
        fetchPredios();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error al crear predio');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 p-6">
        <div className="bg-white rounded-lg p-6">
          <p className="text-center text-gray-500">Cargando predios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Predios</h2>
            <p className="text-gray-600">Gestión de predios y propiedades</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <span>{showForm ? '✕' : '+'}</span>
            <span>{showForm ? 'Cancelar' : 'Nuevo Predio'}</span>
          </button>
        </div>

        {message && (
          <div className={`p-4 mb-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        {showForm && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Nuevo Predio</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Matrícula
                </label>
                <input
                  type="text"
                  value={formData.matricula}
                  onChange={(e) => setFormData({...formData, matricula: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MAT-001"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Propietario
                </label>
                <input
                  type="text"
                  value={formData.propietario}
                  onChange={(e) => setFormData({...formData, propietario: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Calle 10 #20-30"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="3001234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium"
                >
                  Crear Predio
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-3">
          {predios.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏘️</div>
              <p className="text-gray-500 text-lg">No hay predios registrados</p>
              <p className="text-gray-400 text-sm mt-2">Haz clic en "Nuevo Predio" para agregar uno</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predios.map((predio) => (
                <div
                  key={predio.matricula}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 overflow-hidden group"
                >
                  {/* Header con matrícula */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-lg">
                        {predio.matricula || 'Sin matrícula'}
                      </span>
                      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-xl">
                        🏢
                      </div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-5">
                    {/* Dirección */}
                    <div className="mb-4">
                      <div className="flex items-start gap-2 mb-1">
                        <span className="text-gray-400 mt-1">📍</span>
                        <h3 className="font-semibold text-gray-900 text-base leading-tight">
                          {predio.direccion}
                        </h3>
                      </div>
                    </div>

                    {/* Propietario */}
                    {predio.propietario ? (
                      <div className="mb-3 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">👤</span>
                          <div>
                            <p className="text-xs text-gray-500">Propietario</p>
                            <p className="text-sm font-medium text-gray-700">
                              {predio.propietario}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-3 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">👤</span>
                          <div>
                            <p className="text-xs text-gray-500">Propietario</p>
                            <p className="text-sm text-gray-400 italic">
                              Sin asignar
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contacto */}
                    <div className="space-y-2">
                      {(predio.telefono || predio.telefono_propietario) && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-400">📞</span>
                          <a 
                            href={`tel:${predio.telefono || predio.telefono_propietario}`}
                            className="text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            {predio.telefono || predio.telefono_propietario}
                          </a>
                        </div>
                      )}
                      {(predio.email || predio.email_propietario) && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-400">✉️</span>
                          <a 
                            href={`mailto:${predio.email || predio.email_propietario}`}
                            className="text-blue-600 hover:text-blue-700 hover:underline truncate"
                          >
                            {predio.email || predio.email_propietario}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Footer con fecha */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <span>🗓️</span>
                        Registrado: {new Date(predio.fecha_registro).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Hover effect indicator */}
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Estadísticas */}
        {predios.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{predios.length}</p>
                <p className="text-sm text-gray-600">Total Predios</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-600">
                  {predios.filter(p => p.matricula).length}
                </p>
                <p className="text-sm text-gray-600">Con Matrícula</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {predios.filter(p => p.email).length}
                </p>
                <p className="text-sm text-gray-600">Con Email</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Predios;
