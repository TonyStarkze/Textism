import express from "express";
import path from "path";
import { parsePort } from "./utils";
import { jsonRepository } from "./repository";
import { engine } from "express-handlebars";

const app = express();

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
        return res.render("sender", { csspath: "/css/sender.css", error: "text cannot be empty" })
    }

    const code = await jsonRepository.insertText(text);

    return res.render("sender", { csspath: "/css/sender.css", code });

});


//Page where users can see shared text
app.get("/receiver/:code", async (req, res) => {

    const { code } = req.params;
    const data = await jsonRepository.findTextByCode(code);
    return res.render("receiver", { csspath: "/css/receiver.css", data });
});

//404 handler
app.all("*", (_, res, __) => {
    return res.render("not_found", { csspath: "/css/not_found.css" });
});

const port = parsePort(process.env.PORT, 5000);

app.listen(port, () => {
    console.log(`Server started listning on http://localhost:${port}/`);
});

