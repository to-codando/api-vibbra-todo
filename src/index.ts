import { Hono } from "hono";
import { cors } from "hono/cors";
import { RegExpRouter } from "hono/router/reg-exp-router";

import { create } from "../db";
import { routerFactory } from "./router";

const dbPath = "./db/data.json";
const db = create(process.env.DATABASE || dbPath);
db.init();

const port = process.env.PORT ? +process.env.PORT : 3000;
const host = process.env.HOST || "localhost";

const app = new Hono({ router: new RegExpRouter() });
const router = routerFactory(db);

app.use("/api/*", cors());
app.route("/api/user", router.user);

console.log(`Running at ${host}:${port}`);

export default {
  port,
  fetch: app.fetch,
};
