export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
}

export type WithoutSSN = Omit<Patient, 'ssn'>;

