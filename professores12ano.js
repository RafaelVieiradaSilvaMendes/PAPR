const mysql = require("mysql2");
const fs = require("fs");

// Configurar conexão com o banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2308",
  database: "pap"
});

const anoDesejado = 12;

// Buscar os IDs e o ano na tabela disciplina_professores
const queryDisciplinaProfessores = `
  SELECT id_disciplina, id_curso, id_professores, ano 
  FROM disciplina_professores 
  WHERE ano = ?;
`;

connection.query(queryDisciplinaProfessores, [anoDesejado], (err, disciplinaProfessores) => {
  if (err) {
    console.error("Erro ao buscar disciplina_professores:", err);
    connection.end();
    return;
  }

  if (disciplinaProfessores.length === 0) {
    console.log("Nenhum dado encontrado para o ano especificado.");
    connection.end();
    return;
  }

  // Criar um array de promessas para buscar os nomes correspondentes
  const promises = disciplinaProfessores.map((dp) => {
    return new Promise((resolve, reject) => {
      // Consultar nome do professor
      connection.query(
        "SELECT nome_professor FROM professores WHERE id_professores = ?", 
        [dp.id_professores], 
        (err, professor) => {
          if (err) return reject(err);
          const nome_professor = professor[0]?.nome_professor || "Desconhecido";

          // Consultar nome da disciplina
          connection.query(
            "SELECT nome_disciplina FROM disciplina WHERE id_disciplina = ?", 
            [dp.id_disciplina], 
            (err, disciplina) => {
              if (err) return reject(err);
              const nome_disciplina = disciplina[0]?.nome_disciplina || "Desconhecido";

              // Consultar nome do curso
              connection.query(
                "SELECT nome_curso FROM cursos WHERE id_curso = ?", 
                [dp.id_curso], 
                (err, curso) => {
                  if (err) return reject(err);
                  const nome_curso = curso[0]?.nome_curso || "Desconhecido";

                  // Montar o objeto final com os nomes corretamente definidos
                  resolve({
                    nome_professor,
                    nome_disciplina,
                    nome_curso,
                    id_disciplina: dp.id_disciplina,
                    id_curso: dp.id_curso,
                    id_professores: dp.id_professores,
                    ano: dp.ano
                  });
                }
              );
            }
          );
        }
      );
    });
  });

  // Executar todas as consultas e salvar no arquivo JSON
  Promise.all(promises)
    .then((results) => {
      const jsonData = JSON.stringify(results, null, 2);
      fs.writeFileSync("professores12ano.json", jsonData, "utf8");
      console.log("Arquivo professores.json criado com sucesso!");
      connection.end();
    })
    .catch((err) => {
      console.error("Erro ao buscar dados:", err);
      connection.end();
    });
});