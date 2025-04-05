import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function NuevoInmueble({inmueblesData, config}) {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [urlInmueble, setUrlInmueble] = useState("");
    const [price, setPrice] = useState("");
    const [operation, setOperation] = useState("venta");
    const [idAsesor, setIdAsesor] = useState(inmueblesData._id);
    const [descripcionInmueble, setDescripcionInmueble] = useState("");

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

        if (titulo == "" || titulo.length < 3) {
            Toast.fire({
                icon: "error",
                title: "El título es obligatorio y debe tener al menos 3 caracteres."
            });
            return;
        }

        if (urlInmueble == "" || !urlInmueble.startsWith("http")) {
            Toast.fire({
                icon: "error",
                title: "La URL del inmueble es obligatoria y debe comenzar con http o https."
            });
            return;
        }

        if (price == "" || isNaN(price)) {
            Toast.fire({
                icon: "error",
                title: "El precio es obligatorio y debe ser un número."
            });
            return;
        }

        if (descripcion == "" || descripcion.length < 10) {
            Toast.fire({
                icon: "error",
                title: "La descripción es obligatoria y debe tener al menos 10 caracteres."
            });
            return;
        }


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
                    urlInmueble: urlInmueble,
                    descripcion: descripcionInmueble
                })
            });
            const data = await res.json();
            if (data && data != null) {
                Toast.fire({
                    icon: "success",
                    title: "Inmueble creado con éxito."
                });
                window.location.href = "/Inmuebles";
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
                <div className="w-full max-w-2xl bg-white  border border-gray-200  rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800  text-center">
                    Crear Nuevo Inmueble
                    </h2>

                    <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">Título</label>
                        <input
                            type="text"
                            placeholder="Título del inmueble"
                            pattern="^[a-zA-Z0-9\s]+$"
                            title="Please enter a valid title (letters and numbers only)"
                            maxLength={50}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300  rounded-md bg-white  text-gray-900 "
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">Descripción</label>
                        <textarea
                            placeholder="Descripción del inmueble"
                            title="Please enter a valid description (letters and numbers only)"
                            value={descripcionInmueble}
                            onChange={(e) => setDescripcionInmueble(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300  rounded-md bg-white  text-gray-900 "
                            rows={4}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">URL del Inmueble</label>
                        <input
                        type="text"
                        placeholder="https://example.com/inmueble"
                        pattern="https?://.+"
                        title="Please enter a valid URL starting with http:// or https://"
                        value={urlInmueble}
                        onChange={(e) => setUrlInmueble(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300  rounded-md bg-white  text-gray-900 "
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">Precio</label>
                        <input
                            type="text"
                            placeholder="Precio del inmueble"
                            pattern="^[0-9]+$"
                            title="Please enter a valid price (numbers only)"
                            maxLength={15}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300  rounded-md bg-white  text-gray-900 "
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">Operación</label>
                        <select
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300  rounded-md bg-white  text-gray-900 "
                        >
                        <option value="venta">Venta</option>
                        <option value="renta">Renta</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">Asesor</label>
                        <select
                        value={idAsesor}
                        onChange={(e) => setIdAsesor(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300  rounded-md bg-white  text-gray-900 "
                        >
                        {inmueblesData.map((asesor) => (
                            <option key={asesor._id} value={asesor._id}>
                            {asesor.name}
                            </option>
                        ))}
                        </select>
                    </div>
                    </div>

                    <button
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    onClick={handleCrear}
                    >
                    Crear Inmueble
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer  style={{backgroundColor: colorPrimario, color: colorSecundario}}  className={`text-center py-4 mt-6 shadow-md`}>
                <p className="text-sm">© 2025 {titulo}. Todos los derechos reservados.</p>
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

    const responseConfig = await fetch(`https://mini-crm-dev.deno.dev/configuracion`);
    const config = await responseConfig.text();

    return { props: { inmueblesData: data, config: JSON.parse(config) } };
}
