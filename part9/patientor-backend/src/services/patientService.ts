import data from "../../data/patients";
import { Patient, PatientWithExclusion, NewPatientEntry, EntryWithoutId, Entry } from "../types";
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
    return data;
};

const getEntriesWithExclusion = (): PatientWithExclusion[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};

const getEntryByID = (id : string): Patient | undefined => {
    const patient = data.find(x=> x.id === id);
    if (!patient){
        throw new Error(`Unable to find patient with id ${id}`);
    }
    return patient;
};

const addEntry = (obj: NewPatientEntry): Patient => {
    const newObj = { ...obj, id: uuid() };
    data.push(newObj);
    return newObj;
};

const addEntryDetail = (id: Patient["id"], obj: EntryWithoutId) : Entry => {
    if (!obj) {
        throw new Error(`Invalid entry detail provided`);
    }
    const newObj = {... obj, id: uuid()};
    const patient = data.find(x=> x.id === id);
    if (patient)
    {
        patient.entries.push(newObj);
    }
    else {
        throw new Error(`Unable to find patient with id ${id}`);
    }
    return newObj;
};

export default { getEntries, getEntriesWithExclusion, addEntry, getEntryByID, addEntryDetail };