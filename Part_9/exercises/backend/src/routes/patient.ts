import express from 'express';

import patientorService from '../services/patientorService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/',(_req, res) => {
    res.send(patientorService.getPatientData());
});

router.post('/', (req, res) => { 
    try {
        const newPatient = toNewPatient(req.body);

        const addedPatient = patientorService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;