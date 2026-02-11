import { Gender, NewPatientEntry, Diagnosis} from "./types";
import { z } from "zod";


export const NewPatientSchema = z.object({
    name: z.string().min(1, 'Name cannot be empty'),
    dateOfBirth: z.string().date(),
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

export default { toNewPatient, parseDiagnosisCodes };