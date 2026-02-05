 import express from "express"
 import mongoose from "mongoose"
 import dotenv from "dotenv"

 const app = express();
 dotenv.config();

 const PORT = process.env.PORT || 7000;
 const MONGOURL = process.env.MONGO_URL;

 mongoose.connect(MONGOURL).then(() => {
    console.log("Connection Stablished");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
 }).catch(error => console.log(error));
 
 /*const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());

const CONNECTION_STRING =
  "mongodb+srv://zerodois:coracaovalente@cluster0.6jdpc9w.mongodb.net/todoappdb?retryWrites=true&w=majority&appName=Cluster0";
const DATABASENAME = "todoappdb";

let database;

app.listen(5038, async () => {
    try {
        const client = new MongoClient(CONNECTION_STRING, {family: 4});
        await client.connect();

        database = client.db(DATABASENAME);
        console.log("Conexao Bem-Sucedida");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}); */
