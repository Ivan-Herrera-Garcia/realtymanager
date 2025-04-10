import { useEffect, useState } from "react";

export default function FichaInmueble() {
    const [inmuebles, setInmuebles] = useState([]);
    const [error, setError] = useState(null);
    const [notas, setNotas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingNota, setEditingNota] = useState(null);
    const [formNota, setFormNota] = useState({ title: "", descripcion: "" });
    const [asesores, setAsesores] = useState([]);

    var idUrl = null;

    useEffect(() => {
        const id = window.location.href.split("/");
        idUrl = id[id.length - 1];
        async function fetchInmuebles() {
            console.log("idUrl", idUrl);
            try {
                const response = await fetch("https://mini-crm-dev.deno.dev/inmuebles/" + idUrl, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                const text = await response.text(); // Obtener la respuesta en texto
                const fixedJson = `[${text.replace(/}{/g, "},{")}]`;
                const data = JSON.parse(fixedJson);
                console.log(data[0]);
                if (data) {
                    setInmuebles(data[0]);
                }
            } catch (error) {
                console.error("🚨 Error en fetchInmuebles:", error);
            }
        }

        async function fetchNotas() {
            console.log(`https://mini-crm-dev.deno.dev/notaByInmueble/${idUrl}`)
            try {
                const response = await fetch(`https://mini-crm-dev.deno.dev/notaByInmueble/${idUrl}`);
                const text = await response.text(); // Obtener la respuesta en texto
                const fixedJson = `[${text.replace(/}{/g, "},{")}]`;
                const data = JSON.parse(fixedJson);
                console.log(data);
                setNotas(data);
                const responseAsesor = await fetch(`https://mini-crm-dev.deno.dev/asesor`);
                const textAsesor = await responseAsesor.text(); // Obtener la respuesta en texto
                const fixedJsonAsesor = `[${textAsesor.replace(/}{/g, "},{")}]`;
                const dataAsesor = JSON.parse(fixedJsonAsesor);
                setAsesores(dataAsesor);
            } catch (err) {
                console.error("❌ Error cargando notas", err);
            }
        }

        fetchInmuebles();
        fetchNotas();
    }, []);

    function priceFormat(value) {
        const price = parseFloat(value);
        if (isNaN(price)) return "$0.00";
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(price);
    }

    function operationFormat(value) {
        const operation = value.toLowerCase();
        return operation === "venta" ? "Venta" : operation === "renta" ? "Renta" : "Desconocido";
    }

    function getUserIdFromCookie() {
        const match = document.cookie.match(/userData=([^;]+)/);
        if (!match) return null;
        try {
            const user = JSON.parse(decodeURIComponent(match[1]));
            return user._id;
        } catch (e) {
            return null;
        }
    }

    function openModal(nota = null) {
        if (nota) {
            setFormNota({ title: nota.title, descripcion: nota.descripcion });
            setEditingNota(nota);
        } else {
            setFormNota({ title: "", descripcion: "" });
            setEditingNota(null);
        }
        setShowModal(true);
    }

    async function handleSubmitNota() {
        const userId = getUserIdFromCookie();
        const body = editingNota
            ? { _id: editingNota._id, ...formNota }
            : { ...formNota, idAsesor: userId, idInmueble: idUrl };

        const endpoint = editingNota ? "/editnota" : "/addNota";
        console.log(inmuebles);
        var idAsesor = inmuebles[0].idAsesor;
        var idInmueble = inmuebles[0]._id;
        console.log("idAsesor", idAsesor);
        console.log("idInmueble", idInmueble);
        console.log(JSON.stringify({
            title: body.title,
            descripcion: body.descripcion,
            idAsesor: idAsesor,
            idInmueble: idInmueble,
        }));

        try {
            await fetch(`https://mini-crm-dev.deno.dev${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: endpoint == '/addNota' ? JSON.stringify({
                    title: body.title,
                    descripcion: body.descripcion,
                    idAsesor: inmuebles[0].idAsesor,
                    idInmueble: inmuebles[0]._id,
                }) : JSON.stringify({
                    _id: body._id,
                    title: body.title,
                    descripcion: body.descripcion,
                }),
            });
            window.location.reload(); // Recargar la página para ver los cambios
            setShowModal(false);
           
        } catch (err) {
            console.error("❌ Error guardando nota:", err);
        }
    }

    function getAsesor(id) {
        console.log(id)
        console.log(asesores)
        const asesor = asesores.find((asesor) => asesor._id === id);
        return asesor ? asesor.name : "Desconocido";
    }


    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-4">Ficha de Inmueble</h2>
            {error && <p className="text-red-600">Error: {error}</p>}

            <ul>
                {inmuebles.map((inmueble) => (
                    <div key={inmueble._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-6">
                        <a href="#">
                            <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{inmueble.title}</h5>
                            </a>
                            <div className="flex items-center justify-between mb-3">
                                <a href={`/Inmuebles/Editar/${inmueble._id}`} className="px-3 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600">Editar</a>
                                <a href={inmueble.urlInmueble} className="px-3 py-2 text-sm text-white bg-blue-700 rounded hover:bg-blue-800">
                                    Ir a ficha del inmueble
                                </a>
                            </div>

                            <h3 className="text-xl font-semibold mb-2">Notas</h3>
                            <ul className="mb-2">
                                {notas.map((nota) => (
                                    <li key={nota._id} className="mb-2 p-2 border rounded shadow-sm">
                                        <span className="text-gray-500 text-sm">{getAsesor(nota.idAsesor)}</span><br/>
                                        <strong>{nota.title}</strong>
                                        <p>{nota.descripcion}</p>
                                        <button onClick={() => openModal(nota)} className="text-blue-600 underline text-sm mt-1">Editar</button>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => openModal()} className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Agregar Nota</button>
                        </div>
                    </div>
                ))}
            </ul>

            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-[400px]">
                        <h3 className="text-lg font-bold mb-3">{editingNota ? "Editar Nota" : "Nueva Nota"}</h3>
                        <input
                            className="w-full p-2 mb-3 border rounded"
                            placeholder="Título"
                            value={formNota.title}
                            onChange={(e) => setFormNota({ ...formNota, title: e.target.value })}
                        />
                        <textarea
                            className="w-full p-2 mb-3 border rounded"
                            placeholder="Descripción"
                            rows={4}
                            value={formNota.descripcion}
                            onChange={(e) => setFormNota({ ...formNota, descripcion: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowModal(false)} className="px-4 py-1 bg-gray-300 rounded">Cancelar</button>
                            <button onClick={handleSubmitNota} className="px-4 py-1 bg-blue-600 text-white rounded">
                                {editingNota ? "Actualizar" : "Guardar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
