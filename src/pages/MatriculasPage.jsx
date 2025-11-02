import Buscador from '../components/ComponetesGrupo6/Buscador'
import { MapPin, Calendar, Home } from "lucide-react";
import CardMatricula from "../components/ComponetesGrupo6/CardMatriculas";
export default function MatriculasPage() {
  // TODO: Cargar matrículas desde la API usando getMatriculas()
  // TODO: Agregar formulario para crear nuevas matrículas
  // TODO: Implementar funciones de editar y eliminar
  const matriculas = [
    {
      "cod_matricula": "M002",
      "id_predio": 2,
      "estado": "Activa",
      "fecha": "2025-03-11",
      "predio": {
        "id": 2,
        "tipo": "Comercial",
        "correo": "maria@correo.com",
        "telefono": "3126549870",
        "direccion": "Av. Central 89",
        "propietario": {
          "cc": "2002",
          "correo": "maria@correo.com",
          "nombre": "María",
          "apellido": "López",
          "telefono": "3126549870"
        }
      }
    },
    {
      "cod_matricula": "M001",
      "id_predio": 1,
      "estado": "Activa",
      "fecha": "2025-03-06",
      "predio": {
        "id": 1,
        "tipo": "Residencial",
        "correo": "carlos@correo.com",
        "telefono": "3174567890",
        "direccion": "Calle 12 #4-56",
        "propietario": {
          "cc": "2001",
          "correo": "carlos@correo.com",
          "nombre": "Carlos",
          "apellido": "Muñoz",
          "telefono": "3174567890"
        }
      }
    },
    {
      "cod_matricula": "M001",
      "id_predio": 1,
      "estado": "Activa",
      "fecha": "2025-03-06",
      "predio": {
        "id": 1,
        "tipo": "Residencial",
        "correo": "carlos@correo.com",
        "telefono": "3174567890",
        "direccion": "Calle 12 #4-56",
        "propietario": {
          "cc": "2001",
          "correo": "carlos@correo.com",
          "nombre": "Carlos",
          "apellido": "Muñoz",
          "telefono": "3174567890"
        }
      }
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Gestión de Matrículas
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
          Nueva Matrícula
        </button>
      </div>
      <div>



        <Buscador placeholder={"Buscar por cedula o Matricula"} />

        {matriculas.map((m) =>
          <div className="mb-4 bg-white-50 border border-blue-200 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-blue-900">MAT-2020-1001 {m.cod_matricula}</h2>
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                Activa
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-700 mb-3">
              <div className="flex items-center gap-2">
                <MapPin className='text-blue-600'  />
                <span>Calle 45 #23-67, Barrio Centro</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className='text-blue-600' />
                <span>Creada: 14 de marzo de 2020</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className='text-blue-600' />
                <span>Residencial - Estrato 3</span>
              </div>
            </div>

            <p className="text-xs text-blue-600 font-medium">Toca para ver detalles completos</p>
          </div>


        )}



      </div>
    </div>
  );
}
