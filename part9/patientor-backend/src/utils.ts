import { Gender, NewPatientEntry } from "./types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object )
    {
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: a field missing');
};

export default toNewPatientEntry;

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

function parseName(name: unknown): string {
    if(!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
}

const isDate = (date: string) : boolean => {
    return Boolean(Date.parse(date));
};

function parseDateOfBirth(dateOfBirth: unknown): string {
    if(!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect date: ' + dateOfBirth);
    }
    return dateOfBirth;
}

function parseSSN(ssn: unknown): string {
    if(!isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
}

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(item => item.toString()).includes(gender);
};

function parseGender(gender: unknown): Gender {
    if(!isString(gender) || !isGender(gender))
    {
        throw new Error('Gender selected is not in provided options: ' + gender);
    }
    return gender;
}

function parseOccupation(occupation: unknown): string {
    if(!isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
}
