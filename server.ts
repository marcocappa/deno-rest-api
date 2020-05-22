import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes/index.ts";

const env = Deno.env.toObject();
const PORT = env.port || 5000;
const HOST = env.host || "127.0.0.1";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`
Server running on: http://${HOST}:${PORT}

***** Available enpoints:
GET     /api/v1/products
GET     /api/v1/products/:id
POST    /api/v1/products
PUT     /api/v1/products/:id
DELETE  /api/v1/products/:id`);

await app.listen(`${HOST}:${PORT}`);
