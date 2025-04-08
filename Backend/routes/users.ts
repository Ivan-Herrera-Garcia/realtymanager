import { Router, Context, helpers } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { Bson } from "https://deno.land/x/mongo@v0.31.1/mod.ts"; // Importa Bson para usar ObjectId
import { db } from "../db.ts"; // Importar la conexión a MongoDB

const usersRouter = new Router();
const registroCollection = db.collection("users");
const registroAsesorCollection = db.collection("asesor");
const { getQuery } = helpers;


async function getUserInfo (id: string) {
    const userInfo = await registroAsesorCollection.findOne({ _id: new Bson.ObjectId(id) });
    return userInfo;
}

// Función para generar hash con clave "fornite"
async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + "fornite"); // Concatenamos la clave secreta
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

// Función para verificar el hash
async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const newHash = await hashPassword(password);
    return newHash === hashedPassword;
}

// Obtener todos los usuarios (sin contraseñas)
usersRouter.get("/user", async (context: Context) => {
    const registros = await registroCollection.find();
    const registrosArray = await registros.map((registro: any) => {
        const { password, ...rest } = registro; // Ocultar contraseña
        return rest;
    });
    context.response.body = registrosArray;
});

// Obtener usuario por ID
usersRouter.get("/user/:id", async (context: Context) => {
    const { id } = getQuery(context, { mergeParams: true });
    try {
        const registro = await registroCollection.findOne({ _id: new Bson.ObjectId(id) });
        if (registro) {
            delete registro.password; // Ocultar contraseña
            context.response.body = registro;
        } else {
            context.response.status = 404;
            context.response.body = { message: "Registro no encontrado" };
        }
    } catch (error: any) {
        context.response.status = 500;
        context.response.body = { message: "Error en el servidor", error: error.message };
    }
});

// Registrar usuario
usersRouter.post("/adduser", async (context) => {
    try {
        const body = await context.request.body({ type: "json" }).value;
        if (!body || !body.username || !body.password) {
            context.response.status = 400;
            context.response.body = { message: "Faltan datos obligatorios" };
            return;
        }

        const { _id, username, password } = body;
        const idAsesor = new Bson.ObjectId(_id);
        // Verificar si el usuario ya existe
        const existingUser = await registroCollection.findOne({ idAsesor: idAsesor });
        if (existingUser) {
            context.response.status = 409;
            context.response.body = { message: "Usuario ya registrado" };
            return;
        }

        // Encriptar la contraseña
        const hashedPassword = await hashPassword(password);

        // Insertar usuario en la base de datos
        const result = await registroCollection.insertOne({
            username,
            password: hashedPassword,
            idAsesor: idAsesor,
        });

        context.response.status = 201;
        context.response.body = { message: "Usuario registrado", user: result };
    } catch (error) {
        console.error("Error en /adduser:", error);
        context.response.status = 500;
        context.response.body = { message: "Error en el servidor" };
    }
});



// Iniciar sesión
usersRouter.post("/login", async (context) => {
    try {
        const body = await context.request.body({ type: "json" }).value;
        if (!body || !body.username || !body.password) {
            context.response.status = 400;
            context.response.body = { message: "Faltan datos obligatorios" };
            return;
        }

        const { username, password } = body;

        // Buscar usuario en la base de datos
        const user = await registroCollection.findOne({ username });
        if (!user) {
            context.response.status = 404;
            context.response.body = { message: "Usuario no encontrado" };
            return;
        }

        const idAsesor = user.idAsesor.toString(); // Convertir ObjectId a string para la consulta
        // Verificar si el usuario está activo
        const asesor = await registroAsesorCollection.findOne({ _id: new Bson.ObjectId(idAsesor) });
        if (asesor && asesor.status == false) {
            context.response.status = 403;
            context.response.body = { message: "Usuario inactivo" };
            return;
        }
        // Verificar si el usuario tiene el rol de asesor

        // Comparar la contraseña ingresada con la almacenada
        const passwordMatch = await verifyPassword(password, user.password);
        if (!passwordMatch) {
            context.response.status = 401;
            context.response.body = { message: "Contraseña incorrecta" };
            return;
        }
        const userData = await getUserInfo(user.idAsesor);
        context.response.status = 200;
        context.response.body = { message: "Inicio de sesión exitoso", data:userData };
    } catch (error) {
        console.error("Error en /login:", error);
        context.response.status = 500;
        context.response.body = { message: "Error en el servidor" };
    }
});

export default usersRouter;
