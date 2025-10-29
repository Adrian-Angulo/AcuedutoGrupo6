export default function HomePage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Bienvenido al Sistema de Acueducto
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <div className="text-4xl mb-3">🏘️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Predios</h2>
          <p className="text-gray-600">
            Gestiona las propiedades registradas en el sistema
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <div className="text-4xl mb-3">👥</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Usuarios</h2>
          <p className="text-gray-600">
            Administra los usuarios del sistema
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <div className="text-4xl mb-3">📋</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Matrículas</h2>
          <p className="text-gray-600">
            Gestiona las matrículas de los predios
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <div className="text-4xl mb-3">🔧</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Mantenimientos</h2>
          <p className="text-gray-600">
            Catálogo de tipos de mantenimiento
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <div className="text-4xl mb-3">📝</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Solicitudes</h2>
          <p className="text-gray-600">
            Gestiona solicitudes de mantenimiento
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <div className="text-4xl mb-3">💰</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Facturas</h2>
          <p className="text-gray-600">
            Administra la facturación del servicio
          </p>
        </div>
      </div>
    </div>
  );
}
