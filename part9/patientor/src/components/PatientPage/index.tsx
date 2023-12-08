import { Diagnosis, Patient, EntryWithoutId } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

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
                                <li>
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
                                <li>
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


const PatientPage = ({ patient, diagnoses }: props) => {
    if (!patient || !diagnoses) {
        return null;
    }
    const entries = patient.entries;
    return (
        <div style={style}>
            <div style={patientNameStyle}>{patient.name}</div>
            <div>gender: {patient.gender}</div>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            {entries &&
                (
                    <div>
                        <h3>entries</h3>
                        {entries.map(entry => (
                            <div style={entryStyle}>
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