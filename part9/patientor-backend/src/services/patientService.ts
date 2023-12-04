import data from "../../data/patients"
import { Patient, PatientWithExclusion } from "../types"

const getEntries = (): Patient[] => {
    return data
}

const getEntriesWithExclusion = (): PatientWithExclusion[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }))
}

export default { getEntries, getEntriesWithExclusion }