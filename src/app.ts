import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import router from "./routes/router";
import errorHandler from "./middlewares/error";
import bodyParser from "body-parser";
import mongodb from './utils/mongodb/mongodb.util';
import cors from 'cors';

const app: Application = express();
mongodb;
app.use(express.json());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan("tiny"));
app.use('/uploads', express.static("uploads"));
app.use(express.static("public"));
app.use(cors({ origin: "*" }));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(router);
app.use(errorHandler);

export = app;
