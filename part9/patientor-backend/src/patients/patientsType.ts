export type genderType = 'male' | 'female';

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: genderType,
    occupation: string,
}

export type AddNewPatientType = Omit<Patient, 'id'>;

export type WithoutSSN = Omit<Patient, 'ssn'>;

