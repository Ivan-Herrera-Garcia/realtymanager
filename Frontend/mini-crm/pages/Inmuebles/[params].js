import { useEffect, useState } from "react";

export default function FichaInmueble() {

    const [inmuebles, setInmuebles] = useState([]);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const id = window.location.href.split("/");
        const idUrl = id[id.length-1];
        async function fetchInmuebles() {
            try {
                const response = await fetch(("https://mini-crm-dev.deno.dev/inmuebles/"+idUrl), {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
    
                const data = await response.json(); // Obtener la respuesta en texto
    
                if (data != undefined && data != null) {
                    setInmuebles(data);
                }

            } catch (error) {
                console.error("🚨 Error en fetchInmuebles:", error);
            }
        }
    
        fetchInmuebles();
    }, []);
    
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

    function operationFormat(value) {
        const operation = value.toLowerCase();
        switch (operation) {
            case "venta":
                return "Venta";
            case "renta":
                return "Renta";
            default:
                return "Desconocido";
        }
    }

    return (
        <div>
            <h2>Ficha de Inmueble</h2>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <ul>
                {inmuebles.map((inmueble) => (
                    <div key={inmueble._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{inmueble.title}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{operationFormat(inmueble.operation)}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{priceFormat(inmueble.price)}</p>
                            <div className="flex items-center justify-between">
                                <a target="_self" href={`/Inmuebles/Editar/${inmueble._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-green-500 dark:focus:bg-green-500">
                                    Editar
                                </a>
                                <a target="_self" href={inmueble.urlInmueble} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Ir a ficha del inmueble
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

