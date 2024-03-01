export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    name: string;
    displayName: string;
    dateOfBirth?: Date;
    avatarUrl?: string;
    personalPhoneNumber: string;
    workEmail: string;
    jobTitle?: string;
    department: string;
    managerId?: number;
    startDate?: Date;
    tenure?: number;
    workAnniversary?: Date;
    managerFirstName?: string;
    managerLastName?: string;
    managerJobTitle?: string;
}