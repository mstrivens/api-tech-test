import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { initialize } from 'express-openapi';
import { fetchData } from './utils/fetchData'
import { type BambooHrEmployee } from './types/bambooHrEmployee'
import { fetchBambooEmployeeData, fetchAdditionalEmployeeData } from './operations/users'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

initialize({
  app,
  docsPath: "/api-definition",
  apiDoc: "./doc/api-definition-base.yml",
  operations: {
    getUsers: async function(req: Request, res: Response) {
      const employees: Array<BambooHrEmployee> = await fetchBambooEmployeeData(`https://${process.env.API_KEY}:x@api.bamboohr.com/api/gateway.php/${process.env.SUBDOMAIN}/v1/employees/directory`)
      const hydratedEmployeeObject: Array<BambooHrEmployee> = await fetchAdditionalEmployeeData(employees)
      // for (const employee of employees) {
      //   const employeeData = await fetchData(`https://${process.env.API_KEY}:x@api.bamboohr.com/api/gateway.php/${process.env.SUBDOMAIN}/v1/employees/${employee.id}/?fields=id,dateOfBirth,hireDate,supervisorId&onlyCurrent=false`)
      //   hydratedEmployeeObject.push(Object.assign({}, employee, employeeData));
      // }
      res.send(hydratedEmployeeObject)
    }
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});