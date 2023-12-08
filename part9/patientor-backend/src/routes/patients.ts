import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntryDetail } from '../utils';
import { EntryWithoutId, NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getEntriesWithExclusion());
});

router.get('/:id', (req, res) => {
    try {
        const id = req.params.id;
        res.send(patientService.getEntryByID(id));
    } catch (error) {
        res.send(`Error retrieving patient: ${error}`);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry: NewPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addEntry(newPatientEntry);
        res.json(addedEntry);
    } catch (error) {
        res.send("Error adding patient").end(400);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const newEntryDetail = toNewEntryDetail(req.body);
        const addedEntryDetail: EntryWithoutId = patientService.addEntryDetail(id, newEntryDetail);
        res.json(addedEntryDetail);
    } catch (error) {
        res.send(`Error adding patient entry due to ${error}}`).end(400);
    }
});

export default router;