import express from "express";
import "./db";
import cors from 'cors'
import noteRouter from "./routers/note";

// create a server
const app = express();
//this middle ware is necessary in order to connect backend with frontend
app.use(cors()); //to allow cross-origin requests

// this will parse post request coming from fetch.post() method
app.use(express.json());

// this will parse post request coming from html form
app.use(express.urlencoded({ extended: false }));

/**
 * 
 * "localhost:8000/note/create"
"localhost:8000/note"
"localhost:8000/note/noteId"
"localhost:8000/note/noteId"
*/
app.use("/note", noteRouter);

// listen to some port
app.listen(8000, () => {
  console.log("listening");
});