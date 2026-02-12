import diagnosticData from '../data/diagnoses';
import patientData from '../data/patients';
import {v1 as uuid} from 'uuid';
import  utils  from '../utils';

import { Diagnosis, NonSensitivePatientData, Patient, NewPatientEntry, NewEntry, Entry } from '../types';

const diagnoses: Diagnosis[] = diagnosticData;
const patients: Patient[] = patientData;


const getDiagnosticData = (): Diagnosis[] => {
    return diagnoses;
};

const getPatientData = (): NonSensitivePatientData[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const id: string = uuid();
    const newPatient = {
        id: id,
        ...entry,
        entries: []
    };

    patients.push(newPatient);
    return newPatient;

};

const addEntry = (entry: NewEntry, id: string): Entry => {
    const patient = getPatientById(id);
    const idForEntry = uuid();
    const diagnosisCodes = utils.parseDiagnosisCodes(entry);
    const entryWithId = {
        id: idForEntry,
        ...entry,
        diagnosisCodes: diagnosisCodes
    };
    if (!patient) {
        throw new Error('Patient not found');
    }
    const updatedPatient = {
        ...patient,
        entries: [...patient.entries, entryWithId]
    };
    patients[patients.findIndex(p => p.id === id)] = updatedPatient;
    return entryWithId;
};

export default {
    getDiagnosticData, getPatientData, addPatient, getPatientById, addEntry
};
