const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Parse incoming JSON requests
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost', // Replace with your database host
    user: 'root',      // Replace with your MySQL username
    password: '2308',      // Replace with your MySQL password
    database: 'pap'    // Database name
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const data = req.body;

    const query = `
        INSERT INTO inscrições (nome, email, telefone, morada, data_de_nascimento, Cartão_de_cidadão, contribuinte, Ano, curso, habilitações)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        data.nome,
        data.email,
        data.telefone,
        data.morada,
        data.data_de_nascimento,
        data.cartao_de_cidadao,
        data.contribuinte,
        data.ano,
        data.curso,
        data.habilitacoes,
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data.');
            return;
        }

        res.status(200).send('Data inserted successfully.');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});