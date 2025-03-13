-- --------------------------------------------------------
-- Anfitrião:                    127.0.0.1
-- Versão do servidor:           9.2.0 - MySQL Community Server - GPL
-- SO do servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- A despejar estrutura da base de dados para pap
CREATE DATABASE IF NOT EXISTS `pap` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pap`;

-- A despejar estrutura para tabela pap.alunos
CREATE TABLE IF NOT EXISTS `alunos` (
  `nome_completo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `morada` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `data_de_nascimento` date NOT NULL DEFAULT (0),
  `cartao_de_cidadao` int NOT NULL DEFAULT '0',
  `contribuinte` int NOT NULL DEFAULT (0),
  `ano` int NOT NULL,
  `habilitacoes` int NOT NULL,
  PRIMARY KEY (`cartao_de_cidadao`) USING BTREE,
  CONSTRAINT `FK_alunos_inscriçoes` FOREIGN KEY (`cartao_de_cidadao`) REFERENCES `inscricoes` (`cartao_de_cidadao`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- A despejar dados para tabela pap.alunos: ~2 rows (aproximadamente)
DELETE FROM `alunos`;
INSERT INTO `alunos` (`nome_completo`, `email`, `morada`, `data_de_nascimento`, `cartao_de_cidadao`, `contribuinte`, `ano`, `habilitacoes`) VALUES
	('Rafael Mendes', 'Rafaelmendes2302@gmail.com', 'rua da estrada Velha Nº 182 Valongo', '2007-02-23', 31237795, 259423009, 10, 9);

-- A despejar estrutura para tabela pap.cursos
CREATE TABLE IF NOT EXISTS `cursos` (
  `id_curso` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'AUTO_INCREMENT',
  `nome_curso` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `saídas profissionais` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `carga horária` int NOT NULL,
  PRIMARY KEY (`id_curso`),
  UNIQUE KEY `nome_curso` (`nome_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- A despejar dados para tabela pap.cursos: ~2 rows (aproximadamente)
DELETE FROM `cursos`;
INSERT INTO `cursos` (`id_curso`, `nome_curso`, `saídas profissionais`, `carga horária`) VALUES
	('1', 'Curso Profissional Técnico de Informática de Gestão', 'Instalação e Manutenção de computadores; Cybersegurança; Técnico de redes; Administração de utilizadores; Administrador de sistemas e de redes; Instalação e Manutenção de Redes; Gestão de servidores de rede.', 3600),
	('2', 'Curso Profissional Técnico de Desporto', 'Autarquias; Clubes desportivos; Associações desportivas; Empresas de aventura; Ginásios; Organização de eventos; Comércio e fabrico de material desportivo.', 3300);

-- A despejar estrutura para tabela pap.disciplina
CREATE TABLE IF NOT EXISTS `disciplina` (
  `id_disciplina` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'AUTO_INCREMENT',
  `nome_disciplina` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `modulos` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `carga_horaria` int NOT NULL,
  `id_curso` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `ano` int NOT NULL,
  PRIMARY KEY (`id_disciplina`),
  KEY `id_curso` (`id_curso`),
  KEY `nome_disciplina` (`nome_disciplina`),
  CONSTRAINT `FK_disciplina_cursos` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- A despejar dados para tabela pap.disciplina: ~67 rows (aproximadamente)
DELETE FROM `disciplina`;
INSERT INTO `disciplina` (`id_disciplina`, `nome_disciplina`, `modulos`, `carga_horaria`, `id_curso`, `ano`) VALUES
	('1', 'PortuguêsIG', 'Módulo 1-3', 107, '1', 10),
	('10', 'Tecnologias de Informação e ComunicaçãoIG', 'Módulo 2, 1, 3, 5', 100, '1', 10),
	('11', 'Organização de Empresas e Aplicações de GestãoIG', 'Módulo 1-5', 76, '1', 10),
	('12', 'Organização de Empresas e Aplicações de GestãoIG', 'Módulo 6-9', 74, '1', 11),
	('13', 'Organização de Empresas e Aplicações de GestãoIG', 'Módulo 10-12', 70, '1', 12),
	('14', 'MatemáticaIG', 'A1, A2, A3, A4', 135, '1', 10),
	('15', 'MatemáticaIG', 'A5, A6, A7', 111, '1', 11),
	('16', 'MatemáticaIG', 'A8, A9, A10', 54, '1', 12),
	('17', 'EconomiaIG', 'Módulo 1-3', 77, '1', 10),
	('18', 'EconomiaIG', 'Módulo 4-6', 72, '1', 11),
	('19', 'EconomiaIG', 'Módulo 7-8', 51, '1', 12),
	('2', 'PortuguêsIG', 'Módulo 4-6', 107, '1', 11),
	('20', 'Educação FísicaIG', 'Módulo 1, 4, 7, 10, 14, 13', 53, '1', 10),
	('21', 'Educação FísicaIG', 'Módulo 2, 5, 8, 11, 15, 13', 47, '1', 11),
	('22', 'Educação FísicaIG', 'Módulo 3, 6, 9, 12, 16, 13', 40, '1', 12),
	('23', 'Linguagens de ProgramaçãoIG', 'Módulo 1-9', 227, '1', 10),
	('24', 'Linguagens de ProgramaçãoIG', 'Módulo 10-14', 150, '1', 11),
	('25', 'Linguagens de ProgramaçãoIG', 'Módulo 15-17', 81, '1', 12),
	('26', 'Sistemas de InformaçãoIG', 'Módulo 1-3', 93, '1', 10),
	('27', 'Sistemas de InformaçãoIG', 'Módulo 4-6', 87, '1', 11),
	('28', 'Sistemas de InformaçãoIG', 'Módulo 7-8', 72, '1', 12),
	('29', 'Aplicações Informáticas e Sistemas de ExploraçãoIG', 'Módulo 5-5', 63, '1', 10),
	('3', 'PortuguêsIG', 'Módulo 7-9', 106, '1', 12),
	('30', 'Aplicações Informáticas e Sistemas de ExploraçãoIG', 'Módulo 6-7', 54, '1', 11),
	('31', 'Aplicações Informáticas e Sistemas de ExploraçãoIG', 'Módulo 1-3', 66, '1', 12),
	('32', 'Formação em Contexto de TrabalhoIG', 'Módulo 1', 200, '1', 11),
	('33', 'Formação em Contexto de TrabalhoIG', 'Módulo 2', 400, '1', 12),
	('34', 'PortuguêsTD', 'Módulo 1-3', 106, '2', 10),
	('35', 'PortuguêsTD', 'Módulo 4-6', 107, '2', 11),
	('36', 'PortuguêsTD', 'Módulo 7-9', 107, '2', 12),
	('37', 'InglêsTD', '1-33', 70, '2', 10),
	('38', 'InglêsTD', '4-6', 74, '2', 11),
	('39', 'InglêsTD', '7-9', 76, '2', 12),
	('4', 'InglêsIG', 'Módulo 1-3', 76, '1', 10),
	('40', 'Área de IntegraçãoTD', 'Módulo 1-2', 76, '2', 10),
	('41', 'Área de IntegraçãoTD', 'Módulo 3-4', 74, '2', 11),
	('42', 'Área de IntegraçãoTD', 'Módulo 5-6', 70, '2', 12),
	('43', 'Tecnologias de Informação e ComunicaçãoTD', '2, 1, 3, 5', 100, '2', 12),
	('44', 'Educação FísicaTD', '1, 4, 7, 10, 14, 13', 53, '2', 10),
	('45', 'Educação FísicaTD', '2, 5, 8, 11, 15, 13', 47, '2', 11),
	('46', 'Educação FísicaTD', '3, 6, 9, 12, 16, 13', 20, '2', 12),
	('47', 'MatemáticaTD', 'A2, A6, B1', 98, '2', 10),
	('48', 'MatemáticaTD', 'A10, A7', 48, '2', 11),
	('49', 'MatemáticaTD', 'A9, A3', 54, '2', 12),
	('5', 'InglêsIG', 'Módulo 4-6', 74, '1', 11),
	('50', 'PsicologiaTD', 'P2, P3, P4, P6', 100, '2', 10),
	('51', 'Estudo do MovimentoTD', '1-3', 90, '2', 10),
	('52', 'Estudo do MovimentoTD', '4-5', 50, '2', 11),
	('53', 'Estudo do MovimentoTD', '6-7', 60, '2', 12),
	('54', 'Introdução ao DesportoTD', '7250, 8434, 9435, 9436', 100, '2', 10),
	('55', 'Introdução ao DesportoTD', '9437', 50, '2', 11),
	('56', 'Introdução ao DesportoTD', '9438', 50, '2', 12),
	('57', 'Desportos ColetivosTD', '4289, 9439, 9440, 9441', 100, '2', 10),
	('58', 'Desportos ColetivosTD', '9443, 9444, 9442, 9485, 9486', 150, '2', 11),
	('59', 'Desportos ColetivosTD', '9487, 9488, 9489, 9490', 100, '2', 12),
	('6', 'InglêsIG', 'Módulo 7-9', 70, '1', 12),
	('60', 'Desportos IndividuaisTD', '9485, 9486', 100, '2', 10),
	('61', 'Desportos IndividuaisTD', '9450, 9451, 9447', 125, '2', 11),
	('62', 'Desportos IndividuaisTD', '9449, 9452, ', 50, '2', 12),
	('63', 'Atividades de Animação e LazerTD', '8628, 9453', 100, '2', 10),
	('64', 'Atividades de Animação e LazerTD', '7245, 9454, 9455, 9456', 175, '2', 11),
	('65', 'Atividades de Animação e LazerTD', '9457, 9458, 9459, 9460', 100, '2', 12),
	('66', 'Formação em Contexto de TrabalhoTD', 'Formação em contexto de trabalho 1', 200, '2', 10),
	('67', 'Formação em Contexto de TrabalhoTD', 'Formação em contexto de trabalho 2', 400, '2', 11),
	('7', 'Área de IntegraçãoIG', 'Módulo 1-2', 76, '1', 10),
	('8', 'Área de IntegraçãoIG', 'Módulo 3-4', 74, '1', 11),
	('9', 'Área de IntegraçãoIG', 'Módulo 5-6', 70, '1', 12);

-- A despejar estrutura para tabela pap.disciplina_curso
CREATE TABLE IF NOT EXISTS `disciplina_curso` (
  `id_disciplina` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `id curso` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `ano` int NOT NULL,
  KEY `id curso` (`id curso`),
  KEY `FK_disciplina_curso_disciplina` (`id_disciplina`),
  CONSTRAINT `FK_disciplina_curso_cursos` FOREIGN KEY (`id curso`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_disciplina_curso_disciplina` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplina` (`id_disciplina`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- A despejar dados para tabela pap.disciplina_curso: ~0 rows (aproximadamente)
DELETE FROM `disciplina_curso`;

-- A despejar estrutura para tabela pap.disciplina_professores
CREATE TABLE IF NOT EXISTS `disciplina_professores` (
  `id_disciplina` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `id_professores` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `id_curso` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `ano` int NOT NULL,
  KEY `FK_disciplina_professores_professores` (`id_professores`),
  KEY `FK_disciplina_professores_disciplina` (`id_disciplina`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `FK_disciplina_professores_cursos` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_disciplina_professores_disciplina` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplina` (`id_disciplina`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_disciplina_professores_professores` FOREIGN KEY (`id_professores`) REFERENCES `professores` (`id_professores`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- A despejar dados para tabela pap.disciplina_professores: ~1 rows (aproximadamente)
DELETE FROM `disciplina_professores`;
INSERT INTO `disciplina_professores` (`id_disciplina`, `id_professores`, `id_curso`, `ano`) VALUES
	('7', '6', '1', 10),
	('23', '3', '1', 10),
	('4', '4', '1', 10),
	('1', '1', '1', 10),
	('14', '2', '1', 10),
	('20', '5', '1', 10),
	('29', '7', '1', 10),
	('17', '8', '1', 10),
	('11', '8', '1', 10),
	('10', '9', '1', 10),
	('26', '3', '1', 10);

-- A despejar estrutura para tabela pap.inscricoes
CREATE TABLE IF NOT EXISTS `inscricoes` (
  `nome_completo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `telefone` int NOT NULL DEFAULT '0',
  `morada` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `data_de_nascimento` date NOT NULL,
  `cartao_de_cidadao` int NOT NULL DEFAULT '0',
  `contribuinte` int NOT NULL DEFAULT (0),
  `ano` int NOT NULL DEFAULT (0),
  `id_curso` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `habilitacoes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`cartao_de_cidadao`) USING BTREE,
  KEY `id_curso` (`id_curso`) USING BTREE,
  CONSTRAINT `FK_inscricoes_cursos` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- A despejar dados para tabela pap.inscricoes: ~1 rows (aproximadamente)
DELETE FROM `inscricoes`;
INSERT INTO `inscricoes` (`nome_completo`, `email`, `telefone`, `morada`, `data_de_nascimento`, `cartao_de_cidadao`, `contribuinte`, `ano`, `id_curso`, `habilitacoes`) VALUES
	('Rafael Mendes', 'Rafaelmendes2302@gmail.com', 917731251, 'rua da estrada Velha Nº 182 Valongo', '2007-02-23', 31237795, 259423009, 10, '1', 9);

-- A despejar estrutura para tabela pap.professores
CREATE TABLE IF NOT EXISTS `professores` (
  `id_professores` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'AUTO_INCREMENT',
  `nome_professor` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `data_de_nascimento` date NOT NULL,
  `especialização` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id_professores`),
  KEY `nome_professor` (`nome_professor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- A despejar dados para tabela pap.professores: ~6 rows (aproximadamente)
DELETE FROM `professores`;
INSERT INTO `professores` (`id_professores`, `nome_professor`, `data_de_nascimento`, `especialização`) VALUES
	('1', 'Daniela Soares', '1984-12-25', 'Linguas'),
	('2', 'Susana Soberano', '1975-03-06', 'matemática'),
	('3', 'Maria Conceição Meneses', '1978-06-29', 'Informática de Gestão'),
	('4', 'Maria Antonieta Soares', '1960-07-12', 'Linguas'),
	('5', 'Salomé Castro', '1982-05-02', 'Educação Física'),
	('6', 'Maria Conceição Leite', '1970-01-06', 'História'),
	('7', 'Beatriz Pires', '1973-10-12', 'Informática'),
	('8', 'Emília Pinheiro', '1688-03-12', 'levar no cu'),
	('9', 'Teresa Oliveira', '1969-03-12', 'Informática');

-- A despejar estrutura para disparador pap.inserir_aluno_automaticamente
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `inserir_aluno_automaticamente` AFTER INSERT ON `inscricoes` FOR EACH ROW BEGIN
    INSERT INTO alunos (nome_completo, email, morada, data_de_nascimento, cartao_de_cidadao, contribuinte, ano, habilitacoes)
    VALUES (NEW.nome_completo, NEW.email, NEW.morada, NEW.data_de_nascimento, NEW.cartao_de_cidadao, NEW.contribuinte, NEW.ano, NEW.habilitacoes);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- A despejar estrutura para disparador pap.preencher_curso_ano
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `preencher_curso_ano` BEFORE INSERT ON `disciplina_professores` FOR EACH ROW BEGIN
    DECLARE v_id_curso VARCHAR(255); -- Ajustado para VARCHAR
    DECLARE v_ano INT;

    -- Buscar os valores da tabela disciplina
    SELECT id_curso, ano INTO v_id_curso, v_ano
    FROM disciplina
    WHERE id_disciplina = NEW.id_disciplina
    LIMIT 1;

    -- Atribuir os valores ao novo registro
    SET NEW.id_curso = v_id_curso;
    SET NEW.ano = v_ano;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
