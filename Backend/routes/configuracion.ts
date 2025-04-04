import { Router, Context, helpers } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { Bson } from "https://deno.land/x/mongo@v0.31.1/mod.ts"; // Importa Bson para usar ObjectId
import { db } from "../db.ts"; // Importar la conexión a MongoDB


const configuracionRouter = new Router();
const registroCollection = db.collection("configuracion");
const { getQuery } = helpers;

// Obtener todos los configuraciones
configuracionRouter.get("/configuracion", async (context: Context) => {
  const registros = await registroCollection.find().toArray();
  context.response.body = registros[0]; // Retorna solo el primer registro
});

configuracionRouter.get("/configuracion/:id", async (context: Context) => {
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

configuracionRouter.post("/addconfiguracion", async (context: Context) => {
    try {
        const body = await context.request.body();
        const value = await body.value;
        if (!value) {
            context.response.status = 400;
            context.response.body = { message: "Invalid request body" };
            return;
        }
        const registro = await registroCollection.insertOne(value);
        context.response.status = 201;
        context.response.body = { message: "Registro creado", registro };
    }
    catch (error: any) {
        context.response.status = 500;
        context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});

configuracionRouter.post("/editconfiguracion", async (context: Context) => {
    try {
        const body = await context.request.body();
        const value = await body.value;
        if (!value) {
            context.response.status = 400;
            context.response.body = { message: "Invalid request body" };
            return;
        }
        var { _id, primaryColor, secondaryColor, title, descripcion, urlPicture } = value;
        const isExist = await registroCollection.findOne({ _id: new Bson.ObjectId(_id) });
        if (!isExist) {
            context.response.status = 400;
            context.response.body = { message: "Registro no existe" };
            return;
        }
        const registro = await registroCollection.updateOne({ _id: new Bson.ObjectId(_id) }, { $set: { primaryColor, secondaryColor, title, descripcion, urlPicture } });
        context.response.status = 200;
        context.response.body = { message: "Registro actualizado", registro };

    } catch (error: any) {
        context.response.status = 500;
        context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});

export default configuracionRouter;
