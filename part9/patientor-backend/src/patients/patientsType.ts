export enum GenderType {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}
export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: GenderType,
    occupation: string,
}

export type AddNewPatientType = Omit<Patient, 'id'>;

export type WithoutSSN = Omit<Patient, 'ssn'>;

