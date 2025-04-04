import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

export default function NuevoAsesor({config}) {
    const [colorPrimario, setColorPrimario] = useState(config.primaryColor);
    const [colorSecundario, setColorSecundario] = useState(config.secondaryColor);
    const [titulo, setTitulo] = useState(config.title);

    useEffect(() => {
        console.log(config);
        setColorPrimario(config.primaryColor);
        setColorSecundario(config.secondaryColor);
        setTitulo(config.title);
    }, [config]);
    
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleCrear = async () => {
        try {
            const res = await fetch(`https://mini-crm-dev.deno.dev/addasesor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    phoneNumber: phoneNumber
                })
            });
            const data = await res.json();
            if (data && data != null) {
                window.location.href = "/Asesores";
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-blue-100">
             <Head>
                <title>{config.title}</title>
                <meta name="description" content={config.descripcion} />

                <meta name="twitter:site" content="website" />
                <meta name="twitter:title" content={config.title} />
                <meta name="twitter:description" content={config.descripcion} />
                <meta name="twitter:image" content={config.urlPicture} />

                <meta name="title" content={config.title} />  
                <meta name="description" content={config.descripcion} />

                <meta property="og:title" content={config.title} />
                <meta property="og:image" content={config.urlPicture} />
                <meta property="og:description" content={config.descripcion} />
                <meta property="og:type" content="website" />

                {/* <link rel="icon" type="image/png" href="/images/favicon.ico" />
                <link rel="shortcut icon" href="/images/favicon.ico" />
                <link rel="apple-touch-icon" href="/PropiedadesMexico/logo192.svg" /> */}

            </Head>
            {/* Header */}
            <header className={`bg-[${colorPrimario}] text-[${colorSecundario}] py-4 shadow-md flex justify-between items-center px-6`}>
                <div className="container mx-auto flex justify-between items-center px-6">
                    <h1 className="text-lg font-semibold">{titulo}</h1>
                    
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
                                <a className="text-lg text-gray-800 hover:underline">Home</a>
                            </Link>
                            <Link href="/Inmuebles" legacyBehavior>
                                <a className="text-lg text-gray-800 hover:underline">Inmuebles</a>
                            </Link>
                            <Link href="/Configuracion" legacyBehavior>
                                <a className="text-lg text-gray-800 hover:underline">Configuración</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-6" style={{color: colorPrimario}}>Nuevo Asesor</h2>
                    
                    {/* Formulario de Nuevo Asesor */}
                    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input 
                                placeholder="Nombre del Asesor"
                                maxLength={50}
                                type="text" 
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-800" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />

                            <label className="block text-sm font-medium text-gray-700 mt-4">Teléfono</label>
                            <input 
                                placeholder="Teléfono del Asesor"
                                maxLength={10}
                                type="text" 
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-800" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                            />
                        </div>
                        
                        {/* Mostrar error si existe */}
                        {error && <div className="mt-4 text-red-500">{error}</div>}

                        <button 
                            style={{backgroundColor: colorPrimario}}
                            className="mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                            onClick={handleCrear}
                        >
                            Crear Asesor
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className={`bg-[${colorPrimario}] text-[${colorSecundario}] text-center py-4 mt-6 shadow-md`}>
                <p className="text-sm">© 2025 {titulo}. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch(`https://mini-crm-dev.deno.dev/configuracion`);
    const config = await response.text();
    return {
        props: { config: JSON.parse(config) },
    };
}
