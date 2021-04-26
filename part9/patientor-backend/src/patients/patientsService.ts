import {patientsData} from './patientsData';
import {Patient, WithoutSSN, AddNewPatientType} from './patientsType';
import {v1 as uuid} from 'uuid';

const getAllIncludeSensitive = (): Patient[] => {
    return patientsData;
};

const getAllNoSensitive = (): WithoutSSN[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addOne = (newPatient:AddNewPatientType):Patient => {
    const newId = uuid();
    const newPatientWithId:Patient = {...newPatient, id: newId};
    patientsData.push(newPatientWithId);
    return newPatientWithId;
};

const patientsService = {
    getAllIncludeSensitive,
    getAllNoSensitive,
    addOne,
};

export default patientsService;
