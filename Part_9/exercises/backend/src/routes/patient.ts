import express, {Response, Request, NextFunction} from 'express';

import {z} from 'zod';
import { NewPatientSchema } from '../utils';
import patientorService from '../services/patientorService';
import { NewPatientEntry, Patient } from '../types';
// import toNewPatient from '../utils';

const router = express.Router();

router.get('/',(_req, res) => {
    res.send(patientorService.getPatientData());
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

// router.post('/', (req, res) => { 
//     try {
//         const newPatient = toNewPatient(req.body);

//         const addedPatient = patientorService.addPatient(newPatient);
//         res.json(addedPatient);
//     } catch (error: unknown) {
//         let errorMessage = 'Something went wrong.';
//         if (error instanceof Error) {
//             errorMessage += ' Error: ' + error.message;
//         }
//         res.status(400).send(errorMessage);
//     }
// });

router.use(errorMiddleware);

export default router;