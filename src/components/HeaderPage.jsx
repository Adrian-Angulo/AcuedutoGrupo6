

export default function HeaderPage({ titulo }) {
    return (
        <div className="flex flex-col justify-center items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-600">
                {titulo}
            </h1>
            <p className="text-center px-20 py-5">
                Bienvenido al sistema de consulta de matriuclas.  
                 Aquí podrás buscar tus matriculas usando tu cédula o el      
                 código de matricula y podras ver mas detalles de la que elijas.
            </p>

        </div>
    );
}