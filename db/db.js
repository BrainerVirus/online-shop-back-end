import mysql from "mysql2";
import "dotenv/config";

const db = () => {
  try {
    mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
};
export default db;
