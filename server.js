const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa o pacote cors

const app = express();
const port = 3000;
app.use(express.json)
app.use(cors());


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
    const { nome_completo, email, telefone, morada, data_de_nascimento, cartão_de_cidadão, contribuinte, ano, id_curso, habilitações} = req.body;
    console.log(req.body)
    console.log(req.body.nome)

    // Realize as operações desejadas no banco de dados, por exemplo, inserção de dados
    const query = 'INSERT INTO inscriçoes (Nome_completo, email, telefone, morada, data_de_nascimento, cartão_de_cidadão, contribuinte, Ano, id_curso, habilitações) VALUES (?, ?, ?, ?)';
    pool.query(query, [nome_completo, email, telefone, morada, data_de_nascimento, cartão_de_cidadão, contribuinte, ano, id_curso, habilitações], (error, results) => {
        if (error) {
            console.error('Erro na inserção no MySQL:', error);
            res.status(500).json({ mensagem: 'Erro interno do servidor' + error });
        return;
        }

    res.json({ mensagem: 'Dados enviados com sucesso' });
    });
});

app.get('/api/get-dados', (req, res) => {
    // Realize as operações desejadas no banco de dados, por exemplo, inserção de dados
    const query = 'SELECT * FROM inscriçoes';
    pool.query(query, (error, result) => {
        if (error) {
            console.error('Erro na inserção no MySQL:', error);
            res.status(500).json({ mensagem: 'Erro interno do servidor' });
            return;
        }

    res.json({ mensagem: result });
    });
});

app.get('/api/cursos', (req, res) => {
    const query = 'SELECT id_curso, nome FROM cursos';
    pool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.json(results);
    });
});

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

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data.');
            return;
        }

        res.status(200).send('Data inserted successfully.');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});