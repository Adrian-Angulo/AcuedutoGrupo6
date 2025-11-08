import Buscador from '../components/ComponetesGrupo6/Buscador'
import HeaderPage from '../components/HeaderPage';
import Card from '../components/Card';

import Table from '../components/Table';
/* import Button from "../components/Button"; */
import { useState, useEffect } from 'react';
import { getMatriculas } from '../services/matriculasService';
import { listaFiltrada } from '../components/ComponetesGrupo6/lib/formatters';
import ModalComponent from '../components/ModalComponent';
import { Button } from 'flowbite-react';




export default function MatriculasPage() {

  const [listaMatriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [criterio, setCriterio] = useState('');
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  

  const cargar = async () => {
    try {
      setLoading(true)
      setError('');
      if(!navigator.onLine){
        throw new Error('offline');
      }
      const datos = await getMatriculas();
      setMatriculas(datos || []);
    } catch (error) {
      console.log('Error al cargar matricuas: ', error);
      if (error.message === 'offline') {
        setError('No hay conexión a internet. Por favor, verifica tu conexión e intenta de nuevo.');
      } else {
        setError('Error al cargar las matrículas. Por favor, intenta de nuevo más tarde.');
      }
    } finally {
      setLoading(false)
    }
  };

  
  useEffect(() => {
    cargar();
  }, []);



  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <HeaderPage titulo="Matriculas" />
      <Card >
        {/* <Button description="Agregar Matricula" onClick={() => alert('Botón clickeado!')} /> */}
        
        <Buscador placeholder="Buscar matrícula..." onChange={(e) => setCriterio(e.target.value)} />
      </Card>
      

       {/* 🔄 Spinner mientras carga */}
      {
        loading && (
          <div className="p-6 bg-gray-50 min-h-screen flex  justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando Matriculas...</p>
          </div>
        </div>
        )
      }

      {/* ⚠️ Mensaje de error si no hay conexión */}
      {!loading && error && (
        <div className="flex justify-center bg-red-100 text-red-700 border border-red-400 rounded-lg p-4 mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && ( <Table matriculas={listaFiltrada(criterio, listaMatriculas)}  setOpenModal={setOpenModal}  />)}
      <ModalComponent openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
