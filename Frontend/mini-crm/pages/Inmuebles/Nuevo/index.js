import { useEffect, useState } from "react";
import Link from "next/link";


export default function NuevoInmueble(asesores) {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [urlInmueble, setUrlInmueble] = useState("");
    const [price, setPrice] = useState("");
    const [operation, setOperation] = useState("venta");
    const [idAsesor, setIdAsesor] = useState(asesores.asesores[0]._id);

    const handleCrear = async () => {
        try {
            const res = await fetch(`https://mini-crm-dev.deno.dev/addinmueble`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    price: parseInt(price, 10),
                    operation: operation,
                    idAsesor: idAsesor,
                    urlInmueble: urlInmueble
                })
            });
            const data = await res.json();
            if (data && data != null) {
                window.location.href = "/Inmuebles";
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error);
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

            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-lg">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Título</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />

                            <label className="block text-sm font-medium text-gray-700">URL del Inmueble</label>
                            <input type="text" value={urlInmueble} onChange={(e) => setUrlInmueble(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />

                            <label className="block text-sm font-medium text-gray-700">Precio</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />

                            <label className="block text-sm font-medium text-gray-700">Operación</label>
                            <select value={operation} onChange={(e) => setOperation(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                                <option value="venta">Venta</option>
                                <option value="renta">Renta</option>
                            </select>
                            
                            <label className="block text-sm font-medium text-gray-700">Asesor</label>
                            <select value={idAsesor} onChange={(e) => setIdAsesor(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                                {
                                    asesores.asesores.map((asesor) => (
                                        <option key={asesor._id} value={asesor._id}>{asesor.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCrear()}>Crear Inmueble</button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center py-4 mt-6 shadow-md">
                <p className="text-sm">© 2025 Realty Manager. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export async function getServerSideProps(context) {
    const response = await fetch("https://mini-crm-dev.deno.dev/asesor", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    const text = await response.text(); // Obtener la respuesta en texto

    const fixedJson = `[${text.replace(/}{/g, "},{")}]`;

    const data = JSON.parse(fixedJson);

    console.log(data);

    return {
        props: { asesores: data },
    }
}