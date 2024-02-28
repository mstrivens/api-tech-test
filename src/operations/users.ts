import { type ApiResponse } from '../utils/fetchData'
import { type BambooApiResponse, BambooHrEmployee } from '../types/bambooHrEmployee'
import { fetchData } from '../utils/fetchData'

export async function fetchBambooEmployeeData(url: string): Promise<Array<BambooHrEmployee>> {
    const apiResponse: ApiResponse = await fetchData(url)
    const bambooApiResponse: BambooApiResponse = {
      fields: apiResponse.fields,
      employees: apiResponse.employees,
    };
    return bambooApiResponse.employees
}

export async function fetchAdditionalEmployeeData(employeesList: Array<BambooHrEmployee>) {
    const hydratedEmployeesList = []
    for (const employee of employeesList) {
        const employeeData = await fetchData(`https://${process.env.API_KEY}:x@api.bamboohr.com/api/gateway.php/${process.env.SUBDOMAIN}/v1/employees/${employee.id}/?fields=id,dateOfBirth,hireDate,supervisorId&onlyCurrent=false`)
        hydratedEmployeesList.push(Object.assign({}, employee, employeeData));
      }
      return hydratedEmployeesList
}