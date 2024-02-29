import { HydratedBambooHrEmployee } from "../models/bambooHrApi"
import { type Employee } from "../models/employee"

export const transformData = (employees: Array<HydratedBambooHrEmployee> ): Array<Employee> => {
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
            startDate: employee.hireDate
            // work_anniversary?: Date;
            // tenure?: number;
        })
    }
    return transformedEmployees
}