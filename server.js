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


// Rota para inserir dados no banco
app.post("/inscrever", (req, res) => {
    const { nome_completo, email, telefone, morada, data_de_nascimento, cartao_de_cidadao, contribuinte, ano, id_curso, habilitacoes } = req.body;
    console.log("aloo")
    const sql = "INSERT INTO inscriçoes (nome_completo, email, telefone, morada, data_de_nascimento, cartao_de_cidadao, contribuinte, ano, id_curso, habilitacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    pool.query(sql, [nome_completo, email, telefone, morada, data_de_nascimento, cartao_de_cidadao, contribuinte, ano, id_curso, habilitacoes], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: "Inscrição realizada com sucesso!" });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});