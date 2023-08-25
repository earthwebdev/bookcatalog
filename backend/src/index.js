import express from "express";
import "dotenv/config"

import morgan from "morgan";
//router parts
import indexRouter from "./routes/index.router.js";

import dbConnection from "./config/db.config.js";

import cors from "cors"
import helmet from "helmet";
import hpp from "hpp"
import mongoSanitize from 'express-mongo-sanitize';


const app = express();
//db connection 
dbConnection();
//content type json fomat
app.use(cors({origin: '*'}));
// Use Helmet!
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
app.use(morgan('tiny'));

/* app.use(
    ( req, res, next) => {
      if (req.originalUrl === '/webhook') {
        next();
      } else {
        express.json()(req, res, next);

      }
    }
  ); */
  app.use(
    express.json({
      verify: function (req, res, buf) {
        if (req.originalUrl.includes('/webhook')) {
          req.rawBody = buf.toString();          
        }        
            
      }
    })
);
    //app.use(express.json());
    app.use(express.urlencoded({extended: true}));
app.use('/api/v1', indexRouter);




const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log("Ther server is running in port "+ PORT);
})