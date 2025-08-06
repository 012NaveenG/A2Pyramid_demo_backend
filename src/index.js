import { app } from "./app.js";
import { DB_CONNECT } from "./utils/DB_Connect.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

DB_CONNECT().then(() =>
  app.listen(PORT, () =>
    console.log(`Server is listening at http://localhost:${PORT}`)
  )
);
