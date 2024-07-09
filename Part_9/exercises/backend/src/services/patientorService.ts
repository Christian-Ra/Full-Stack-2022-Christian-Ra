import diagnosticData from '../data/diagnoses';
import patientData from '../data/patients';

import { Diagnosis, NonSensitivePatientData, Patient } from '../types';

const diagnoses: Diagnosis[] = diagnosticData;
const patients: Patient[] = patientData;

const getDiagnosticData = (): Diagnosis[] => {
    return diagnoses;
};

const getPatientData = (): NonSensitivePatientData[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getDiagnosticData, getPatientData
};
