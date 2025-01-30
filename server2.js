const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa o pacote cors

const app = express();
const port = 3000;

// Configuração da conexão com o MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '2308',
    database: 'pap',
    authPlugins: {
      mysql_clear_password: () => () => Buffer.from('2308')
    }
  });

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    return;
    }
    console.log('Conectado ao MySQL');
});

// Rota para buscar os cursos
app.get('/api/cursos', (req, res) => {
    const query = 'SELECT id_curso, nome FROM cursos';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.json(results);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
