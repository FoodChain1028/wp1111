import path from "path";
import express from "express";
import cors from "cors";
import server from "./src/server";
import mongo from "./src/mongo";

const app = express();
if (process.env.NODE_ENV === "development") {
    app.use(cors());
}

app.get("/api", (req, res) => {
    console.log("GET /api");
    res.send({ message: "Hello from the server!"}).status(200);
});

if (process.env.NODE_ENV === "production") {
    const _dirname = path.resolve();
    app.use(express.static(path.join(_dirname, "../frontend", "build")));
    app.get("/*", (req, res) => {
        res.sendFile(path.join(_dirname, "../frontend", "build", "index.html"));
    })
}

mongo.connect();
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})

