const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

// Configuração da conexão MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2308",
    database: "pap"
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        return;
    }
    console.log("Conectado ao MySQL!");
});

// Rota para inserir dados na tabela "inscrições"
app.post("/inscrever", (req, res) => {
    const { 
        nome_completo, email, telefone, morada, data_de_nascimento, 
        cartão_de_cidadão, contribuinte, ano, id_curso, habilitações 
    } = req.body;

    if (!nome_completo || !email || !telefone || !morada || !data_de_nascimento || 
        !cartão_de_cidadão || !contribuinte || !ano || !id_curso || !habilitações) {
        return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    const sql = `
        INSERT INTO inscrições 
        (nome_completo, email, telefone, morada, data_de_nascimento, 
        cartão_de_cidadão, contribuinte, ano, id_curso, habilitações) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [nome_completo, email, telefone, morada, data_de_nascimento, 
                   cartão_de_cidadão, contribuinte, ano, id_curso, habilitações], 
        (err, result) => {
            console.log("aloo")
            if (err) {
                console.error("Erro ao inserir dados:", err);
                return res.status(500).json({ message: "Erro ao registrar inscrição." });
            }
            res.json({ message: "Inscrição realizada com sucesso!" });
        }
    );
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

// Iniciar servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
