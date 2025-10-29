export default function FacturasPage() {
  // TODO: Cargar facturas desde la API usando getFacturas()
  // TODO: Agregar formulario para crear nuevas facturas
  // TODO: Implementar funciones de editar y eliminar

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Gestión de Facturas
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
          Nueva Factura
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <p className="text-gray-600 mb-4">
          Aquí se mostrará la lista de facturas...
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <p className="text-sm text-gray-700 font-semibold mb-2">
            📋 Campos del módulo:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• ID (autogenerado)</li>
            <li>• Código Matrícula</li>
            <li>• Fecha Creación</li>
            <li>• Fecha Vencimiento</li>
            <li>• Valor</li>
            <li>• Estado (Pendiente, Pagada, Vencida)</li>
            <li>• URL (PDF)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
