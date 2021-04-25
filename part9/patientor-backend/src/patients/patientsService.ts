import {patientsData} from './patientsData';

const getAll = () => {
    return patientsData;
};

const patientsService = {
    getAll,
};

export default patientsService;
