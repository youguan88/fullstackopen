import { Diagnosis, Patient } from "../../types";

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
                            <div>
                                <div>{entry.date} {entry.description}</div>
                                <ul>
                                    {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                                        entry.diagnosisCodes.map(code => {
                                            const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
                                            return (
                                                <li>
                                                    {code}
                                                    {diagnosis && (` ${diagnosis.name}`)}
                                                </li>
                                            );
                                        })
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default PatientPage;