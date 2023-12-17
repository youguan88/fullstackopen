import { useState } from "react";
import { Diagnosis, EntryWithoutId, Patient, HealthCheckRating } from "../../types";
import { ToggleButton, TextField, Box, Button, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { AxiosError } from "axios";
import PatientService from '../../services/patients';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

export const NewEntry: React.FC<{
    patient: Patient,
    setNotification: React.Dispatch<React.SetStateAction<string>>,
    entries: EntryWithoutId[],
    setEntries: React.Dispatch<React.SetStateAction<EntryWithoutId[]>>,
    diagnoses: Diagnosis[]
}>
    = ({ patient, setNotification, entries, setEntries, diagnoses }) => {
        const [description, setDescription] = useState('');
        const [date, setDate] = useState('');
        const [specialist, setSpecialist] = useState('');
        const codeList = Object.entries(HealthCheckRating).map(([value])=>({value})).filter(x=> isNaN(Number(x.value)));
        const [healthCheckRating, setHealthCheckRating] = useState('');
        const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
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
                            healthCheckRating: HealthCheckRating[healthCheckRating as keyof typeof HealthCheckRating],
                            specialist: specialist,
                            diagnosisCodes: diagnosisCodes

                        };
                    case 'Hospital':
                        return {
                            type: 'Hospital',
                            date: date,
                            description: description,
                            specialist: specialist,
                            diagnosisCodes: diagnosisCodes,
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
                            diagnosisCodes: diagnosisCodes,
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
                setDiagnosisCodes([]);
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

        const addDiagnosisCodeToState = (event : SelectChangeEvent<string|string[]>)  => {
            const codes = diagnosisCodes.concat(event.target.value);
            setDiagnosisCodes(Array.from(new Set(codes)));
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
                        <DatePicker value={date} onChange={(newValue: dayjs.ConfigType) => { setDate(newValue === undefined || newValue === null ? '' : newValue.toString()); }} />
                        <div style={descriptionStyle}>Specialist</div>
                        <TextField fullWidth variant="standard" value={specialist} onChange={(event) => { setSpecialist(event.target.value); }} />
                        {
                            entrySelected === "HealthCheck" && (
                                <>
                                    <div style={descriptionStyle}>Healthcheck rating</div>
                                    <Select autoWidth value={healthCheckRating} onChange={({target}) => setHealthCheckRating(target.value)}>
                                        {codeList.map(x=> {
                                            return (
                                                <MenuItem key={x.value} value={x.value}>
                                                    {x.value}
                                                </MenuItem>);   
                                        })}
                                    </Select>
                                </>
                            )
                        }
                        <div style={descriptionStyle}>Diagnosis codes</div>
                        <Select fullWidth multiple value={diagnosisCodes} onChange={addDiagnosisCodeToState}>
                            {Object.values(diagnoses).map(x => {
                                return (<MenuItem key={x.code} value={x.code}>
                                    {x.code} - {x.name}
                                </MenuItem>);
                            })}
                        </Select>
                        {
                            entrySelected === "Hospital" && (
                                <>
                                    <div style={descriptionStyle}>Discharge date</div>
                                    <DatePicker value={dischargeDate} onChange={(newValue: dayjs.ConfigType) => { setDischargeDate(newValue === undefined || newValue === null ? '' : newValue.toString()); }} />
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
                                    <DatePicker value={sickLeaveStartDate} onChange={(newValue: dayjs.ConfigType) => { setSickLeaveStartDate(newValue === undefined || newValue === null ? '' : newValue.toString()); }} />
                                    <div style={descriptionStyle}>Sick Leave End Date</div>
                                    <DatePicker value={sickLeaveEndDate} onChange={(newValue: dayjs.ConfigType) => { setSickLeaveEndDate(newValue === undefined || newValue === null ? '' : newValue.toString()); }} />
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