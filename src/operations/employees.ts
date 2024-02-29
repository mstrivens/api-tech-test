import { type ApiResponse } from '../utils/fetchData'
import { type BambooEmployeeDirectoryResponse, BambooHrEmployee, HydratedBambooHrEmployee } from '../models/bambooHrApi'
import { fetchData } from '../utils/fetchData'

export async function fetchBambooEmployeeData({url, offset, limit}:{url: string, offset?: number | undefined, limit?: number | undefined}): Promise<Array<BambooHrEmployee>> {
    const apiResponse: ApiResponse = await fetchData(url)
    const employeeDirectoryObject: BambooEmployeeDirectoryResponse = {
      fields: apiResponse.fields,
      employees: apiResponse.employees,
    };
    return employeeDirectoryObject.employees?.slice(offset, limit)
}

export async function fetchAdditionalEmployeeData(employeesList: Array<BambooHrEmployee>): Promise<Array<HydratedBambooHrEmployee>> {
    const hydratedEmployeesList: Array<HydratedBambooHrEmployee> = []
    for (const employee of employeesList) {
        const employeeData: ApiResponse = await fetchData(`https://${process.env.API_KEY}:x@api.bamboohr.com/api/gateway.php/${process.env.SUBDOMAIN}/v1/employees/${employee.id}/?fields=id,dateOfBirth,hireDate,supervisorId&onlyCurrent=false`)
        const hydratedEmployeeObject = {
            dateOfBirth: employeeData.dateOfBirth,
            hireDate: employeeData.hireDate,
            supervisorId: employeeData.supervisorId
        }
        hydratedEmployeesList.push(Object.assign({}, employee, hydratedEmployeeObject));
      }
      return hydratedEmployeesList
}