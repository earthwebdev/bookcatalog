import express from "express";
import "dotenv/config"

import morgan from "morgan";
import cors from "cors"
//router parts
import indexRouter from "./routers/index.router.js";

import dbConnection from "./config/db.config.js";

const app = express();
//db connection 
dbConnection();
//content type json fomat
app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', indexRouter);

app.use(morgan('combined'));


const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log("Ther server is running in port "+ PORT);
})