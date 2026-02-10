require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");
const { ObjectId } = require("mongodb");

const app = express();
app.use(cors());

const CONNECTION_STRING = "mongodb+srv://zerodois:coracaovalente@cluster0.6jdpc9w.mongodb.net/?appName=Cluster0";
const DATABASENAME = "todoappdb"; 

let database;

app.get("/", (req, res) => {
    res.send("API is running");
});

app.get('/getnotes', (req, res) => {
    if (!database) {
        return res.status(503).send("Database not ready");
    }

    database.collection("todoappcollection")
        .find({})
        .toArray()
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));

    console.log("Get Note Request Recieved")
});

app.post('/postnotes', multer().none(), async (req, res) => {
    try {
        if (!database) {
            return res.status(503).send("Database not ready");
        }

        if (!req.body.newNotes) {
            return res.status(400).send("Note text is required");
        }

        await database.collection("todoappcollection").insertOne({
            description: req.body.newNotes
        });

        console.log("Add Note Request Received");
        res.json("Added Successfully");

    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to add note");
    }
});

app.delete('/deletenotes', async (req, res) => {
  try {
    await database.collection("todoappcollection").deleteOne({
      _id: new ObjectId(req.query._id)
    });

    console.log("Delete Note Request Received");
    res.json("Deleted Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Delete failed");
  }
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