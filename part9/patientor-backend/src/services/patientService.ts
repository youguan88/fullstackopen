import data from "../../data/patients";
import { Patient, PatientWithExclusion, NewPatientEntry } from "../types";
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
        return undefined;
    }
    return patient;
};

const addEntry = (obj: NewPatientEntry): Patient => {
    const newObj = { ...obj, id: uuid() };
    data.push(newObj);
    return newObj;
};

export default { getEntries, getEntriesWithExclusion, addEntry, getEntryByID };