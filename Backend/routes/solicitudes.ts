import { Router, Context } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { Bson } from "https://deno.land/x/mongo@v0.31.1/mod.ts"; // Importa Bson para usar ObjectId
import { db } from "../db.ts"; // Importar la conexión a MongoDB

const solicitudesRouter = new Router();
const registroCollection = db.collection("solicitudes");
// const { getQuery } = helpers;

solicitudesRouter.get("/getSolicitudes", async (context: Context) => {
    const registros = await registroCollection.find();
    if (!registros) {
        context.response.status = 404;
        context.response.body = { message: "No hay registros" };
        return;
    }
    context.response.status = 200;
    context.response.body = registros;
});

solicitudesRouter.post("/addSolicitud", async (context: Context) => {
    try {
        const body = await context.request.body();
        const value = await body.value;
        if (!value) {
            context.response.status = 400;
            context.response.body = { message: "Invalid request body" };
            return;
        }
        var { name, email, message, phone } = value;
        const vistas = 0;
        const created = new Date();
        const registro = await registroCollection.insertOne({ name, email, message, phone,  vistas: vistas, tomada: false, created });
        context.response.status = 201;
        context.response.body = { message: "Registro creado", registro };

    } catch (error: any) {
        context.response.status = 500;
        context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});

solicitudesRouter.post("/changeVista", async (context: Context) => {
    try {
        const body = await context.request.body();
        const value = await body.value;
        if (!value) {
            context.response.status = 400;
            context.response.body = { message: "Invalid request body" };
            return;
        }
        const { id, tomada } = value;
        const isExist = await registroCollection.findOne({ _id: new Bson.ObjectId(id) });
        if (!isExist) {
            context.response.status = 400;
            context.response.body = { message: "Registro no existe" };
            return;
        }
        const registro = await registroCollection.updateOne({ _id: new Bson.ObjectId(id) }, { $inc: { vistas: 1 }, $set: { tomada: tomada } });
        if (!registro) {
            context.response.status = 400;
            context.response.body = { message: "Error al actualizar el registro" };
            return;
        }
        context.response.status = 200;
        context.response.body = { message: "Registro actualizado", registro };
    } catch (error: any) {
        context.response.status = 500;
        context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});


export default solicitudesRouter;
