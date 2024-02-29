import { HydratedBambooHrEmployee } from "../models/bambooHrApi"
import { type Employee } from "../models/employee"

export const transformData = (employees: Array<HydratedBambooHrEmployee> ): Array<Employee> => {
    const transformedEmployees = []
    for (const employee of employees) {
        transformedEmployees.push(
        {
            id: employee.id,
            first_name: employee.firstName,
            last_name: employee.lastName,
            name: employee.name,
            display_name: employee.displayName,
            date_of_birth: employee.dateOfBirth,
            avatar_url: employee.photoUrl,
            personal_phone_number: employee.mobilePhone,
            work_email: employee.workEmail,
            job_title: employee.jobTitle,
            department: employee.department,
            manager_id: employee.supervisorId,
            start_date: employee.hireDate
            // work_anniversary?: Date;
            // tenure?: number;
        })
    }
    return transformedEmployees
}