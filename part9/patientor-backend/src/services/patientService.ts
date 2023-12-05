import data from "../../data/patients";
import { Patient, PatientWithExclusion, NewPatientEntry } from "../types";
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
    return data;
};

const getEntriesWithExclusion = (): PatientWithExclusion[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addEntry = (obj: NewPatientEntry): Patient => {
    const newObj = { ...obj, id: uuid() };
    data.push(newObj);
    return newObj;
};

export default { getEntries, getEntriesWithExclusion, addEntry };