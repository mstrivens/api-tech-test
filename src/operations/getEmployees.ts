import { type ApiResponse } from '../utils/fetchData'
import { type BambooEmployeeDirectoryResponse, BambooHrEmployee, HydratedBambooHrEmployee } from '../models/bambooHrEmployee'
import { fetchData } from '../utils/fetchData'
import { Request, Response } from "express";
import { type Employee } from "../models/outputEmployee"

type ParamsObject = {
  offset?: number | undefined
  limit?: number | undefined
} 

export async function getEmployees(req: Request, res: Response): Promise<any> {
  const api_key =  typeof req.query.api_key === "string" ? req.query.api_key : ""
  const BAMBOO_ROOT_URL = `https://${api_key || process.env.API_KEY}:x@api.bamboohr.com/api/gateway.php/${process.env.SUBDOMAIN}/v1/employees/`
  const params: ParamsObject = {
    "offset": typeof req.query.offset === "number" ? parseInt(req.query?.offset) : undefined,
    "limit": typeof req.query.limit === "number" ? parseInt(req.query?.limit) : undefined,
  }
  try {
    const employees: Array<BambooHrEmployee> = await fetchBambooEmployeeData({url: BAMBOO_ROOT_URL + 'directory', ...params})
    const hydratedEmployeeObject: Array<HydratedBambooHrEmployee> = await fetchAdditionalEmployeeData(employees, BAMBOO_ROOT_URL)
    const transformedData = transformData(hydratedEmployeeObject)
    res.send(transformedData)
  } catch(e) {
    res.send(e)
  }
}

async function fetchBambooEmployeeData({url, offset, limit}:{url: string, offset?: number | undefined, limit?: number | undefined}): Promise<Array<BambooHrEmployee>> {
    const apiResponse: ApiResponse = await fetchData(url)
    const employeeDirectoryObject: BambooEmployeeDirectoryResponse = {
      fields: apiResponse.fields,
      employees: apiResponse.employees,
    };
    return employeeDirectoryObject.employees?.slice(offset, limit)
}

async function fetchAdditionalEmployeeData(employeesList: Array<BambooHrEmployee>, rootUrl: string): Promise<Array<HydratedBambooHrEmployee>> {
    const hydratedEmployeesList: Array<HydratedBambooHrEmployee> = []
    for (const employee of employeesList) {
        const employeeData: ApiResponse = await fetchData(rootUrl + `${employee.id}/?fields=id,dateOfBirth,hireDate,supervisorEId&onlyCurrent=false`)
        const supervisorData: ApiResponse = await fetchData(rootUrl + `${employeeData.supervisorEId}/?fields=firstName,lastName,jobTitle&onlyCurrent=false`)
        const hydratedEmployeeObject = {
            dateOfBirth: employeeData.dateOfBirth,
            hireDate: employeeData.hireDate,
            supervisorId: employeeData.supervisorEId,
            supervisorFirstName: supervisorData.firstName,
            supervisorLastName: supervisorData.lastName,
            supervisorJobTitle: supervisorData.jobTitle,
        }
        hydratedEmployeesList.push(Object.assign({}, employee, hydratedEmployeeObject));
      }
      return hydratedEmployeesList
}

const transformData = (employees: Array<HydratedBambooHrEmployee> ): Array<Employee> => {
  const transformedEmployees = []
  for (const employee of employees) {
      transformedEmployees.push(
      {
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          name: employee.name,
          displayName: employee.displayName,
          dateOfBirth: employee.dateOfBirth,
          avatarUrl: employee.photoUrl,
          personalPhoneNumber: employee.mobilePhone,
          workEmail: employee.workEmail,
          jobTitle: employee.jobTitle,
          department: employee.department,
          managerId: employee.supervisorId,
          startDate: employee.hireDate,
          managerFirstName: employee.supervisorFirstName,
          managerLastName: employee.supervisorLastName,
          managerJobTitle: employee.supervisorJobTitle
      })
  }
  return transformedEmployees
}