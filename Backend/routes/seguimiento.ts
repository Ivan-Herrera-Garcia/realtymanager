import { Router, Context, helpers } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { Bson } from "https://deno.land/x/mongo@v0.31.1/mod.ts"; // Importa Bson para usar ObjectId
import { db } from "../db.ts"; // Importar la conexión a MongoDB

const seguimientoRouter = new Router();
const registroCollection = db.collection("seguimiento");
const { getQuery } = helpers;

// Obtener todos los asesores
seguimientoRouter.get("/seguimiento", async (context: Context) => {
  const registros = await registroCollection.find();
  context.response.body = registros;
});

seguimientoRouter.get("/seguimiento/:id", async (context: Context) => {
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

seguimientoRouter.post("/addseguimiento", async (context: Context) => {
    try {
        const body = await context.request.body();
        const value = await body.value;
        if (!value) {
            context.response.status = 400;
            context.response.body = { message: "Invalid request body" };
            return;
        }
        var { idAsesor, idInmueble, title, notes } = value;
        idAsesor = new Bson.ObjectId(idAsesor);
        idInmueble = new Bson.ObjectId(idInmueble);
        const last_update = new Date();
        const inmuebles_linked = new Array();
        const status = 1;
        const registro = await registroCollection.insertOne({ idAsesor, idInmueble, last_update, inmuebles_linked, status, title, notes });
        context.response.status = 201;
        context.response.body = { message: "Registro creado", registro };

    } catch (error: any) {
        context.response.status = 500;
        context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});

seguimientoRouter.post("/changestatus", async (context: Context) => {
    try {
        const body = await context.request.body();
        const value = await body.value;
        if (!value) {
            context.response.status = 400;
            context.response.body = { message: "Invalid request body" };
            return;
        }
        const { id, status } = value;
        const last_update = new Date();
        const registro = await registroCollection.updateOne({ _id: new Bson.ObjectId(id) }, { $set: { status: status, last_update: last_update } });
        context.response.status = 201;
        context.response.body = { message: "Registro modificado", registro };

    } catch (error: any) {
        context.response.status = 500;
        context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});

seguimientoRouter.post("/seguimiento/addinmueble", async (context: Context) => {
    try {
        const body = await context.request.body();
        const value = await body.value;
        if (!value) {
            context.response.status = 400;
            context.response.body = { message: "Invalid request body" };
            return;
        }
        const { id, idInmueble } = value;
        const last_update = new Date();
        const arregloInmuebles = idInmueble.split(",");
        const registro = await registroCollection.updateOne({ _id: new Bson.ObjectId(id) }, { $push: { inmuebles_linked: arregloInmuebles }, $set: { last_update: last_update } });
        context.response.status = 201;
        context.response.body = { message: "Inmueble agregado", registro };

    } catch (error: any) {
        context.response.status = 500;
        context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});

export default seguimientoRouter;
