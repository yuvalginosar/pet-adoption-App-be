import express from "express";
import "dotenv/config";
import cors from "cors";
import petsRoutes from "./routes/petsRoutes.js";
import signupRoutes from "./routes/signupRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import knexConfig from "./data/knexfile.js";
import knex from "knex";
import cookieParser from "cookie-parser";
import pino from 'pino-http'


const petsAppDb = knex(knexConfig);
const app = new express();
app.use(pino({level: process.env.LOG_LEVEL}))
app.use(
  `/${process.env.UPLOAD_FOLDER}`,
  express.static(process.env.UPLOAD_FOLDER)
);
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());

app.use("/pet", petsRoutes);
app.use("/signup", signupRoutes);
app.use( '/login', loginRoutes);
app.use( '/user', userRoutes);


petsAppDb
.migrate
  .latest()
  .then((migration) =>{
    console.log('connected to DB', migration)
    app.listen(process.env.PORT, () => {
        console.log(`Notes app listening on port ${process.env.PORT}...`);
      });
  })
  .catch(err => console.log(err))

  export default petsAppDb