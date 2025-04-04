import { useState } from 'react';
import Link from "next/link";

export default function NuevoUsuario({ asesores }) {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [asesor, setAsesor] = useState(asesores.length > 0 ? asesores[0]._id : "");

    const handleNuevoUsuario = async () => {
        try {
            const res = await fetch(`https://mini-crm-dev.deno.dev/adduser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: asesor,
                    username: username,
                    password: password
                })
            });
            const data = await res.json();
            if (data.error) {
                setError(data.error);
            } else {
                console.log(data);
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-blue-100">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <h1 className="text-lg font-semibold">Realty Manager</h1>
                    <nav className="hidden lg:flex space-x-6">
                        <Link href="/" className="text-lg font-semibold text-white hover:underline">Home</Link>
                        <Link href="/Inmuebles" className="text-lg font-semibold text-white hover:underline">Inmuebles</Link>
                        <Link href="/Seguimientos" className="text-lg font-semibold text-white hover:underline">Seguimientos</Link>
                        <Link href="/Configuracion" className="text-lg font-semibold text-white hover:underline">Configuración</Link>
                    </nav>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center p-6">
                {asesores.length === 0 ? (
                    <p className="text-red-600">No hay asesores disponibles</p>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                        <h1 className="text-2xl font-semibold mb-4">Nuevo Usuario</h1>
                        {error && <p className="text-red-500">Error: {error}</p>}

                        <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md" 
                        />

                        <label className="block text-sm font-medium text-gray-700 mt-4">Contraseña</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md" 
                        />

                        <label className="block text-sm font-medium text-gray-700 mt-4">Asesor</label>
                        <select 
                            value={asesor} 
                            onChange={(e) => setAsesor(e.target.value)} 
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        >
                            {asesores.map((asesor) => (
                                <option key={asesor._id} value={asesor._id}>{asesor.name}</option>
                            ))}
                        </select>

                        <button 
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                            onClick={handleNuevoUsuario}
                        >
                            Crear Usuario
                        </button>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center py-4 mt-6 shadow-md">
                <p className="text-sm">© 2025 Realty Manager. Todos los derechos reservados.</p>
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

    return { props: { asesores: asesorSinUser } };
}
