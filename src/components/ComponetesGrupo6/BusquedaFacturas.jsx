import { Search } from "lucide-react";

// Componente de búsqueda de facturas por matrícula o cédula
export default function BusquedaFacturas({ busqueda, setBusqueda, errorBusqueda, setErrorBusqueda }) {
  
    const handleChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    // Validación cédula 10 dígitos
    if (/^\d+$/.test(valor)) {
      if (valor.length !== 10 && valor.length > 0) {
        setErrorBusqueda("La cédula debe tener 10 dígitos");
      } else {
        setErrorBusqueda("");
      }
    }
    // Validación formato matrícula MAT-XXXX-XXXX
    else if (valor.length > 0) {
      const formatoMatricula = /^MAT-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;
      if (!formatoMatricula.test(valor)) {
        setErrorBusqueda("Formato de matrícula inválido. Use MAT-XXXX-XXXX");
      } else {
        setErrorBusqueda("");
      }
    } else {
      setErrorBusqueda("");
    }
  };

  return (
    <div className="flex w-1/3 ml-auto flex-col">
      <div className="flex h-12 text-sm text-gray-700 border border-blue-300 rounded-lg shadow-sm placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-blue-500 transition">
        <div className="text-blue-700 px-3 py-3">
          <Search />
        </div>
        <input
          className="w-full pl-2 h-12 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none transition"
          type="text"
          value={busqueda}
          onChange={handleChange}
          placeholder="Buscar por matrícula o cédula del propietario"
        />
      </div>

      {errorBusqueda && (
        <div className="mt-1 text-red-600 text-xs bg-red-50 border border-red-200 rounded px-3 py-1">
          {errorBusqueda}
        </div>
      )}
    </div>
  );
}
