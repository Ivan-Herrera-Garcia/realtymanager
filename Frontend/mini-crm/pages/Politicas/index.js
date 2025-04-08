"use client"

import { use, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import Head from "next/head";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Politicas({ config }) {
  const [colorPrimario, setColorPrimario] = useState(config.primaryColor);
  const [colorSecundario, setColorSecundario] = useState(config.secondaryColor);
  const [titulo, setTitulo] = useState(config.title);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    var userData = Cookies.get("userData"); // Intenta obtener la cookie "userData"
    if (userData) {
        setLogin(true); // Si la cookie existe, actualiza el estado
    }}, [Cookies.get("userData")]);

  useEffect(() => {
    setColorPrimario(config.primaryColor);
    setColorSecundario(config.secondaryColor);
    setTitulo(config.title);
  }, [config]);

  var items = [
    { name: "Inicio" },
    { name: "Inmuebles" },
    { name: "Asesores" },
    { name: "Configuracion" },
  ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

   const handleCerrarSesion = () => {
          Cookies.remove("userData"); // Elimina la cookie "userData"
          window.location.href = "/"; // Redirige a la página de inicio
      }
  

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
    <Head>
        <title>{config.title}</title>
        <meta name="description" content={config.descripcion} />
        <meta name="twitter:site" content="website" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.descripcion} />
        <meta name="twitter:image" content={config.urlPicture} />
        <meta property="og:title" content={config.title} />
        <meta property="og:image" content={config.urlPicture} />
        <meta property="og:description" content={config.descripcion} />
        <meta property="og:type" content="website" />
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
                        { login &&
                        <>
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
                        </>
                        }
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
                            {
                                login && <>
                                <Link href="/Inmuebles" legacyBehavior>
                                    <a className="text-lg text-gray-800 hover:underline">Inmuebles</a>
                                </Link>
                                <Link href="/Asesores" legacyBehavior>
                                    <a className="text-lg font-semibold text-white hover:underline">Asesores</a>
                                </Link>
                                <Link href="/Configuracion" legacyBehavior>
                                    <a className="text-lg text-gray-800 hover:underline">Configuración</a>
                                </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            )}
               
      {/* Main */}
      <main className="flex-1 px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: colorPrimario }}>
          Políticas de Privacidad
        </h2>

        <article className="bg-white rounded-xl shadow-md p-6 leading-relaxed text-gray-700 space-y-4 text-justify">
          <p>En <strong>{titulo}</strong>, valoramos tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.</p>
          <p>
            {config.policy}
          </p>
        </article>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: colorPrimario, color: colorSecundario }} className="text-center py-4 mt-6 shadow-md">
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
