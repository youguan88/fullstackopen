import { useState } from "react";
import { EntryWithoutId, Patient } from "../../types";
import { ToggleButton, TextField, Box, Button, InputLabel, Select, MenuItem } from "@mui/material";
import { AxiosError } from "axios";
import PatientService from '../../services/patients';

export const NewEntry: React.FC<{ patient: Patient, setNotification: React.Dispatch<React.SetStateAction<string>>, entries: EntryWithoutId[],  setEntries: React.Dispatch<React.SetStateAction<EntryWithoutId[]>> }>
    = ({ patient, setNotification, entries, setEntries }) => {
        const [description, setDescription] = useState('');
        const [date, setDate] = useState('');
        const [specialist, setSpecialist] = useState('');
        const [healthCheckRating, setHealthCheckRating] = useState('');
        const [diagnosisCodes, setDiagnosisCodes] = useState('');
        const [selected, setSelected] = useState(false);
        const [entrySelected, setEntrySelected] = useState('HealthCheck');
        const [dischargeDate, setDischargeDate] = useState('');
        const [dischargeCriteria, setDischargeCriteria] = useState('');
        const [employerName, setEmployerName] = useState('');
        const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
        const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
        const formStyle: React.CSSProperties = {
            border: '1px black dotted'
        };
        const descriptionStyle: React.CSSProperties = {
            fontSize: '0.75em',
            color: 'grey'
        };

        const handleAddEntry = async (event: React.SyntheticEvent) => {
            event.preventDefault();

            const newEntry = (): EntryWithoutId => {
                switch (entrySelected) {
                    case 'HealthCheck':
                        return {
                            type: 'HealthCheck',
                            date: date,
                            description: description,
                            healthCheckRating: Number(healthCheckRating),
                            specialist: specialist,
                            diagnosisCodes: diagnosisCodes === '' ? undefined : diagnosisCodes.split(','),

                        };
                    case 'Hospital':
                        return {
                            type: 'Hospital',
                            date: date,
                            description: description,
                            specialist: specialist,
                            diagnosisCodes: diagnosisCodes === '' ? undefined : diagnosisCodes.split(','),
                            discharge: {
                                criteria: dischargeCriteria,
                                date: dischargeDate
                            }
                        };
                    case 'Occupational':
                        return {
                            type: 'OccupationalHealthcare',
                            date: date,
                            description: description,
                            specialist: specialist,
                            diagnosisCodes: diagnosisCodes === '' ? undefined : diagnosisCodes.split(','),
                            employerName: employerName,
                            sickLeave: sickLeaveStartDate === '' || sickLeaveEndDate === '' ? undefined : {
                                startDate: sickLeaveStartDate,
                                endDate: sickLeaveEndDate
                            }
                        };
                    default:
                        throw new Error('Unable to parse Entry object');
                }
            };

            try {
                const addedEntry = await PatientService.addEntry(patient.id, newEntry());
                setEntries(entries.concat(addedEntry));
                setDescription('');
                setDate('');
                setSpecialist('');
                setHealthCheckRating('');
                setDiagnosisCodes('');
                setDischargeDate('');
                setDischargeCriteria('');
                setEmployerName('');
                setSickLeaveStartDate('');
                setSickLeaveEndDate('');
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

        if (!selected) {
            return (
                <ToggleButton value="create" onClick={() => setSelected(!selected)}>Create new entry</ToggleButton>
            );
        } else {
            return (
                <div style={formStyle} >
                    <InputLabel id="entry-type-select-label">Entry Type</InputLabel>
                    <Select labelId="entry-type-select-label" id="entry-type-select" label="Entry Type" fullWidth value={entrySelected} onChange={({ target }) => setEntrySelected(target.value)}>
                        <MenuItem value="HealthCheck">New HealthCheck entry</MenuItem>
                        <MenuItem value="Hospital">New Hospital entry</MenuItem>
                        <MenuItem value="Occupational">New Occupational entry</MenuItem>
                    </Select>
                    <form onSubmit={handleAddEntry}>
                        <div style={descriptionStyle}>Description</div>
                        <TextField fullWidth variant="standard" value={description} onChange={(event) => { setDescription(event.target.value); }} />
                        <div style={descriptionStyle}>Date</div>
                        <TextField fullWidth variant="standard" value={date} onChange={(event) => { setDate(event.target.value); }} />
                        <div style={descriptionStyle}>Specialist</div>
                        <TextField fullWidth variant="standard" value={specialist} onChange={(event) => { setSpecialist(event.target.value); }} />
                        {
                            entrySelected === "HealthCheck" && (
                                <>
                                    <div style={descriptionStyle}>Healthcheck rating</div>
                                    <TextField fullWidth variant="standard" value={healthCheckRating} onChange={(event) => { setHealthCheckRating(event.target.value); }} />
                                </>
                            )
                        }
                        <div style={descriptionStyle}>Diagnosis codes</div>
                        <TextField fullWidth variant="standard" value={diagnosisCodes} onChange={(event) => { setDiagnosisCodes(event.target.value); }} />
                        {
                            entrySelected === "Hospital" && (
                                <>
                                    <div style={descriptionStyle}>Discharge date</div>
                                    <TextField fullWidth variant="standard" value={dischargeDate} onChange={(event) => { setDischargeDate(event.target.value); }} />
                                    <div style={descriptionStyle}>Discharge criteria</div>
                                    <TextField fullWidth variant="standard" value={dischargeCriteria} onChange={(event) => { setDischargeCriteria(event.target.value); }} />
                                </>
                            )
                        }
                        {
                            entrySelected === "Occupational" && (
                                <>
                                    <div style={descriptionStyle}>Employer Name</div>
                                    <TextField fullWidth variant="standard" value={employerName} onChange={(event) => { setEmployerName(event.target.value); }} />
                                    <div style={descriptionStyle}>Sick Leave Start Date</div>
                                    <TextField fullWidth variant="standard" value={sickLeaveStartDate} onChange={(event) => { setSickLeaveStartDate(event.target.value); }} />
                                    <div style={descriptionStyle}>Sick Leave End Date</div>
                                    <TextField fullWidth variant="standard" value={sickLeaveEndDate} onChange={(event) => { setSickLeaveEndDate(event.target.value); }} />
                                </>
                            )
                        }
                        <Box display="flex" justifyContent="flex-end">
                            <Button variant="contained" color="error" onClick={() => setSelected(!selected)}>Cancel</Button>
                            <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: 'auto' }}>Add</Button>
                        </Box>
                    </form>
                </div>
            );
        }
    };