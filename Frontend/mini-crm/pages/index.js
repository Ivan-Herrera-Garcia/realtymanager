"use client"

import { useEffect, useState } from "react";
import Head from "next/head";
import Login from "../components/login/login";
import Menu from "../components/menu/menu";
import Cookies from "js-cookie";

export default function Home({config}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        
        var userData = Cookies.get("userData"); // Intenta obtener la cookie "userData"

        if (userData) {
            setIsLoggedIn(true); // Si la cookie existe, actualiza el estado
        }
    }, [Cookies.get("userData")]); // Dependencia para que se ejecute cuando cambie la cookie

    return (
        <div className="min-h-screen flex flex-col">
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
    
          {isLoggedIn ? (
            <Menu config={config} />
          ) : (
            <>
              {/* HEADER */}
              <header className="bg-teal-600 text-white px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">{config.title}</h1>
                <button
                  className="bg-white text-teal-600 px-4 py-2 rounded hover:bg-gray-100"
                  onClick={() => setShowLoginModal(true)}
                >
                  Iniciar Sesión
                </button>
              </header>
    
              {/* LANDING */}
              <main className="flex-grow p-8 bg-blue-50">
                <section className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-4">Bienvenido a {config.title}</h2>
                  <p className="text-gray-700 max-w-xl mx-auto">
                    {config.descripcion}
                  </p>
                </section>
    
                <section className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="bg-white shadow p-6 rounded">
                    <h3 className="text-lg font-semibold text-teal-600 mb-2">Gestión de Inmuebles</h3>
                    <p className="text-gray-600">Publica, edita y desactiva propiedades con facilidad.</p>
                  </div>
                  <div className="bg-white shadow p-6 rounded">
                    <h3 className="text-lg font-semibold text-teal-600 mb-2">Panel de Asesores</h3>
                    <p className="text-gray-600">Administra usuarios y conecta propiedades a cada asesor.</p>
                  </div>
                  <div className="bg-white shadow p-6 rounded">
                    <h3 className="text-lg font-semibold text-teal-600 mb-2">Accesos personalizados</h3>
                    <p className="text-gray-600">Cada asesor tendrá su cuenta para publicar y gestionar.</p>
                  </div>
                </section>
              </main>
    
              {/* FOOTER */}
              <footer className="bg-teal-600 text-white text-center py-4">
                © {new Date().getFullYear()} Realty Manager. Todos los derechos reservados.
              </footer>
    
              {/* LOGIN MODAL */}
              {showLoginModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4 py-6">
                        
                        <div className="relative bg-white w-full max-w-md max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-xl animate-fade-in">
                        
                        {/* Botón cerrar */}
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>

                        {/* Encabezado opcional */}
                        <div className="mb-4 text-center">
                            <h2 className="text-2xl font-semibold text-teal-600">Inicia Sesión</h2>
                            <p className="text-sm text-gray-500 mt-1">Accede a tu cuenta para continuar</p>
                        </div>

                        {/* Formulario de login */}
                        <Login config={config} setIsLoggedIn={setIsLoggedIn} />
                        </div>
                    </div>
                    )}
            </>
          )}
        </div>
      );
    }

export async function getServerSideProps() {
    const response = await fetch(`https://mini-crm-dev.deno.dev/configuracion`);
    const config = await response.text();
    console.log(JSON.parse(config));
    return {
        props: { config: JSON.parse(config) },
    };
}