import { z } from "zod";
import { NewPatientSchema, NewEntrySchema } from "./utils";

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

//eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export type NewEntryData = z.infer<typeof NewEntrySchema>;
// export type NewPatientEntry = Omit<Patient, 'id'>;