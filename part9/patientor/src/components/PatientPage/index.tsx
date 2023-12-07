import { Patient } from "../../types";

interface props {
    patient: Patient | undefined
}

const style: React.CSSProperties = {
    paddingTop: '1em'
};

const patientNameStyle: React.CSSProperties = {
    fontSize: '1.5em',
    fontWeight: 'bold'
};

const PatientPage = ({patient}: props) => {
    if(!patient)
    {
        return null;
    }
    return (
        <div style={style}>
            <div style={patientNameStyle}>{patient.name}</div>
            <div>gender: {patient.gender}</div>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
        </div>
    );
};

export default PatientPage;