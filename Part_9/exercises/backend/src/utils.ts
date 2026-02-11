import { Gender, NewPatientEntry, Diagnosis, HealthCheckRating, NewEntryData} from "./types";
import { z } from "zod";

export const NewEntryDiscriminator = z.discriminatedUnion('type', [
    z.strictObject({
        type: z.literal('Hospital'),
        discharge: z.object({
            date: z.iso.date(),
            criteria: z.string().min(1, 'Discharge criteria cannot be empty')
        })
    }),
    z.strictObject({
        type: z.literal('OccupationalHealthcare'),
        employerName: z.string().min(1, 'Employer name cannot be empty'),
        sickLeave: z.object({
            startDate: z.iso.date(),
            endDate: z.iso.date()
        }).optional()
    }),
    z.strictObject({
        type: z.literal('HealthCheck'),
        healthCheckRating: z.enum(HealthCheckRating)
    })
]);

export const NewEntrySchema = z.strictObject({
         description: z.string().min(1, 'Description cannot be empty'),
        date: z.iso.date(),
        specialist: z.string().min(1, 'Specialist cannot be empty'),})
        .and(NewEntryDiscriminator);

export const NewPatientSchema = z.object({
    name: z.string().min(1, 'Name cannot be empty'),
    dateOfBirth: z.iso.date(),
    ssn: z.string().min(1, 'SSN cannot be empty'),
    gender: z.enum(Gender),
    occupation: z.string().min(1, 'Occupation cannot be empty'),
    entries: z.array(z.any())
});

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const toNewPatient = (object: unknown): NewPatientEntry => {
    return NewPatientSchema.parse(object);
};

const toNewEntry = (object: unknown): NewEntryData => {
    return NewEntrySchema.parse(object);
};

export default { toNewPatient, toNewEntry, parseDiagnosisCodes };