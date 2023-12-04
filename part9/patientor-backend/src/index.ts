const express = require('express');
const cors = require('cors')
import diagnosesRouter from './routes/diagnoses'
import patientRouter from './routes/patients'

const app = express();
app.use(
    cors(),
    express.json()
);
require('dotenv').config()

const PORT = 3001;

app.get('/api/ping', (_req: any, res: { send: (arg0: string) => void; }) => {
    console.log("Someone pinged here");
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientRouter)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});