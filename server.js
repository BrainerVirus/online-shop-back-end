import express from "express";
import cors from "cors";
import "dotenv/config";

import db from "./database/db.js";
import productRouter from "./routes/ProductRoutes.js";
import categoryRouter from "./routes/CategoryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

db.getConnection((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected...");
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `Server started and listening on port ${process.env.PORT || 8080}`
  );
});

export default app;
