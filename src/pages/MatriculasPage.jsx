import Buscador from '../components/ComponetesGrupo6/Buscador'




import HeaderPage from '../components/HeaderPage';
import Card from '../components/Card';
import Select from '../components/Select';
import Table from '../components/Table';
import 'preline/preline'



export default function MatriculasPage() {
  // TODO: Cargar matrículas desde la API usando getMatriculas()
  // TODO: Agregar formulario para crear nuevas matrículas
  // TODO: Implementar funciones de editar y eliminar

  /*  const [lista, setLista] = useState([]);
   const [busqueda, setBusqueda] = useState('');
   const [cargando, setCargando] = useState(true);
   const navigate = useNavigate();
 
  */

  /*   useEffect(() => {
      const cargar = async () => {
        try {
          setCargando(true)
          const datos = await getMatriculas();
          setLista(datos || []);
        } catch (error) {
          console.log('Error al cargar matricuas: ', error);
        } finally {
          setCargando(false)
        }
      };
      cargar();
    }, []); */

  // Filtrar la lista basándose en el término de búsqueda
  /*  const listaFiltrada = lista.filter((m) => {
     const termino = busqueda.toLowerCase().trim();
     if (!termino) return lista; // Si no hay búsqueda, mostrar todo
 
     return (
       m.cod_matricula.toLowerCase().includes(termino)
     );
   }); */




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

      <Table />
      




    </div>
  );
}
