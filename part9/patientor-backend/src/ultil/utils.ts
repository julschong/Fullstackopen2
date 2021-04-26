import {AddNewPatientType, GenderType} from '../patients/patientsType';

type incomingAddOne = {
    name: unknown;
    dateOfBirth: unknown;
    gender: unknown;
    occupation: unknown;
    ssn: unknown;
};

export const toNewPatientEntry = ({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn}: incomingAddOne):AddNewPatientType => {
    const newPatient = {
        name: parseString(name),
        dateOfBirth: parseString(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        ssn: parseString(ssn),
    };
    return newPatient;
};

const parseGender = (gender:unknown): GenderType => {
    if (!gender || !isGender(gender)) {
        throw new Error('gender is incorrect or missing');
    }
    return gender;
};

const isGender = (param: any): param is GenderType => {
    return Object.values(GenderType).includes(param);
};

const parseString = (str: unknown): string => {
    if (!str || !isString(str)) {
        throw new Error('Incorrent or missing name ' + str);
    }
    return str as string;
};

const isString = (str: unknown): str is string => {
    if (!(typeof str === 'string')) {
        return false;
    }
    return true;
};
