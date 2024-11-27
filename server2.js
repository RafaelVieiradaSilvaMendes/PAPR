const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Configuração da conexão com o banco de dados
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
    const query = 'SELECT id, nome FROM cursos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err);
            res.status(500).send('Erro no servidor');
            return;
        }
        res.json(results);
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
