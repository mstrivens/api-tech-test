import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { initialize } from 'express-openapi';
import { transformData } from './utils/transformData'
import { type BambooHrEmployee, HydratedBambooHrEmployee } from './models/bambooHrApi'
import { fetchBambooEmployeeData, fetchAdditionalEmployeeData } from './operations/employees'
import swaggerUi from 'swagger-ui-express';

type ParamsObject = {
  offset?: number | undefined
  limit?: number | undefined
} 

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
    getEmployees: async function(req: Request, res: Response) {
      const api_key =  typeof req.query.api_key === "string" ? req.query.api_key : ""
      const params: ParamsObject = {
        "offset": typeof req.query.offset === "number" ? parseInt(req.query?.offset) : undefined,
        "limit": typeof req.query.limit === "number" ? parseInt(req.query?.limit) : undefined,
      }
      try {
        const employees: Array<BambooHrEmployee> = await fetchBambooEmployeeData({url: `https://${api_key || process.env.API_KEY}:x@api.bamboohr.com/api/gateway.php/${process.env.SUBDOMAIN}/v1/employees/directory`, ...params})
        const hydratedEmployeeObject: Array<HydratedBambooHrEmployee> = await fetchAdditionalEmployeeData(employees)
        const transformedData = transformData(hydratedEmployeeObject)
        res.send(transformedData)
      } catch(e) {
        res.send(e)
      }
    }
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});