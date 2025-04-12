import React, { useState } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import Head from 'next/head';
import { IoMdPersonAdd } from 'react-icons/io';
import { IoIosLogOut } from 'react-icons/io';

export default function Login({ users, config }) {
    const [usuarios, setUsuarios] = useState(users);
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
                <div className="w-full max-w-5xl">
                    <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
                    <p className="mb-4">Aquí puedes ver todos los usuarios registrados en el sistema.</p>
                    <Link href="/Login/Nuevo" 
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 mb-4 w-fit hover:bg-blue-600 transition-colors"
                        >
                        <IoMdPersonAdd className="text-lg" />
                        <span>Agregar Usuario</span>
                    </Link>
                    <div className="my-4"></div>
                    {/* Lista de usuarios */}
                    <ul className="bg-white p-4 rounded shadow-md text-black">
                        {usuarios.map((usuario) => (
                            <li key={usuario._id} className="border-b py-2 px-2 flex justify-between items-center">
                                <span>{usuario.username}</span>
                                <span className="text-gray-500">{usuario.name}</span>
                            </li>
                        ))}
                    </ul>
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

    const responseConfig = await fetch(`https://mini-crm-dev.deno.dev/configuracion`);
    const config = await responseConfig.text();

    const responseAsesor = await fetch(`https://mini-crm-dev.deno.dev/asesor`);
    const asesores = await responseAsesor.text();

    const fixedJson = `[${asesores.replace(/}{/g, "},{")}]`;
    const asesoresData = JSON.parse(fixedJson);

    var usersData = [];
    asesoresData.forEach((asesor) => {
        var user = users.find((user) => user.idAsesor == asesor._id);
        if (user) {
           user.name = asesor.name;
        } else {
            user = { name: asesor.name, username: "Sin cuenta" };
        }
        usersData.push(user);
    });

    return {
        props: { users:usersData, config: JSON.parse(config) },
    };
}
