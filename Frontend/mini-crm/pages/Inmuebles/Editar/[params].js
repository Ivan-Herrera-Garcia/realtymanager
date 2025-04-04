import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function EditarInmueble({inmueble, config}) {
    const [error, setError] = useState(null);
    //Para editar
    const [title, setTitle] = useState(inmueble.title);
    const [urlInmueble, setUrlInmueble] = useState(inmueble.urlInmueble);
    const [price, setPrice] = useState(inmueble.price);
    const [operation, setOperation] = useState(inmueble.operation);

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

        if (title.length < 5 || title == "") {
            Toast.fire({
                icon: "error",
                title: "El título debe tener al menos 5 caracteres."
            });
            return;
        }

        if (price.length > 3 || price == "") {
            Toast.fire({
                icon: "error",
                title: "El precio no puede estar vacío y debe ser un precio valido."
            });
            return;
        }

        if (urlInmueble == "" || !urlInmueble.startsWith("http")) {
            Toast.fire({
                icon: "error",
                title: "La URL del inmueble no puede estar vacía."
            });
            return;
        }

        try {
            const res = await fetch(`https://mini-crm-dev.deno.dev/editinmueble`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: inmueble._id,
                    title: title,
                    price: parseInt(price, 10),
                    operation: operation,
                    idAsesor: inmueble.idAsesor,
                    urlInmueble: urlInmueble
                })
            });
            const data = await res.json();
            if (data && data != null) {
                Toast.fire({
                    icon: "success",
                    title: "Inmueble modificado con éxito."
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
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Editar Inmueble
                    </h2>

                    {error && (
                    <p className="text-red-600 text-center font-semibold mb-4">
                        Error: {error}
                    </p>
                    )}

                    <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                        <input
                        type="text"
                        value={title}
                        placeholder="Título del inmueble"
                        maxLength={50}
                        title="Título del inmueble"
                        pattern="^[a-zA-Z0-9\s]+$"
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL del Inmueble</label>
                        <input
                        type="text"
                        pattern="^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,}\/[^\s]*$"
                        title="URL del inmueble (ej: https://www.ejemplo.com/inmueble)"
                        placeholder="URL del inmueble"
                        value={urlInmueble}
                        onChange={(e) => setUrlInmueble(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                        <input
                        type="text"
                        pattern="^[0-9]+$"
                        title="Precio del inmueble"
                        placeholder="Precio del inmueble"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Operación</label>
                        <select
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                        <option value="venta">Venta</option>
                        <option value="renta">Renta</option>
                        </select>
                    </div>
                    </div>

                    <button
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    onClick={handleEditar}
                    >
                    Actualizar Inmueble
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
    const res = await fetch(`https://mini-crm-dev.deno.dev/inmuebles/${context.params.params}`);
    const inmueble = await res.json();

    const responseConfig = await fetch(`https://mini-crm-dev.deno.dev/configuracion`);
    const config = await responseConfig.text();

    return {
        props: { inmueble: inmueble[0], config: JSON.parse(config) }
    }
}