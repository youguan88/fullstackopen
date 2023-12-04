"use strict";
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors(), express.json());
require('dotenv').config();
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
    console.log("Someone pinged here");
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
