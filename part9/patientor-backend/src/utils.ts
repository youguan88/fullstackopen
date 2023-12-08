import { Gender, NewPatientEntry, Entry, Diagnosis, EntryWithoutId, EntryType, HealthCheckRating, Discharge, SickLeave } from "./types";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(object.entries)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: a field missing');
};

export const toNewEntryDetail = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {
        const type = parseType(object.type);
        const description = parseDescription(object.description);
        const date = parseDate(object.date);
        const specialist = parseSpecialist(object.specialist);
        let diagnosisCodes: Array<Diagnosis['code']> = [];
        if ('diagnosisCodes' in object) {
            diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        }
        switch (type) {
            case EntryType.HealthCheck:
                if ('healthCheckRating' in object) {
                    const newEntryDetail: EntryWithoutId = {
                        type,
                        description,
                        date,
                        specialist,
                        diagnosisCodes,
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    };
                    return newEntryDetail;
                }
                throw new Error('Incorrect data: a field missing');
            case EntryType.Hospital:
                if ('discharge' in object) {
                    const newEntryDetail: EntryWithoutId = {
                        type,
                        description,
                        date,
                        specialist,
                        diagnosisCodes,
                        discharge: parseDischarge(object.discharge)
                    };
                    return newEntryDetail;
                }
                throw new Error('Incorrect data: a field missing');
            case EntryType.OccupationalHealthcare:
                if ('employerName' in object) {
                    const newEntryDetail: EntryWithoutId = {
                        type,
                        description,
                        date,
                        specialist,
                        diagnosisCodes,
                        employerName: parseEmployerName(object.employerName)
                    };
                    if ('sickLeave' in object) {
                        const sickLeave: SickLeave = parseSickLeave(object.sickLeave);
                        newEntryDetail.sickLeave = sickLeave;
                    }
                    return newEntryDetail;
                }
                throw new Error('Incorrect data: a field missing');
            default:
                assertNever(type);
                throw new Error('Incorrect data: a field missing');
        }
    }
    throw new Error('Incorrect data: a field missing');
};

export default toNewPatientEntry;

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

function parseName(name: unknown): string {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

function parseDate(date: unknown): string {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
}

function parseSSN(ssn: unknown): string {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
}

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(item => item.toString()).includes(gender);
};

function parseGender(gender: unknown): Gender {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Gender selected is not in provided options: ' + gender);
    }
    return gender;
}

function parseOccupation(occupation: unknown): string {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
}

const isEntry = (entries: unknown): entries is Entry[] => {
    return Array.isArray(entries);
};

function parseEntries(entries: unknown): Entry[] {
    if (!isEntry(entries)) {
        throw new Error('Incorrect or missing entries');
    }
    return entries;
}

const isEntryType = (type: unknown): type is EntryType => {
    if (typeof type !== 'string') {
        throw new Error('EntryType should be in string fromat');
    }
    return Object.values(EntryType).map(x => x.toString()).includes(type);
};

function parseType(type: unknown) {
    if (!isEntryType(type)) {
        throw new Error('Incorrect type');
    }
    return type;
}

const isHealthCheckRating = (healthCheckRating: unknown): healthCheckRating is HealthCheckRating => {
    if (typeof healthCheckRating !== 'string') {
        throw new Error('EntryType should be in string fromat');
    }
    return Object.values(HealthCheckRating).map(x => x.toString()).includes(healthCheckRating);
};

function parseHealthCheckRating(healthCheckRating: unknown): HealthCheckRating {
    if (!isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect healthCheckRating provided');
    }
    return healthCheckRating;
}

function parseDescription(description: unknown): string {
    if (!isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
}

function parseSpecialist(specialist: unknown): string {
    if (!isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
}

const isDiagnosisCodes = (diagnosisCodes: unknown): diagnosisCodes is Array<Diagnosis['code']> => {
    return (Array.isArray(diagnosisCodes) && diagnosisCodes.every(code => code instanceof String));
};

function parseDiagnosisCodes(diagnosisCodes: unknown): Array<Diagnosis['code']> {
    if (!isDiagnosisCodes(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnosisCodes');
    }
    return diagnosisCodes;
}

const isDischarge = (discharge: unknown): discharge is Discharge => {
    if (!discharge || typeof discharge !== 'object') {
        return false;
    }
    if ('date' in discharge && 'criteria' in discharge) {
        return (!isString(discharge.date) && isString(discharge.criteria));
    }
    return false;
};

function parseDischarge(discharge: unknown): Discharge {
    if (!isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge');
    }
    return discharge;
}

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
    if (!sickLeave || typeof sickLeave !== 'object') {
        return false;
    }
    if ('startDate' in sickLeave && 'endDate' in sickLeave && isString(sickLeave.startDate) && isString(sickLeave.endDate)) {
        return (!isDate(sickLeave.startDate) && isDate(sickLeave.endDate));
    }
    return false;
};

function parseSickLeave(sickLeave: unknown): SickLeave {
    if (!isSickLeave(sickLeave)) {
        throw new Error('Incorrect or missing sickLeave');
    }
    return sickLeave;
}

function parseEmployerName(employerName: unknown): string {
    if (!isString(employerName)) {
        throw new Error('Incorrect or missing specialist');
    }
    return employerName;
}

