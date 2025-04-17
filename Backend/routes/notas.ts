import { Router, Context, helpers } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { Bson } from "https://deno.land/x/mongo@v0.31.1/mod.ts"; // Importa Bson para usar ObjectId
import { db } from "../db.ts"; // Importar la conexión a MongoDB

const notasRouter = new Router();
const registroCollection = db.collection("notas");
const { getQuery } = helpers;

// Obtener todos los asesores
notasRouter.get("/notaByAsesor/:id", async (context: Context) => {
    const { id } = getQuery(context, { mergeParams: true });
    const registros = await registroCollection.find({ idAsesor: id });
    context.response.body = registros;
});

notasRouter.get("/notaByInmueble/:id", async (context: Context) => {
    const { id } = getQuery(context, { mergeParams: true });
    const registros = await registroCollection.find({ idInmueble: new Bson.ObjectId(id) });
    context.response.body = registros;
});

notasRouter.get("/nota/:id", async (context: Context) => {
    const { id } = getQuery(context, { mergeParams: true });
    try {
        var registro = await registroCollection.find({ _id: new Bson.ObjectId(id)});
        const registroId = await registro.toArray();
        if (registroId.length != 0) {
          context.response.body = registroId;
        } else {
            context.response.status = 404;
            context.response.body = { message: "Registro no encontrado" };
        }
    }
    catch (error: any) {
            context.response.status = 500;
            context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});

notasRouter.post("/addNota", async (context: Context) => {
    try {
        const body = await context.request.body();
        const value = await body.value;
        if (!value) {
            context.response.status = 400;
            context.response.body = { message: "Invalid request body" };
            return;
        }
        var { title, descripcion, idAsesor, idInmueble } = value;
        idAsesor = new Bson.ObjectId(idAsesor);
        idInmueble = new Bson.ObjectId(idInmueble);
        const created = new Date();
        const registro = await registroCollection.insertOne({ title, descripcion, idAsesor, idInmueble, created });
        context.response.status = 201;
        context.response.body = { message: "Registro creado", registro };

    } catch (error: any) {
        context.response.status = 500;
        context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});

notasRouter.post("/editnota", async (context: Context) => {
    try {
        const body = await context.request.body();
        const value = await body.value;
        if (!value) {
            context.response.status = 400;
            context.response.body = { message: "Invalid request body" };
            return;
        }
        var { _id, title, descripcion } = value;
        const isExist = await registroCollection.findOne({ _id: new Bson.ObjectId(_id) });
        if (!isExist) {
            context.response.status = 400;
            context.response.body = { message: "Registro no existe" };
            return;
        }
        const registro = await registroCollection.updateOne({ _id: new Bson.ObjectId(_id) }, { $set: { title,descripcion } });
        context.response.status = 200;
        context.response.body = { message: "Registro actualizado", registro };

    } catch (error: any) {
        context.response.status = 500;
        context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});

export default notasRouter;
