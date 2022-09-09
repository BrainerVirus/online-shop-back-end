import express from "express";
import cors from "cors";
import "dotenv/config";

import db from "./db/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//calling db function
db();

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `Server started and listening on port ${process.env.PORT || 8080}`
  );
});
