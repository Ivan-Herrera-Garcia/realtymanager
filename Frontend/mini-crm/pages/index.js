"use client"

import { useEffect, useState } from "react";
import Head from "next/head";
import Login from "../components/login/login";
import Menu from "../components/menu/menu";
import Cookies from "js-cookie";

export default function Home({config, inmuebles, asesores}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        
        var userData = Cookies.get("userData"); // Intenta obtener la cookie "userData"

        if (userData) {
            setIsLoggedIn(true); // Si la cookie existe, actualiza el estado
        }
    }, [Cookies.get("userData")]); // Dependencia para que se ejecute cuando cambie la cookie

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
    
      {isLoggedIn ? (
        <Menu config={config} />
      ) : (
        <>
          {/* HEADER */}
          <header
            style={{ backgroundColor: config.primaryColor }}
            className="text-white px-6 py-4 flex justify-between items-center shadow"
          >
            <h1 className="text-2xl font-bold">{config.title}</h1>
            <button
              className="bg-white text-teal-600 px-4 py-2 rounded hover:bg-gray-100"
              onClick={() => setShowLoginModal(true)}
            >
              Iniciar Sesión
            </button>
          </header>
    
          {/* LANDING */}
          <main className="flex-grow">
            {/* Bienvenida */}
            <section className="text-center py-16 px-4">
              <h2
                className="text-4xl font-extrabold mb-4"
                style={{ color: config.primaryColor }}
              >
                Bienvenido a {config.title}
              </h2>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                {config.descripcion}
              </p>
            </section>
    
            {/* Beneficios */}
            <section className="grid md:grid-cols-3 gap-6 px-8 pb-16">
              {[
                {
                  title: "Gestión de Inmuebles",
                  description:
                    "Publica, edita y desactiva propiedades con facilidad.",
                },
                {
                  title: "Panel de Asesores",
                  description:
                    "Administra usuarios y conecta propiedades a cada asesor.",
                },
                {
                  title: "Accesos Personalizados",
                  description:
                    "Cada asesor tendrá su cuenta para publicar y gestionar.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white shadow-lg p-6 rounded-2xl hover:shadow-xl transition"
                >
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: config.primaryColor }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </section>
    
            {/* Asesores */}
            <section className="bg-white py-16 px-6">
              <h3
                className="text-3xl font-bold text-center mb-10"
                style={{ color: config.primaryColor }}
              >
                Conoce a nuestros Asesores
              </h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {asesores.map((asesor) => (
                  <div
                    key={asesor.id}
                    className="bg-blue-50 p-6 rounded-xl shadow-md text-center"
                  >
                    <h4
                      className="text-lg font-semibold mb-1"
                      style={{ color: config.primaryColor }}
                    >
                      {asesor.name}
                    </h4>
                    <p className="text-gray-700">{asesor.phoneNumber}</p>
                  </div>
                ))}
              </div>
            </section>
    
            {/* Inmuebles */}
            <section className="py-16 px-6">
              <h3
                className="text-3xl font-bold text-center mb-10"
                style={{ color: config.primaryColor }}
              >
                Inmuebles Disponibles
              </h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {inmuebles.map((inmueble) => (
                  <div
                    key={inmueble.id}
                    className="bg-white p-6 rounded-xl shadow-md"
                  >
                    <h4
                      className="text-xl font-semibold mb-2"
                      style={{ color: config.primaryColor }}
                    >
                      {inmueble.title}
                    </h4>
                    <p className="text-gray-600">
                      {priceFormat(inmueble.price)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
    
            {/* CTA */}
            <section className="text-center py-16 bg-white">
              <h3
                className="text-2xl font-semibold mb-2"
                style={{ color: config.primaryColor }}
              >
                ¿Listo para empezar?
              </h3>
              <p className="text-gray-700">
                Inicia sesión para acceder a todas las funcionalidades.
              </p>
            </section>
    
            <section className="text-center pb-16 bg-white">
              <h3
                className="text-2xl font-semibold mb-2"
                style={{ color: config.primaryColor }}
              >
                ¿No tienes cuenta?
              </h3>
              <p className="text-gray-700">
                Contacta a tu administrador para obtener acceso.
              </p>
            </section>
          </main>
    
          {/* FOOTER */}
          <footer
            className="text-white text-center py-4"
            style={{ backgroundColor: config.primaryColor }}
          >
            ©2025 {config.title}. Todos los derechos reservados.
          </footer>
    
          {/* LOGIN MODAL */}
          {showLoginModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4 py-6">
              <div className="relative bg-white w-full max-w-md max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-xl animate-fade-in">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
                <div className="mb-4 text-center">
                  <h2 className="text-2xl font-semibold text-teal-600">
                    Inicia Sesión
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Accede a tu cuenta para continuar
                  </p>
                </div>
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

    const responseInmuebles = await fetch(`https://mini-crm-dev.deno.dev/inmuebles`);
    const inmuebles = await responseInmuebles.text();
    const fixedJson = `[${inmuebles.replace(/}{/g, "},{")}]`;

    const responseAsesores = await fetch(`https://mini-crm-dev.deno.dev/asesor`);
    const asesores = await responseAsesores.text();
    const fixedJsonAsesores = `[${asesores.replace(/}{/g, "},{")}]`; 

    return {
        props: { config: JSON.parse(config), inmuebles: JSON.parse(fixedJson), asesores: JSON.parse(fixedJsonAsesores) }, // Pasar la configuración como props
    };
}