require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());

const CONNECTION_STRING = "mongodb+srv://zerodois:coracaovalente@cluster0.6jdpc9w.mongodb.net/?appName=Cluster0";
const DATABASENAME = "todoappdb";

let database;

app.get("/", (req, res) => {
    res.send("API is running");
});

app.listen(5038, async () => {
    try {
        const client = new MongoClient(CONNECTION_STRING);
        await client.connect();
        database = client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful, Running on http://localhost:5038");
    } catch (err) {
        console.error("Mongo DB Connection Failed:", err);
    }
});
