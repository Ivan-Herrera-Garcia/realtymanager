import { useState } from 'react';
import Link from "next/link";
import { useEffect } from 'react';
import Head from "next/head";
import { IoIosLogOut } from 'react-icons/io';

export default function NuevoUsuario({ asesores, config, users }) {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [asesor, setAsesor] = useState(asesores.length > 0 ? asesores[0]._id : "");

    const handleNuevoUsuario = async () => {
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

        if (username.length < 5 || username == "") {
            Toast.fire({
                icon: "error",
                title: "El nombre de usuario debe tener al menos 5 caracteres"
            });
            return;
        } 

        if (users.some(user => user.username === username)) {
            Toast.fire({
                icon: "error",
                title: "El nombre de usuario ya existe"
            });
            return;
        }

        if (password.length < 8) {
            Toast.fire({
                icon: "error",
                title: "La contraseña debe tener al menos 8 caracteres"
            });
            return;
        }
        
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (!hasUppercase || !hasNumber || !hasSpecialChar) {
            Toast.fire({
                icon: "error",
                title: "La contraseña debe incluir una mayúscula, un número y un carácter especial"
            });
            return;
        }

        try {
            const res = await fetch(`https://mini-crm-dev.deno.dev/adduser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: asesor,
                    username: username,
                    password: password,
                })
            });
            
            const data = await res.json();
            Toast.fire({
                icon: "success",
                title: "Usuario creado con éxito"
            });
            window.location.href = "/Asesores";

            if (data.error) {
                setError(data.error);
            } else {
                console.log(data);
            }
        } catch (error) {
            setError(error);
        }
    };

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
                        </Link>
                        <button className="text-lg font-semibold hover:underline flex items-center" onClick={() => handleCerrarSesion()}>
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
                            <Link href="/Configuracion" legacyBehavior>
                                <a className="text-lg text-gray-800 hover:underline">Configuración</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-5xl">
                    <div className="w-full flex items-center justify-center">
                        {asesores.length === 0 ? (
                            <p className="text-red-600 text-lg font-semibold">
                            No hay asesores disponibles
                            </p>
                        ) : (
                            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
                            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                                Nuevo Usuario
                            </h1>

                            {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}

                            <div className="space-y-4">
                                {/* Nombre de usuario */}
                                <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre de Usuario
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Ingrese el nombre de usuario"
                                    maxLength={20}
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    className="mt-1 p-3 w-full border border-gray-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-blue-400"
                                />
                                </div>

                                {/* Contraseña */}
                                <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="Ingrese una contraseña segura"
                                    maxLength={100}
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="mt-1 p-3 w-full border border-gray-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-blue-400"
                                />
                                </div>

                                {/* Selección de Asesor */}
                                <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Asesor
                                </label>
                                <select 
                                    value={asesor} 
                                    onChange={(e) => setAsesor(e.target.value)} 
                                    className="mt-1 p-3 w-full border border-gray-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-blue-400"
                                >
                                    {asesores.map((asesor) => (
                                    <option key={asesor._id} value={asesor._id}>
                                        {asesor.name}
                                    </option>
                                    ))}
                                </select>
                                </div>

                                {/* Botón de Crear */}
                                <button 
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg w-full transition-all"
                                onClick={handleNuevoUsuario}
                                >
                                Crear Usuario
                                </button>
                            </div>
                            </div>
                        )}
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
    const res = await fetch(`https://mini-crm-dev.deno.dev/user`);
    const users = await res.json();
    const asesorRes = await fetch(`https://mini-crm-dev.deno.dev/asesor`);
    const asesoresText = await asesorRes.text();
    const fixedJson = `[${asesoresText.replace(/}{/g, "},{")}]`;
    const listaAsesores = JSON.parse(fixedJson);

    const asesorSinUser = listaAsesores.filter(asesor => !users.find(user => user.idAsesor === asesor._id));

    const responseConfig = await fetch(`https://mini-crm-dev.deno.dev/configuracion`);
    const config = await responseConfig.text();
    console.log(asesorSinUser)
    console.log(users)
    return { props: { asesores: asesorSinUser, config: JSON.parse(config), users:users } };
}
