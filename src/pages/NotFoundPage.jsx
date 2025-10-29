import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="p-6 bg-gray-50 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Página no encontrada
      </h2>
      <p className="text-gray-600 mb-6">
        La página que buscas no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
