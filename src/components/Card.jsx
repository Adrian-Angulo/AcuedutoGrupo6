export default function Card({children}) {
    return (
        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex flex-col gap-4 justify-center">
                {children}
            </div>
        </div>
    );
}