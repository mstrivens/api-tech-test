import { type ApiResponse } from '../utils/fetchData'

export type BambooHrEmployee = {
    id: string
    name: string
    firstName: string
    lastName: string
    displayName: string
    preferredName?: string
    jobTitle: string
    workPhone: string
    mobilePhone: string
    workEmail: string
    department: string
    location: string
    division: string
    linkedIn: string
    instagram?: string
    pronouns?: string
    workPhoneExtension: string
    supervisor: string
    photoUploaded: boolean
    photoUrl: string
    canUploadPhoto: number
}

export type HydratedBambooHrEmployee = BambooHrEmployee & {
    hireDate?: Date
    supervisorId: number
    dateOfBirth: Date
    supervisorFirstName: string
    supervisorLastName: string
    supervisorJobTitle: string
}

export type BambooEmployeeDirectoryResponse = ApiResponse & {
    fields: Array<{[key: string]: unknown}>
    employees: Array<BambooHrEmployee>
}