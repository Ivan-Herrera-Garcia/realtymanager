import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { IoIosLogOut } from "react-icons/io";

export default function NuevoAsesor({config, asesores}) {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [sector, setSector] = useState("");
    const [error, setError] = useState(null);

    const handleCrear = async () => {
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

        if (asesores.some(user => user.phoneNumber === phoneNumber)) {
            Toast.fire({
                icon: "error",
                title: "El teléfono ya está registrado"
            });
            return;
        }

        if (asesores.some(user => user.email === email)) {
            Toast.fire({
                icon: "error",
                title: "El correo ya está registrado"
            });
            return;
        }

        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email == "" || !regex.test(email)) {
            Toast.fire({
                icon: "error",
                title: "El correo es requerido o demasiado corto"
            });
            return;
        }
        if (sector == "" || sector.length < 3) {
            Toast.fire({
                icon: "error",
                title: "El sector es requerido o demasiado corto"
            });
            return;
        }

        try {
            const res = await fetch(`https://mini-crm-dev.deno.dev/addasesor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    phoneNumber: phoneNumber,
                    email: email,
                    sector: sector
                })
            });
            const data = await res.json();
            if (data && data != null) {
            Toast.fire({
                icon: "success",
                title: "Asesor creado correctamente"
            });
                window.location.href = "/Asesores";
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error);
        }
    }

    const [colorPrimario, setColorPrimario] = useState(config.primaryColor);
    const [colorSecundario, setColorSecundario] = useState(config.secondaryColor);
    const [titulo, setTitulo] = useState(config.title);
    const [descripcion, setDescripcion] = useState(config.descripcion);

    useEffect(() => {
        
        setColorPrimario(config.primaryColor);
        setColorSecundario(config.secondaryColor);
        setTitulo(config.title);
        setDescripcion(config.descripcion);
    }, [config]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    
    const handleCerrarSesion = () => {
        Cookies.remove("userData"); // Elimina la cookie "userData"
        window.location.href = "/"; // Redirige a la página de inicio
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
            <header  style={{backgroundColor: colorPrimario}}  className={`py-4 shadow-md flex justify-between items-center px-6`}>
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
                        </Link><button className="text-lg font-semibold hover:underline flex items-center" onClick={() => handleCerrarSesion()}>
                        <IoIosLogOut size={25}/>
                    </button>
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

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-xl">
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
                            
                            <label className="block text-sm font-medium text-gray-700 mt-4">Correo</label>
                            <input 
                                placeholder="Correo del Asesor"
                                type="text" 
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-800" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            
                            <label className="block text-sm font-medium text-gray-700 mt-4">Sector</label>
                            <input 
                                placeholder="Sector del Asesor (Ej. Senderos, etc.)"
                                type="text" 
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-800" 
                                value={sector} 
                                onChange={(e) => setSector(e.target.value)} 
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
             <footer  style={{backgroundColor: colorPrimario, color: colorSecundario}}  className={`text-center py-4 mt-6 shadow-md`}>
                <p className="text-sm">© 2025 {titulo}. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch(`https://mini-crm-dev.deno.dev/configuracion`);
    const config = await response.text();

    const responseAsesor = await fetch("https://mini-crm-dev.deno.dev/asesor", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    const text = await responseAsesor.text(); 

    const fixedJson = `[${text.replace(/}{/g, "},{")}]`; 

    const data = JSON.parse(fixedJson);
    return {
        props: { config: JSON.parse(config), asesores:data },
    };
}
