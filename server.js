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

// Adiciona middleware para parsear o corpo das requisições como JSON
app.use(bodyParser.json());
// Adiciona middleware do cors
app.use(cors());

app.post('/api/enviar-dados', (req, res) => {
    const { Nome_completo, data_de_nascimento, Ano, morada } = req.body;

    // Realize as operações desejadas no banco de dados, por exemplo, inserção de dados
    const query = 'INSERT INTO inscrições (Nome_completo, data_de_nascimento, Ano, morada) VALUES (?, ?, ?, ?, ?)';
    pool.query(query, [Nome_completo, data_de_nascimento, Ano, morada], (error, results) => {
        if (error) {
            console.error('Erro na inserção no MySQL:', error);
            res.status(500).json({ mensagem: 'Erro interno do servidor' });
        return;
        }

    res.json({ mensagem: 'Dados enviados com sucesso' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});