const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
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

// Testar conexão com o banco de dados
pool.query("SELECT 1", (err, results) => {
    if (err) {
        console.error("Erro ao testar conexão com MySQL:", err);
    } else {
        console.log("Conexão com MySQL funcionando!");
    }
});

// Rota para inserir dados no banco
app.post("/inscrever", (req, res) => {
    console.log("Recebi um POST para /inscrever");
    console.log("Dados recebidos:", req.body);

    const { nome_completo, email, telefone, morada, data_de_nascimento, cartao_de_cidadao, contribuinte, ano, id_curso, habilitacoes } = req.body;

    // Verifica se todos os campos necessários foram fornecidos
    if (!nome_completo || !email || !telefone || !morada || !data_de_nascimento || !cartao_de_cidadao || !contribuinte || !ano || !id_curso || !habilitacoes) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const sql = "INSERT INTO inscricoes (nome_completo, email, telefone, morada, data_de_nascimento, cartao_de_cidadao, contribuinte, ano, id_curso, habilitacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    pool.query(sql, [nome_completo, email, telefone, morada, data_de_nascimento, cartao_de_cidadao, contribuinte, ano, id_curso, habilitacoes], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Inscrição realizada com sucesso!" });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});