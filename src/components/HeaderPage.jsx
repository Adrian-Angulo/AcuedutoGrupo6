import Button from "./Button";

export default function HeaderPage({ titulo }) {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-600">
                {titulo}
            </h1>
            <Button description="Agregar Matricula" onClick={() => alert('Botón clickeado!')} />
        </div>
    );
}