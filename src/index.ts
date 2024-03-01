import express, { Express } from "express";
import dotenv from "dotenv";
import { initialize } from 'express-openapi';
import { getEmployees } from './operations/getEmployees'
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "http://localhost:3000/api-definition",
    },
  })
);

initialize({
  app,
  docsPath: "/api-definition",
  apiDoc: "./doc/api-definition-base.yml",
  operations: {
    getEmployees: getEmployees
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});