const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let misDestinos = [];

const ciudades = [
    'Barcelona',
    'Madrid',
    'Barranquilla',
    'Bogotá',
    'Buenos Aires',
    'Montevideo',
    'Lima',
    'Santiago',
    'Cartagena',
    'Valencia',
    'Sevilla',
    'Málaga',
    'París',
    'Roma',
    'Londres',
];

app.get('/ciudades', (req, res) => {
    const q = (req.query.q || '').toString().toLowerCase();

    const results = ciudades.filter((c) => c.toLowerCase().includes(q));
    res.json(results);
});

app.get('/cities', (req, res) => {
    const q = (req.query.q || '').toString().toLowerCase();

    const results = ciudades.filter((c) => c.toLowerCase().includes(q));
    res.json(results);
});

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

app.get('/translations', (req, res) => {
    const lang = (req.query.lang || 'es').toString().toLowerCase();

    const translations = {
        es: {
            IDIOMA: 'Idioma',
            HOLA: 'Hola',
            BIENVENIDA: 'Bienvenido a Angular Wishlist',
        },
        en: {
            IDIOMA: 'Language',
            HOLA: 'Hello',
            BIENVENIDA: 'Welcome to Angular Wishlist',
        },
        fr: {
            IDIOMA: 'Langue',
            HOLA: 'Bonjour',
            BIENVENIDA: 'Bienvenue sur Angular Wishlist',
        },
    };

    res.json(translations[lang] || translations.es);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});