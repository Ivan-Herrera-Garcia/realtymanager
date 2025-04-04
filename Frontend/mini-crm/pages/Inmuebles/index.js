import Link from "next/link";
import { useEffect, useState } from "react";

export default function Inmuebles() {
    const [inmuebles, setInmuebles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchInmuebles() {
            try {
                const response = await fetch("https://mini-crm-dev.deno.dev/inmuebles", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
    
                const text = await response.text(); // Obtener la respuesta en texto
    
                const fixedJson = `[${text.replace(/}{/g, "},{")}]`;
    
                const data = JSON.parse(fixedJson);

                if (data != undefined && data != null) {
                    setInmuebles(data);
                }

            } catch (error) {
                console.error("🚨 Error en fetchInmuebles:", error);
            }
        }
    
        fetchInmuebles();
    }, []);
    
    function priceFormat(value) {
        // Validar que sea un número válido
        const price = parseFloat(value);
        if (isNaN(price)) return "$0.00"; // Manejar valores inválidos
    
        // Formatear el precio en USD
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        });
    
        return formatter.format(price);
    }

    function operationFormat(value) {
        const operation = value.toLowerCase();
        switch (operation) {
            case "venta":
                return "Venta";
            case "renta":
                return "Renta";
            default:
                return "Desconocido";
        }
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="min-h-screen flex flex-col bg-blue-100">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <h1 className="text-lg font-semibold">Realty Manager</h1>
                    
                    {/* Icono de menú para móviles */}
                    <button 
                        className="lg:hidden text-white text-2xl" 
                        onClick={toggleMenu}
                    >
                        ☰
                    </button>

                    {/* Menú Desktop */}
                    <div className="hidden lg:flex space-x-6">
                        <Link href="/" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Home</a>
                        </Link>
                        <Link href="/Inmuebles" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Inmuebles</a>
                        </Link>
                        <Link href="/Seguimientos" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Seguimientos</a>
                        </Link>
                        <Link href="/Configuracion" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Configuración</a>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Modal para el menú en móviles */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-3/4">
                        <button onClick={toggleMenu} className="text-2xl text-gray-700">X</button>
                        <div className="flex flex-col space-y-4">
                            <Link href="/" legacyBehavior>
                                <a className="text-lg text-blue-600 hover:underline">Home</a>
                            </Link>
                            <Link href="/Inmuebles" legacyBehavior>
                                <a className="text-lg text-blue-600 hover:underline">Inmuebles</a>
                            </Link>
                            <Link href="/Seguimientos" legacyBehavior>
                                <a className="text-lg text-blue-600 hover:underline">Seguimientos</a>
                            </Link>
                            <Link href="/Configuracion" legacyBehavior>
                                <a className="text-lg text-blue-600 hover:underline">Configuración</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-5xl">
                <h2>Lista de Inmuebles</h2>
                <div>
                    <Link href="/Inmuebles/Nuevo" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-green-500 dark:focus:bg-green-500">
                        Crear Inmueble
                    </Link>
                </div>
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                <ul>
                    {inmuebles.map((inmueble) => (
                        <div key={inmueble._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{inmueble.title}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{operationFormat(inmueble.operation)}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{priceFormat(inmueble.price)}</p>
                                <div className="flex items-center justify-between">
                                    <a target="_self" href={`/Inmuebles/Editar/${inmueble._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-green-500 dark:focus:bg-green-500">
                                        Editar
                                    </a>
                                    <a href={inmueble.urlInmueble} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Ir a ficha del inmueble
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </main>
   
            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center py-4 mt-6 shadow-md">
                <p className="text-sm">© 2025 Realty Manager. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

