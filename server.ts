import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes/index.ts";

const port = 5000;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port: ${port}
***** Available enpoints:
GET     /api/v1/products
GET     /api/v1/products/:id
POST    /api/v1/products
PUT     /api/v1/products/:id
DELETE  /api/v1/products/:id`);

await app.listen({ port });
