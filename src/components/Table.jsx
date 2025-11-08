import { getEstadoColor } from '../components/ComponetesGrupo6/lib/formatters';
import ModalComponent from './ModalComponent';


export default function Table({ matriculas = [], setOpenModal}) {

    let i = 1;
    return (
        <div className="bg-gray-50 flex items-center justify-center">
            <div className="w-full bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                {["ID","CODIGO MATRICULA","CEDULA", "PROPIETARIO",  "PREDIO", "ESTADO", "ACCIONES"].map((title) => (
                                    <th
                                        key={title}
                                        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        {title}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                            matriculas.length > 0 ? (
                                matriculas.map((matricula) => (
                                    <tr key={matricula.cod_matricula} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-sm  font-medium">
                                            {i++}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-blue-600 font-medium">
                                            {matricula.cod_matricula}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-800">
                                            {matricula.predio?.propietario?.nombre +" "+ matricula.predio?.propietario?.apellido || "Sin datos"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-800">
                                            {matricula.predio?.propietario?.cc || "Sin datos"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            {matricula.predio?.direccion || "No registrada"}
                                        </td>
                                        <td
                                            className="px-4 py-3"
                                        >
                                            <span className={`px-2 py-1 text-xs font-medium rounded ${getEstadoColor(matricula.estado)}`}>
                                                 {matricula.estado}
                                            </span>
                                           
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <button
                                            onClick={()=> setOpenModal(true) }
                                            className="text-blue-600 rounded  font-semibold bg-blue-200  hover:bg-blue-300 px-3 py-1">
                                                Ver Detalles
                                            </button>
                                        </td>
                                        
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-4 py-6 text-center text-sm text-gray-500">
                                        No hay matrículas disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
