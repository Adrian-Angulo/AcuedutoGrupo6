import Buscador from '../components/ComponetesGrupo6/Buscador'
import HeaderPage from '../components/HeaderPage';
import Card from '../components/Card';
import Select from '../components/Select';
import Table from '../components/Table';

import { useState, useEffect } from 'react';
import { getMatriculas } from '../services/matriculasService';



export default function MatriculasPage() {

  const [listaMatriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true)
        const datos = await getMatriculas();
        setMatriculas(datos || []);
      } catch (error) {
        console.log('Error al cargar matricuas: ', error);
      } finally {
        setLoading(false)
      }
    };
    cargar();
  }, []);

  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <HeaderPage titulo="Matrículas" />
      <Card >
        <Select>
          <option value="">Todos</option>
          <option value="activa">Activa</option>
          <option value="suspendida">Suspendida</option>
          <option value="cancelada">Cancelada</option>
          <option value="en_mora">En mora</option>
        </Select>
        <Buscador placeholder="Buscar matrícula..." />
      </Card>

      {loading ? (
        <div className="p-6 bg-gray-50 min-h-screen flex  justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando facturas...</p>
          </div>
        </div>
      ) : (
        <Table matriculas={listaMatriculas} />
      )}




    </div>
  );
}
