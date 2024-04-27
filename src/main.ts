// import "./ensure.storage";
import "dotenv/config";
import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import { ICache, Repository } from "./repository";
import { createClient } from "redis";
import { parsePort } from "./utils";

const app = express();

const redisClient = createClient({
  username: process.env.CACHE_USER,
  password: process.env.CACHE_PASS,
  socket: {
    host: process.env.CACHE_HOST,
    port: +process.env.CACHE_PORT!,
  },
});

redisClient
  .on("error", (err) => console.error(`Redis client encountered error ${err}`))
  .connect();

const repository = new Repository(redisClient as any as ICache);

//this sets handlebars template ending as render engine.
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

//this tells express to look into /views directory for html files
app.set("views", path.join(process.cwd(), "views"));

//serves contents of "/public" directory on "/"
app.use(express.static(path.join(process.cwd(), "public")));

//middleware to parse json & url encoded form data in  body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Homepage
app.get("/", (req, res) => {
  return res.render("index", { csspath: "/css/style.css" });
});

//Page where user creates text to share
app.get("/sender", (req, res) => {
  return res.render("sender", { csspath: "/css/sender.css" });
});

//handles post request from the form.
app.post("/sender", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.render("sender", {
      csspath: "/css/sender.css",
      error: "text cannot be empty",
    });
  }

  const code = await repository.insertText(text);

  return res.render("sender", { csspath: "/css/sender.css", code });
});

//Page where users can see shared text
app.get("/receiver/:code", async (req, res) => {
  const { code } = req.params;
  const data = await repository.getText(code);
  return res.render("receiver", { csspath: "/css/receiver.css", data });
});

//404 handler
app.all("*", (_, res, __) => {
  return res.render("not_found", { csspath: "/css/not_found.css" });
});

const port = parsePort(process.env.PORT, 3000);

app.listen(port, () => {
  console.log(`textism started on port ${port}`);
});
