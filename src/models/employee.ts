export interface Employee {
    id: string;
    first_name: string;
    last_name: string;
    name: string;
    display_name: string;
    date_of_birth?: Date;
    avatar_url?: string;
    personal_phone_number: string;
    work_email: string;
    job_title?: string;
    department: string;
    manager_id?: number;
    start_date?: Date;
    tenure?: number;
    work_anniversary?: Date;
}