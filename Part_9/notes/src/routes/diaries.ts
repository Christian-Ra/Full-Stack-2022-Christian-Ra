
import express, {Request, Response, NextFunction} from 'express';
// import { toNewDiaryEntry } from '../utils';
import diaryService from '../services/diaryService';
import { NewEntrySchema } from '../utils';
import * as z from 'zod';
import { DiaryEntry, NewDiaryEntry } from '../types';

const router = express.Router();

const newDiaryParser = ( req: Request, _res: Response, next: NextFunction ) => {
    try {
        NewEntrySchema.parse(req.body);
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

router.get('/', (_req, res: Response<DiaryEntry[]>) => {
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

router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<NewDiaryEntry>) => {
    const addedEntry = diaryService.addDiary(req.body);
    res.json(addedEntry);

});

router.use(errorMiddleware);

export default router;