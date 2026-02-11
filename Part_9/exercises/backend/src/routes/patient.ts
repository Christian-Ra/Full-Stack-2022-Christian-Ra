import express, {Response, Request, NextFunction} from 'express';

import {z} from 'zod';
import { NewEntrySchema, NewPatientSchema } from '../utils';
import patientorService from '../services/patientorService';
import { NewPatientEntry, Patient, NewEntry } from '../types';

const router = express.Router();

router.get('/',(_req, res) => {
    res.send(patientorService.getPatientData());
});

router.get('/:id', (_req, res) => {
    const patient = patientorService.getPatientById(_req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).send({ error: 'Patient not found' });
    }
});

const newPatientParser = ( req: Request, _res: Response, next: NextFunction ) => {
    try {
        NewPatientSchema.parse(req.body);
        console.log(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const newEntryParser = ( req: Request, _res: Response, next: NextFunction ) => {
    try {
        NewEntrySchema.parse(req.body);
        console.log(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

//! Probably want to add middleware for parsing new entries as well, Will try after testing post
//! Need to add schema for requests

const errorMiddleware = ( error: unknown, _req: Request, _res: Response, next: NextFunction ) => {
    if (error instanceof z.ZodError) {
        _res.status(400).send({error: error.issues});
    } else {
        next(error);
    }
};
router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientorService.addPatient(req.body);
    res.json(addedPatient);
});

router.post('/:id/entries', newEntryParser, (req: Request<unknown, unknown, NewEntry>, res: Response<Patient>) => {
    // Implementation for adding a new entry to a patient would go here
    const { id } = req.params as { id: string };
    const newEntry = req.body;
    const updatedPatient = patientorService.addEntry(newEntry, id);
    res.json(updatedPatient);
});

router.use(errorMiddleware);

export default router;