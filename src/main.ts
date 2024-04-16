import express from "express";
import path from "path";

const app = express();

const sendfileOptions = {
    root: path.join(process.cwd(), "views")
}

//serves contents of "/public" directory on "/"
app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res) => {
    return res.sendFile("index.html", sendfileOptions);
});

app.get("/sender", (req, res) => {
    return res.sendFile("sender.html", sendfileOptions);
});

app.get("/receiver", (req, res) => {

    return res.sendFile("receiver.html", sendfileOptions);
});

app.listen(5000);

