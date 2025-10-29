export default function UsuariosPage() {
  // TODO: Cargar usuarios desde la API usando getUsuarios()
  // TODO: Agregar formulario para registrar nuevos usuarios
  // TODO: Implementar funciones de editar y eliminar

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Gestión de Usuarios
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
          Registrar Usuario
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <p className="text-gray-600 mb-4">
          Aquí se mostrará la lista de usuarios del sistema...
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <p className="text-sm text-gray-700 font-semibold mb-2">
            📋 Campos del módulo:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• CC (Cédula)</li>
            <li>• Nombre</li>
            <li>• Apellido</li>
            <li>• Teléfono</li>
            <li>• Correo</li>
            <li>• Fecha de Registro</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
