import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

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

        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addEntry(newPatientEntry);
        res.json(addedEntry);
    } catch (error) {
        res.send("Error adding patient").end(400);
    }
});

export default router;