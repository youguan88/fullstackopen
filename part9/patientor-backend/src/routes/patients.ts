import express from 'express'
import patientService from '../services/patientService'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(patientService.getEntriesWithExclusion())
})

router.post('/', (req, res) => {
    try {
        const body = req.body
        res.send(patientService.addEntry(body))
    } catch (error) {
        res.json("Error adding patient").end(400)
    }
})

export default router