
import express from 'express';
import { toNewDiaryEntry } from '../utils';
import diaryService from '../services/diaryService';
import * as z from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const diary = diaryService.findById(Number(req.params.id));

    if (diary) {
        res.send(diary);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newDiaryEntry = toNewDiaryEntry(req.body);
        const addedEntry = diaryService.addDiary(newDiaryEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({error: error.issues});
        } else {
            res.status(400).send({error: 'unknown error.'});
        }
        // let errorMessage = 'Something went wrong.';
        // if (error instanceof Error) {
        //     errorMessage += ' Error: ' + error.message;
        // }
        // res.status(400).send(errorMessage);
    }
    // const {date, weather, visibility, comment } = req.body;
    // const addedEntry = diaryService.addDiary({
    //     date, weather, visibility, comment,
    // }
    // );
    // res.json(addedEntry);
});

export default router;