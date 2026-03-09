const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let misDestinos = [];

app.get('/my', (req, res) => {
    res.json(misDestinos);
});

app.post('/my', (req, res) => {
    console.log('Body recibido:', req.body);

    if (!req.body || typeof req.body.nuevo !== 'string' || req.body.nuevo.trim() === '') {
        return res.status(400).json({ error: 'Body inválido' });
    }

    misDestinos.push(req.body.nuevo.trim());

    return res.status(200).json({
        status: 200,
        data: misDestinos,
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});