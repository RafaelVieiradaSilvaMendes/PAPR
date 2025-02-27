const mysql = require("mysql2");
const fs = require("fs");

// Configurar conexão com o banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2308",
  database: "pap"
});

// Consultar a tabela "cursos" e salvar como JSON
connection.query("SELECT * FROM cursos", (err, results) => {
  if (err) {
    console.error("Erro ao buscar dados:", err);
    return;
  }

  // Converter resultados para JSON formatado
  const jsonData = JSON.stringify(results, null, 2);

  // Salvar em um arquivo chamado "cursos.json"
  fs.writeFileSync("cursos.json", jsonData, "utf8");

  console.log("Arquivo cursos.json criado com sucesso!");
  connection.end();
});
