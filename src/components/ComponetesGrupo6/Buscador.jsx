import Button from "./Button";

const Buscador = ({placeholder }) => {
    return (    
            
                 <input
                    type="text"
                    placeholder={placeholder}
                    className="w-1/3 h-12 ml-auto px-4 text-sm text-gray-700 border border-blue-300 rounded-lg shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
    );

}

export default Buscador;