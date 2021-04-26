import {diagnosesData} from './diagnosesData';

const getAll = () => {
    return diagnosesData;
};

const diagnosesService = {
    getAll,
};

export default diagnosesService;
