import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

export default function EditarAsesor({asesor, config}) {
    const [colorPrimario, setColorPrimario] = useState(config.primaryColor);
    const [colorSecundario, setColorSecundario] = useState(config.secondaryColor);
    const [titulo, setTitulo] = useState(config.title);

    useEffect(() => {
        setColorPrimario(config.primaryColor);
        setColorSecundario(config.secondaryColor);
        setTitulo(config.title);
    }, [config]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const [name, setName] = useState(asesor.name);
    const [phoneNumber, setPhoneNumber] = useState(asesor.phoneNumber);
    const [error, setError] = useState(null);

    const handleEditar = async () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });

          if (name == "" || name.length < 3) {
            Toast.fire({
                icon: "error",
                title: "El nombre es requerido o demasiado corto"
            });
            return;
        }
        if (phoneNumber == "" || phoneNumber.length < 10 ) {
            Toast.fire({
                icon: "error",
                title: "El teléfono es requerido o demasiado corto"
            });
            return;
        }

        try {
            const res = await fetch(`https://mini-crm-dev.deno.dev/editasesor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: asesor._id,
                    name: name,
                    phoneNumber: phoneNumber
                })
            });
            const data = await res.json();
            if (data) {
                Toast.fire({
                    icon: "success",
                    title: "Asesor modificado correctamente"
                });
                window.location.href = "/Asesores";
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error);
        }
    };

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
            <header style={{backgroundColor: colorPrimario}} className={`py-4 shadow-md flex justify-between items-center px-6`}>
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
                            <a className="text-lg font-semibold text-white hover:underline">Inicio</a>
                        </Link>
                        <Link href="/Inmuebles" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Inmuebles</a>
                        </Link>
                        <Link href="/Asesores" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Asesores</a>
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
                                <a className="text-lg text-gray-800 hover:underline">Inicio</a>
                            </Link>
                            <Link href="/Inmuebles" legacyBehavior>
                                <a className="text-lg text-gray-800 hover:underline">Inmuebles</a>
                            </Link>
                            <Link href="/Asesores" legacyBehavior>
                                <a className="text-lg font-semibold text-white hover:underline">Asesores</a>
                            </Link>
                            <Link href="/Configuracion" legacyBehavior>
                                <a className="text-lg text-gray-800 hover:underline">Configuración</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Contenido principal */}
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="max-w-sm w-full bg-white border border-gray-300 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-3" style={{color: colorPrimario}}>Editar Asesor</h2>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input 
                        type="text" 
                        maxLength={50}
                        placeholder="Nombre del asesor"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-700" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    
                    <label className="block text-sm font-medium text-gray-700 mt-3">Teléfono</label>
                    <input 
                        type="text" 
                        placeholder="Teléfono del asesor"
                        maxLength={10}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-700"
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                    />
                    
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    
                    <button 
                        style={{backgroundColor: colorPrimario}}
                        className="mt-4 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={handleEditar}
                    >
                        Guardar cambios
                    </button>
                </div>
            </main>

             {/* Footer */}
             <footer style={{backgroundColor: colorPrimario, color:colorSecundario}} className={`text-center py-4 mt-6 shadow-md`}>
                <p className="text-sm">© 2025 {titulo}. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export async function getServerSideProps(context) {
    const idAsesor = context.params.params;
    const response = await fetch(`https://mini-crm-dev.deno.dev/asesor/${idAsesor}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    
    const asesor = await response.json();

    const responseConfig = await fetch(`https://mini-crm-dev.deno.dev/configuracion`);
    const config = await responseConfig.text();
    
    return { props: { asesor: asesor[0], config: JSON.parse(config) } };
}