import Buscador from '../components/ComponetesGrupo6/Buscador'
import HeaderPage from '../components/HeaderPage';
import Card from '../components/Card';
import Select from '../components/Select';
import Table from '../components/Table';




export default function MatriculasPage() {



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
