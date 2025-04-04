import Link from "next/link";
import { useState } from "react";
import config from "../../postcss.config.mjs";

export default function Asesores({ configuracion }) {
    const temas = {
        "azul-blanco": "#003366|#FFFFFF",
        "negro-gris": "#000000|#AAAAAA",
        "blanco-negro": "#FFFFFF|#000000",
        "negro-blanco": "#000000|#FFFFFF",
        "gris-blanco": "#444444|#FFFFFF",
        "azuloscuro-celeste": "#1B3B6F|#A1E0FF",
        "rojo-blanco": "#C0392B|#FFFFFF",
        "verde-negro": "#27AE60|#000000",
        "morado-amarillo": "#8E44AD|#F1C40F",
        "naranja-negro": "#E67E22|#000000",
        "rosa-negro": "#E91E63|#000000",
        "turquesa-blanco": "#1ABC9C|#FFFFFF",
        "dorado-negro": "#F39C12|#000000",
        "plata-negro": "#BDC3C7|#000000",
        "cafe-blanco": "#8B5A2B|#FFFFFF",
        "amarillo-azul": "#F4D03F|#003366",
        "verde-lima-negro": "#2ECC71|#000000",
        "vino-blanco": "#7D3C98|#FFFFFF",
        "celeste-negro": "#3498DB|#000000",
        "gris-negro": "#95A5A6|#000000",
        "negro-rojo": "#000000|#E74C3C",
        "azul-naranja": "#2980B9|#E67E22",
        "lila-blanco": "#BB8FCE|#FFFFFF",
        "menta-negro": "#76D7C4|#000000",
        "beige-negro": "#F5CBA7|#000000",
        "granate-blanco": "#A93226|#FFFFFF",
        "esmeralda-negro": "#1ABC9C|#000000",
        "lavanda-negro": "#D2B4DE|#000000",
        "gris-azul": "#7F8C8D|#003366",
        "azulreal-blanco": "#2E86C1|#FFFFFF",
        "negro-oro": "#000000|#D4AC0D"
    };
    
    function obtenerClave(colorPrimario, colorSecundario) {
        const valorBuscado = `${colorPrimario}|${colorSecundario}`;
    
        return Object.keys(temas).find(key => temas[key] === valorBuscado) || null;
    }

    const [tema, setTema] = useState(obtenerClave(configuracion[0].primaryColor, configuracion[0].secondaryColor));
    const [titulo, setTitulo] = useState(configuracion[0].title);
    const [descripcion, setDescripcion] = useState(configuracion[0].descripcion);
    const [imagen, setImagen] = useState(configuracion[0].urlPicture);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="min-h-screen flex flex-col bg-blue-100">
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <h1 className="text-lg font-semibold">Realty Manager</h1>
                    
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
                        <Link href="/Login" legacyBehavior>
                            <a className="text-lg font-semibold text-white hover:underline">Cuentas</a>
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
                                <a className="text-lg text-blue-600 hover:underline">Home</a>
                            </Link>
                            <Link href="/Inmuebles" legacyBehavior>
                                <a className="text-lg text-blue-600 hover:underline">Inmuebles</a>
                            </Link>
                            <Link href="/Login" legacyBehavior>
                                <a className="text-lg text-blue-600 hover:underline">Cuentas</a>
                            </Link>
                            <Link href="/Configuracion" legacyBehavior>
                                <a className="text-lg text-blue-600 hover:underline">Configuración</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}


            {/* Main content */}
            <main className="flex-grow p-6" style={{ padding: "20px", textAlign: "start" }}>
                {/* Sección de Tema de Colores */}
                <section style={{ marginBottom: "20px" }}>
                    <h2>Seleccionar Tema</h2>
                    <select
                        value={tema}
                        onChange={(e) => setTema(e.target.value)}
                        style={{ padding: "10px", fontSize: "16px", border: "1px solid #ccc" }}
                    >
                        <option value="azul-blanco">Azul y Blanco</option>
                        <option value="negro-gris">Negro y Gris</option>
                        <option value="blanco-negro">Blanco y Negro</option>
                        <option value="negro-blanco">Negro y Blanco</option>
                        <option value="gris-blanco">Gris y Blanco</option>
                        <option value="azuloscuro-celeste">Azul Oscuro y Celeste</option>
                        <option value="rojo-blanco">Rojo y Blanco</option>
                        <option value="verde-negro">Verde y Negro</option>
                        <option value="morado-amarillo">Morado y Amarillo</option>
                        <option value="naranja-negro">Naranja y Negro</option>
                        <option value="rosa-negro">Rosa y Negro</option>
                        <option value="turquesa-blanco">Turquesa y Blanco</option>
                        <option value="dorado-negro">Dorado y Negro</option>
                        <option value="plata-negro">Plata y Negro</option>
                        <option value="cafe-blanco">Café y Blanco</option>
                        <option value="amarillo-azul">Amarillo y Azul</option>
                        <option value="verde-lima-negro">Verde Lima y Negro</option>
                        <option value="vino-blanco">Vino y Blanco</option>
                        <option value="celeste-negro">Celeste y Negro</option>
                        <option value="gris-negro">Gris y Negro</option>
                        <option value="negro-rojo">Negro y Rojo</option>
                        <option value="azul-naranja">Azul y Naranja</option>
                        <option value="lila-blanco">Lila y Blanco</option>
                        <option value="menta-negro">Menta y Negro</option>
                        <option value="beige-negro">Beige y Negro</option>
                        <option value="granate-blanco">Granate y Blanco</option>
                        <option value="esmeralda-negro">Esmeralda y Negro</option>
                        <option value="lavanda-negro">Lavanda y Negro</option>
                        <option value="gris-azul">Gris y Azul</option>
                        <option value="azulreal-blanco">Azul Real y Blanco</option>
                        <option value="negro-oro">Negro y Oro</option>
                    </select>
                </section>

                {/* Sección de Título */}
                <section style={{ marginBottom: "20px" }}>
                <h2>Título</h2>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ingresa el título"
                    style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc" }}
                />
                </section>

                {/* Sección de Descripción */}
                <section style={{ marginBottom: "20px" }}>
                <h2>Descripción</h2>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Ingresa una descripción"
                    rows="4"
                    style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc" }}
                />
                </section>

                {/* Sección de Imagen */}
                <section style={{ marginBottom: "20px" }}>
                <h2>Imagen del Sitio</h2>
                <input
                    type="file"
                    onChange={(e) => setImagen(URL.createObjectURL(e.target.files[0]))}
                    style={{ padding: "10px", fontSize: "16px", }}
                />
                {imagen && <img src={imagen} alt="Imagen Previa" style={{ marginTop: "10px", maxWidth: "100%", height: "auto" }} />}
                </section>
                <button
                    onClick={async () => {
                        console.log(tema);
                        console.log(temas[tema]);
                        const response = await fetch("https://mini-crm-dev.deno.dev/editconfiguracion", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                _id: configuracion[0]._id,
                                primaryColor: temas[tema].split("|")[0],
                                secondaryColor: temas[tema].split("|")[1],
                                title: titulo,
                                descripcion: descripcion,
                                urlPicture: imagen
                            })
                        });
                        const data = await response.text();
                        if (data && data != null) {
                            window.location.href = "/Configuracion";
                        } else {
                            alert("Error al actualizar la configuración");
                        }
                    }}
                    style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}
                >Actualizar Configuración</button>
            </main>

           
            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center py-4 shadow-md">
                <p className="text-sm">© 2025 Realty Manager. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch("https://mini-crm-dev.deno.dev/configuracion", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    const text = await response.text(); // Obtener la respuesta en texto

    const fixedJson = `[${text.replace(/}{/g, "},{")}]`; // Arreglar formato

    const data = JSON.parse(fixedJson);

    return { props: { configuracion: data } };
}
