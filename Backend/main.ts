import { Application, Context } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import router from "./routes/index.ts";

const app = new Application();

// Middleware para CORS
app.use(async (context: Context, next) => {
  context.response.headers.set("Access-Control-Allow-Origin", "*");
  context.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  context.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (context.request.method === "OPTIONS") {
    context.response.status = 204;
  } else {
    await next();
  }
});

// Usar las rutas
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Servidor corriendo en http://localhost:8000");
await app.listen({ port: 8000 });
