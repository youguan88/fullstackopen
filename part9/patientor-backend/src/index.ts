import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    cors(),
    express.json()
);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
require('dotenv').config();

const PORT = 3001;

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});