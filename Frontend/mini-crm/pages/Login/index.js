import React, { useState } from 'react';
import Link from 'next/link';

export default function Login({ users }) {
    const [usuarios, setUsuarios] = useState(users);
    const [tema, setTema] = useState("azul-blanco");
    
    const temas = {
        "azul-blanco": { fondo: "bg-blue-700", texto: "text-white" },
        "negro-gris": { fondo: "bg-black", texto: "text-gray-400" },
        "blanco-negro": { fondo: "bg-white", texto: "text-black" },
        "gris-blanco": { fondo: "bg-gray-700", texto: "text-white" },
        "azuloscuro-celeste": { fondo: "bg-blue-900", texto: "text-blue-300" }
    };

    return (
        <div className={`min-h-screen flex flex-col ${temas[tema].fondo} ${temas[tema].texto}`}>
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <h1 className="text-lg font-semibold">Realty Manager</h1>
                    <nav className="hidden lg:flex space-x-6">
                        <Link href="/" className="hover:underline">Home</Link>
                        <Link href="/Inmuebles" className="hover:underline">Inmuebles</Link>
                        <Link href="/Seguimientos" className="hover:underline">Seguimientos</Link>
                        <Link href="/Configuracion" className="hover:underline">Configuración</Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-6 py-10">
                <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
                <p className="mb-4">Aquí puedes ver todos los usuarios registrados en el sistema.</p>
                <Link href="/Login/Nuevo" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Agregar Usuario</Link>
                <div className="my-4"></div>
                {/* Lista de usuarios */}
                <ul className="bg-white p-4 rounded shadow-md text-black">
                    {usuarios.map((usuario) => (
                        <li key={usuario._id} className="border-b py-2 px-2">
                            <p className="font-medium">{usuario.username}</p>
                        </li>
                    ))}
                </ul>
            </main>

            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center py-4 shadow-md">
                <p className="text-sm">© 2025 Realty Manager. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`https://mini-crm-dev.deno.dev/user`);
    const users = await res.json();
    return {
        props: { users },
    };
}
