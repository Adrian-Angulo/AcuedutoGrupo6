import Buscador from '../components/ComponetesGrupo6/Buscador'
import { useState, useEffect } from 'react';
import { MapPin, Calendar, Home } from "lucide-react";
import { getMatriculas, getMatricula, createMatricula, updateMatricula, deleteMatricula} from '../services/matriculasService'
import CardMatricula from "../components/ComponetesGrupo6/CardMatriculas";
export default function MatriculasPage() {
  // TODO: Cargar matrículas desde la API usando getMatriculas()
  // TODO: Agregar formulario para crear nuevas matrículas
  // TODO: Implementar funciones de editar y eliminar

  const [lista, setLista] = useState([]);
  

  useEffect(() => {
    const cargar = async () => {
      const datos = await getMatriculas();
      setLista(datos);
    };
    cargar();
  }, []);



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

        {lista.map((m) =>
          <div className="mb-4 bg-white-50 border border-blue-200 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-blue-900">{m.cod_matricula}</h2>
              {m.estado =="Activa" ? <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                {m.estado}
              </span>: <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                {m.estado}
              </span>}
              
            </div>

            <div className="space-y-1 text-sm text-gray-700 mb-3">
              <div className="flex items-center gap-2">
                <MapPin className='text-blue-600'  />
                <span>{m.predio.direccion}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className='text-blue-600' />
                <span>Creada: {m.fecha}</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className='text-blue-600' />
                <span>{m.predio.tipo}</span>
              </div>
            </div>

            <p className="text-xs text-blue-600 font-medium">Toca para ver detalles completos</p>
          </div>

        )}



      </div>
    </div>
  );
}
