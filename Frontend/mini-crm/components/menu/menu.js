import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Link from "next/link";



export default function Menu({config, inmuebles, asesores, solicitudes}) {
    const [mensajes, setMensajes] = useState([solicitudes]);
    const [colorPrimario, setColorPrimario] = useState(config.primaryColor);
    const [colorSecundario, setColorSecundario] = useState(config.secondaryColor);
    const [titulo, setTitulo] = useState(config.title);
    const [descripcion, setDescripcion] = useState(config.descripcion);

    const [tomada, setTomada] = useState(JSON.parse(atob(Cookies.get("userData")))?.name || null);

    useEffect(() => {
        setColorPrimario(config.primaryColor);
        setColorSecundario(config.secondaryColor);
        setTitulo(config.title);
        setDescripcion(config.descripcion);

        const autorb64 = Cookies.get("userData");
        if (autorb64 && autorb64 != undefined) {
            const autor = atob(autorb64);
            const autorData = JSON.parse(autor);
            const autorName = autorData.name;
            setTomada(autorName);
        } else {
            setTomada(null)
        }

    }, [config, Cookies.get("userData")]);
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const items = [
        { name: "Inmuebles", bgColor: "bg-blue-500" },
        { name: "Asesores", bgColor: "bg-green-500" },
        { name: "Configuración", bgColor: "bg-red-500" },
    ];

    const handleCerrarSesion = () => {
        Cookies.remove("userData"); // Elimina la cookie "userData"
        window.location.href = "/"; // Redirige a la página de inicio
    }

    const asesorMap = Object.fromEntries(asesores.map(a => [a._id, a.name]));

    // Contar inmuebles por asesor
    const inmueblesPorAsesor = asesores.map(asesor => {
        const count = inmuebles.filter(i => i.idAsesor === asesor._id).length;
        return {
        name: asesor.name,
        inmuebles: count
        };
    });

    const cambiarVista = async (id) => {
        try {
          const res = await fetch("https://mini-crm-dev.deno.dev/changeVista", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, tomada: tomada }),
          });
      
          if (!res.ok) throw new Error("Error al cambiar la vista");
      
          // Podrías recargar los mensajes o actualizar estado local aquí
          alert("Vista actualizada correctamente");
          // Ideal: volver a cargar los mensajes desde la API
        } catch (error) {
          console.error(error);
          alert("Hubo un error al cambiar la vista");
        }
      };
      

    return (
        <div className="min-h-screen flex flex-col bg-blue-100">
            {/* Header */}
            <header style={{backgroundColor: colorPrimario}} className={`py-4 shadow-md flex justify-between items-center px-6`}>
                <h1 className="text-lg font-semibold hidden md:block">{titulo}</h1>
                <div className="hidden md:flex space-x-6">
                    {items.map((item, index) => (
                        <a key={index} href={`/${item.name.replaceAll("ó", "o")}`} className="text-lg font-semibold hover:underline">
                            {item.name}
                        </a>
                    ))}
                    <button className="text-lg font-semibold hover:underline flex items-center" onClick={() => handleCerrarSesion()}>
                        <IoIosLogOut size={25}/>
                    </button>
                </div>
                {/* Mobile Menu Icon */}
                <button 
                    className="md:hidden text-white text-2xl" 
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <AiOutlineMenu />
                </button>
            </header>

            {/* Mobile Menu Modal */}
            {isMobileMenuOpen && (
                <div className={`fixed inset-0 bg-[${colorPrimario}] bg-opacity-50 flex justify-center items-center`} >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-64">
                        <button 
                            className="text-gray-600 text-xl float-right" 
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            ✖
                        </button>
                        <nav className="mt-4">
                            {items.map((item, index) => (
                                <a 
                                    key={index} 
                                    href={`/${item.name}`} 
                                    className="block text-lg text-gray-700 py-2 hover:bg-blue-100 rounded-lg px-4"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <p className="text-center text-gray-700 mb-6">{descripcion}</p>

                {/* Tarjetas resumen */}
                <div className="grid grid-cols-2 gap-6 w-full max-w-4xl mb-10">
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                    <h2 className="text-xl font-bold " style={{color:config.primaryColor}}>Número de Visitas</h2>
                    <p className="text-gray-700 text-lg">{inmuebles.reduce((acc, i) => acc + (i.vistas || 0), 0)}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                    <h2 className="text-xl font-bold " style={{color:config.primaryColor}}>Lista de Asesores</h2>
                    <p className="text-gray-700 text-lg">{asesores.length} activos</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                    <h2 className="text-xl font-bold " style={{color:config.primaryColor}}>Inmuebles Totales</h2>
                    <p className="text-gray-700 text-lg">{inmuebles.length}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                    <h2 className="text-xl font-bold " style={{color:config.primaryColor}}>Inmuebles Deshabilitados</h2>
                    <p className="text-gray-700 text-lg">{
                        inmuebles.filter(i => i.status === 'deshabilitado').length
                    }</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full items-start">
                    {/* Gráfico de inmuebles por asesor */}
                    <section className="w-full md:w-1/2">
                        <h3
                        className="text-xl font-semibold text-center mb-4"
                        style={{ color: config.primaryColor }}
                        >
                        Inmuebles por Asesor
                        </h3>
                        <div className="bg-white shadow-md rounded-xl p-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={inmueblesPorAsesor}>
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12 }}
                                interval={0}
                                angle={-10}
                                textAnchor="end"
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="inmuebles"
                                fill={config.secondaryColor}
                                radius={[6, 6, 0, 0]}
                            />
                            </BarChart>
                        </ResponsiveContainer>
                        </div>
                    </section>

                    {/* Tabla de inmuebles con vistas */}
                    <section className="w-full md:w-1/2">
                        <h3
                        className="text-xl font-semibold text-center mb-4"
                        style={{ color: config.primaryColor }}
                        >
                        Inmuebles y Vistas
                        </h3>
                        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                        <table className="min-w-full text-left text-sm" style={{ color: config.primaryColor }}>
                            <thead className="text-white" style={{ backgroundColor: config.primaryColor }}>
                            <tr>
                                <th className="px-6 py-3">Título</th>
                                <th className="px-6 py-3">Precio</th>
                                <th className="px-6 py-3">Vistas</th>
                                <th className="px-6 py-3">Asesor</th>
                            </tr>
                            </thead>
                            <tbody>
                            {inmuebles.map((i) => (
                                <tr key={i._id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium" style={{ color: config.primaryColor }}>
                                    <a
                                    href={i.urlInmueble}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-500 underline "
                                    >
                                    {i.title}
                                    </a>
                                </td>
                                <td className="px-6 py-4">${i.price.toLocaleString()}</td>
                                <td className="px-6 py-4">{i.vistas ?? 0}</td>
                                <td className="px-6 py-4">{asesorMap[i.idAsesor] ?? "Sin asignar"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </section>
                    </div>
                    <section className="w-full md:w-1/2">
                        <h3
                            className="text-xl font-semibold text-center mb-4"
                            style={{ color: config.primaryColor }}
                        >
                            Solicitudes
                        </h3>
                        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                            <table
                            className="min-w-full text-left text-sm"
                            style={{ color: config.primaryColor }}
                            >
                            <thead
                                className="text-white"
                                style={{ backgroundColor: config.primaryColor }}
                            >
                                <tr>
                                <th className="px-6 py-3">Nombre</th>
                                <th className="px-6 py-3">Telefono</th>
                                <th className="px-6 py-3">Correo</th>
                                <th className="px-6 py-3">Mensaje</th>
                                <th className="px-6 py-3">Tomada</th>
                                <th className="px-6 py-3">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mensajes.map((msg) => (
                                <tr key={msg._id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{msg.name}</td>
                                    <td className="px-6 py-4">{msg.phone}</td>
                                    <td className="px-6 py-4">{msg.email}</td>
                                    <td className="px-6 py-4">{msg.message}</td>
                                    <td className="px-6 py-4">
                                    {msg.vistas === 1 ? "Vista por " + msg.tomada : "No se ha visto"}
                                    </td>
                                    <td className="px-6 py-4">
                                        { msg.vistas === 1 ? 
                                            <button
                                                onClick={() => cambiarVista(msg._id)}
                                                className="px-3 py-1 bg-slate-600 text-white rounded-md hover:opacity-80 transition"
                                            >
                                                Cambiar estado
                                            </button> 
                                            :
                                            <td className="px-6 py-4">Solicitud vista por: </td>
                                        }
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </section>
                </main>

            {/* Footer */}
            <footer style={{backgroundColor: colorPrimario, color: colorSecundario}} className={`text-center py-4 mt-6 shadow-md`}>
                <p className="text-sm">© 2025 {titulo}. Todos los derechos reservados. </p>
                <Link href="/Politicas" className="text-teal-200">Políticas de Privacidad</Link>
            </footer>
        </div>
    );
}
