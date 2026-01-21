import { NewDiaryEntry, Visibility, Weather } from "./types";
import { z } from "zod";

//*With use of zod library, helper functions no longer needed, 
// const isString = (text: unknown): text is string => {
//     return typeof text === 'string' || text instanceof String;
// };

// const parseComment = (comment: unknown): string => {
//     return z.string().parse(comment);
//     // if(!isString(comment)) {
//     //     throw new Error('Incorrect or missing comment');
//     // }
//     // return comment;
// };

//! zod also has built in date parser
// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
// };

// const parseDate = (date: unknown): string => {
//     if ( !isString(date) || !isDate(date)) {
//         throw new Error('Incorrect or missing date: ' + date);
//     }
//     return date;
// };

// const isWeather = (param: string): param is Weather => {
//     return Object.values(Weather).map(v => v.toString()).includes(param);
// };

// const parseWeather = (weather: unknown): Weather => {
//     if ( !isString(weather) || !isWeather(weather)) {
//         throw new Error('Incorrect or missing weather: ' + weather);
//     }
//     return weather;
// };

// const isVisibility = (param: string): param is Visibility => {
//     return Object.values(Visibility).map(v => v.toString()).includes(param);
// };

// const parseVisibility = (visibility: unknown): Visibility => {
//     if ( !isString(visibility) || !isVisibility(visibility)) {
//         throw new Error('Incorrect or missing visibility: ' + visibility);
//     }
//     return visibility;
// };

//? Can create new schema for new diary entry
export const NewEntrySchema = z.object({
    weather: z.enum(Weather),
    visibility: z.enum(Visibility),
    date: z.string().date(),
    comment: z.string().optional(),
});

//*unknown is preferred to any since it does not invalidate esLint rule while still serving the same purpose
export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    return NewEntrySchema.parse(object);
    // if (!object || typeof object !== 'object' ) {
    //     throw new Error('Incoorect or missing data');
    // }

    // //? Use of operator in gurantees that the field exists in object, so no longer have to check in parser
    // if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {

    //     const newEntry: NewDiaryEntry = {
    //         // weather: parseWeather(object.weather), 
    //         // visibility: parseVisibility(object.visibility),
    //         weather: z.enum(Weather).parse(object.weather),
    //         visibility: z.enum(Visibility).parse(object.visibility),
    //         date: z.string().date().parse(object.date),
    //         comment: z.string().parse(object.comment)
    //         // ....
    //     };
        
    //     return newEntry;
    // }

    // throw new Error('Incorrect data: some fields are missing');
    };

// export default toNewDiaryEntry;
