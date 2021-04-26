import {patientsData} from './patientsData';
import {Patient, WithoutSSN} from './patientsType';

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

const patientsService = {
  getAllIncludeSensitive,
  getAllNoSensitive,
};

export default patientsService;
