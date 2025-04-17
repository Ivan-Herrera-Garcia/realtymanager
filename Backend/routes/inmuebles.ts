import { Router, Context, helpers } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { Bson } from "https://deno.land/x/mongo@v0.31.1/mod.ts"; // Importa Bson para usar ObjectId
import { db } from "../db.ts"; // Importar la conexión a MongoDB

const inmuebleRouter = new Router();
const registroCollection = db.collection("inmuebles");
const { getQuery } = helpers;

inmuebleRouter.post("/addVista/:id", async (context: Context) => {
    const { id } = getQuery(context, { mergeParams: true });
    try {
        const isExist = await registroCollection.findOne({ _id: new Bson.ObjectId(id) });
        if (!isExist) {
            context.response.status = 400;
            context.response.body = { message: "Registro no existe" };
            return;
        }
        const registro = await registroCollection.updateOne({ _id: new Bson.ObjectId(id) }, { $inc: { vistas: 1 } });
        context.response.status = 200;
        context.response.body = { message: "Registro actualizado", registro };

    } catch (error: any) {
        context.response.status = 500;
        context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});


// Obtener todos los asesores
inmuebleRouter.get("/inmuebles", async (context: Context) => {
  const registros = await registroCollection.find();
  context.response.body = registros;
});

inmuebleRouter.get("/inmuebles/:id", async (context: Context) => {
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

inmuebleRouter.post("/addinmueble", async (context: Context) => {
    try {
        const body = await context.request.body();
        const value = await body.value;
        if (!value) {
            context.response.status = 400;
            context.response.body = { message: "Invalid request body" };
            return;
        }
        var { title, price, operation, idAsesor, urlInmueble, descripcion } = value;
        const vistas = 0;
        const created = new Date();
        idAsesor = new Bson.ObjectId(idAsesor);
        const registro = await registroCollection.insertOne({ title, price, operation, idAsesor, urlInmueble, descripcion, vistas, created, active: true });
        context.response.status = 201;
        context.response.body = { message: "Registro creado", registro };

    } catch (error: any) {
        context.response.status = 500;
        context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});

inmuebleRouter.post("/editinmueble", async (context: Context) => {
    try {
        const body = await context.request.body();
        const value = await body.value;
        if (!value) {
            context.response.status = 400;
            context.response.body = { message: "Invalid request body" };
            return;
        }
        var { _id, title, price, operation, idAsesor, urlInmueble, descripcion } = value;
        const isExist = await registroCollection.findOne({ _id: new Bson.ObjectId(_id) });
        if (!isExist) {
            context.response.status = 400;
            context.response.body = { message: "Registro no existe" };
            return;
        }
        const registro = await registroCollection.updateOne({ _id: new Bson.ObjectId(_id) }, { $set: { title, price, operation, idAsesor: new Bson.ObjectId(idAsesor), urlInmueble, descripcion } });
        context.response.status = 200;
        context.response.body = { message: "Registro actualizado", registro };

    } catch (error: any) {
        context.response.status = 500;
        context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});

inmuebleRouter.get("/inmueble/changestatus/:id", async (context: Context) => {
    const { id } = getQuery(context, { mergeParams: true });
    try {
        const isExist = await registroCollection.findOne({ _id: new Bson.ObjectId(id) });
        if (!isExist) {
            context.response.status = 400;
            context.response.body = { message: "Registro no existe" };
            return;
        }
        const status = isExist.status == undefined ? true : isExist.active;
        const registro = await registroCollection.updateOne({ _id: new Bson.ObjectId(id) }, { $set: { active: !status }});
        context.response.status = 200;
        context.response.body = { message: "Registro actualizado", registro };        
    }
    catch (error: any) {
            context.response.status = 500;
            context.response.body = { message: "Error, consultar con el administrador", error: error.message };
    }
});

export default inmuebleRouter;
