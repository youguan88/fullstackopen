import { Diagnosis, Patient, EntryWithoutId } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import React, { useEffect, useState } from "react";
import { Alert, Box, Button, TextField } from "@mui/material";
import PatientService from '../../services/patients';
import { AxiosError } from "axios";

interface props {
    patient: Patient | undefined,
    diagnoses: Diagnosis[] | undefined
}

const style: React.CSSProperties = {
    paddingTop: '1em'
};

const patientNameStyle: React.CSSProperties = {
    fontSize: '1.5em',
    fontWeight: 'bold'
};

const entryStyle: React.CSSProperties = {
    paddingBottom: '1em',
    border: 'black solid 1px'
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<{ entry: EntryWithoutId, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />;
        default:
            assertNever(entry);
    }
};

const HospitalEntry: React.FC<{ entry: EntryWithoutId, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
    if (entry.type === "Hospital") {
        return (
            <div>
                <div>{entry.date} <LocalHospitalIcon /></div>
                <div><i>{entry.description}</i></div>
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                    <ul>
                        {entry.diagnosisCodes.map(code => {
                            const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
                            return (
                                <li key={code}>
                                    {code}
                                    {diagnosis && (` ${diagnosis.name}`)}
                                </li>
                            );
                        })}
                    </ul>
                )}
                <div>Discharged on {entry.discharge.date} {entry.discharge.criteria}</div>
                <div>diagnose by {entry.specialist}</div>
            </div>);
    }
};

const HealthCheckEntry: React.FC<{ entry: EntryWithoutId }> = ({ entry }) => {
    if (entry.type === 'HealthCheck') {
        const healthCheckRatingColor = {
            0: "green",
            1: "yellow",
            2: "orange",
            3: "red"
        };
        return (
            <div>
                <div>{entry.date} <MedicalServicesIcon /></div>
                <div><i>{entry.description}</i></div>
                <div><FavoriteIcon sx={{ color: healthCheckRatingColor[entry.healthCheckRating] }} /></div>
                <div>diagnose by {entry.specialist}</div>
            </div>);
    }
};


const OccupationalHealthcareEntry: React.FC<{ entry: EntryWithoutId, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
    if (entry.type === 'OccupationalHealthcare') {
        return (
            <div>
                <div>{entry.date} <WorkIcon /> {entry.employerName}</div>
                <div><i>{entry.description}</i></div>
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                    <ul>
                        {entry.diagnosisCodes.map(code => {
                            const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
                            return (
                                <li key={code}>
                                    {code}
                                    {diagnosis && (` ${diagnosis.name}`)}
                                </li>
                            );
                        })}
                    </ul>
                )}
                {entry.sickLeave && entry.sickLeave.startDate && entry.sickLeave.endDate &&
                    (<div>Sick leave from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</div>)}
                <div>diagnose by {entry.specialist}</div>
            </div>);
    }
};

const NewEntry: React.FC<{
    patient: Patient,
    setNotification: React.Dispatch<React.SetStateAction<string>>,
    setEntries: React.Dispatch<React.SetStateAction<EntryWithoutId[]>>
}>
    = ({ patient, setNotification, setEntries }) => {
        const [description, setDescription] = useState('');
        const [date, setDate] = useState('');
        const [specialist, setSpecialist] = useState('');
        const [healthCheckRating, setHealthCheckRating] = useState('');
        const [diagnosisCodes, setDiagnosisCodes] = useState('');
        const formStyle: React.CSSProperties = {
            border: '1px black dotted'
        };
        const descriptionStyle: React.CSSProperties = {
            fontSize: '0.75em',
            color: 'grey'
        };

        const handleAddEntry = async (event: React.SyntheticEvent) => {
            event.preventDefault();
            const newEntry: EntryWithoutId = {
                type: "HealthCheck",
                date: date,
                description: description,
                healthCheckRating: Number(healthCheckRating),
                specialist: specialist,
                diagnosisCodes: diagnosisCodes === '' ? undefined : diagnosisCodes.split(',')
            };
            try {
                const addedEntry = await PatientService.addEntry(patient.id, newEntry);
                setEntries(patient.entries.concat(addedEntry));
            } catch (error) {
                console.log(error);
                if (error instanceof AxiosError && error.response) {
                    setNotification(error.response.data);
                    setTimeout(() => {
                        setNotification('');
                    }, 5000);
                }
            }
        };

        return (
            <form style={formStyle} onSubmit={handleAddEntry}>
                <h3>New HealthCheck entry</h3>
                <div style={descriptionStyle}>Description</div>
                <TextField fullWidth variant="standard" value={description} onChange={(event) => { setDescription(event.target.value); }} />
                <div style={descriptionStyle}>Date</div>
                <TextField fullWidth variant="standard" value={date} onChange={(event) => { setDate(event.target.value); }} />
                <div style={descriptionStyle}>Specialist</div>
                <TextField fullWidth variant="standard" value={specialist} onChange={(event) => { setSpecialist(event.target.value); }} />
                <div style={descriptionStyle}>Healthcheck rating</div>
                <TextField fullWidth variant="standard" value={healthCheckRating} onChange={(event) => { setHealthCheckRating(event.target.value); }} />
                <div style={descriptionStyle}>Diagnosis codes</div>
                <TextField fullWidth variant="standard" value={diagnosisCodes} onChange={(event) => { setDiagnosisCodes(event.target.value); }} />
                <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="error">Cancel</Button>
                    <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: 'auto' }}>Add</Button>
                </Box>
            </form>

        );
    };

const Notification: React.FC<({ notification: string })> = ({ notification }) => {
    if (notification === '') {
        return null;
    }
    return (
        <Alert severity="error">{notification}</Alert>
    );
};


const PatientPage = ({ patient, diagnoses }: props) => {
    const [notification, setNotification] = useState('');
    const [entries, setEntries] = useState<EntryWithoutId[]>([]);
    useEffect(() => {
        if (patient) {
            setEntries(patient.entries);
        }
    }, [patient]);
    if (!patient || !diagnoses) {
        return null;
    }
    return (
        <div style={style}>
            <div style={patientNameStyle}>{patient.name}</div>
            <div>gender: {patient.gender}</div>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <Notification notification={notification} />
            <NewEntry patient={patient} setNotification={setNotification} setEntries={setEntries} />
            {entries &&
                (
                    <div>
                        <h3>entries</h3>
                        {entries.map(entry => (
                            <div style={entryStyle} key={entry.description}>
                                <EntryDetails entry={entry} diagnoses={diagnoses} />
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default PatientPage;