import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

export default function Menu({config}) {
    const [colorPrimario, setColorPrimario] = useState(config.primaryColor);
    const [colorSecundario, setColorSecundario] = useState(config.secondaryColor);
    const [titulo, setTitulo] = useState(config.title);
    const [descripcion, setDescripcion] = useState(config.descripcion);

    useEffect(() => {
        console.log(config);
        setColorPrimario(config.primaryColor);
        setColorSecundario(config.secondaryColor);
        setTitulo(config.title);
        setDescripcion(config.descripcion);
    }, [config]);
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const items = [
        { name: "Inmuebles", bgColor: "bg-blue-500" },
        { name: "Asesores", bgColor: "bg-green-500" },
        { name: "Configuración", bgColor: "bg-red-500" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-blue-100">
            {/* Header */}
            <header style={{backgroundColor: colorPrimario}} className={`py-4 shadow-md flex justify-between items-center px-6`}>
                <h1 className="text-lg font-semibold hidden md:block">{titulo}</h1>
                <div className="hidden md:flex space-x-6">
                    {items.map((item, index) => (
                        <a key={index} href={`/${item.name.replaceAll("ó", "o")}`} className="text-lg font-semibold hover:underline">
                            {item.name}
                        </a>
                    ))}
                </div>
                {/* Mobile Menu Icon */}
                <button 
                    className="md:hidden text-white text-2xl" 
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <AiOutlineMenu />
                </button>
            </header>

            {/* Mobile Menu Modal */}
            {isMobileMenuOpen && (
                <div className={`fixed inset-0 bg-[${colorPrimario}] bg-opacity-50 flex justify-center items-center`} >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-64">
                        <button 
                            className="text-gray-600 text-xl float-right" 
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            ✖
                        </button>
                        <nav className="mt-4">
                            {items.map((item, index) => (
                                <a 
                                    key={index} 
                                    href={`/${item.name}`} 
                                    className="block text-lg text-gray-700 py-2 hover:bg-blue-100 rounded-lg px-4"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <p className="text-center text-gray-700 mb-6">{descripcion}</p>
                <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                        <h2 className="text-xl font-bold text-blue-600">Número de Visitas</h2>
                        <p className="text-gray-700 text-lg">1234</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                        <h2 className="text-xl font-bold text-blue-600">Lista de Asesores</h2>
                        <p className="text-gray-700 text-lg">8 activos</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                        <h2 className="text-xl font-bold text-blue-600">Inmuebles Totales</h2>
                        <p className="text-gray-700 text-lg">56</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                        <h2 className={`text-xl font-bold text-blue-600`}>Inmuebles Deshabilitados</h2>
                        <p className="text-gray-700 text-lg">12</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer style={{backgroundColor: colorPrimario, color: colorSecundario}} className={`text-center py-4 mt-6 shadow-md`}>
                <p className="text-sm">© 2025 {titulo}. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
