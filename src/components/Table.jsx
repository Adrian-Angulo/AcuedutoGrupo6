
export default function Table() {
    return (
        <div class=" bg-gray-50 flex items-center ">
            <div class="w-full  bg-white shadow-lg rounded-2xl overflow-hidden">

                <div class="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Codigo Matricula</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Propietario</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Direccion</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            
                            <tr key="" className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-blue-600">MAT-2025-0001</td>
                                <td className="px-4 py-3 text-sm font-medium text-black">
                                    1080831081
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    Calle 123 #45-67
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    Activa
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    <button>X</button>
                                </td>

                            </tr>


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}