require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

// Configure a conexão com o MySQL - atualize os dados conforme necessário
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,  // Utilize a variável DB_PORT
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Conecta ao banco de dados
connection.connect(error => {
  if (error) {
    console.error('Erro ao conectar no banco de dados:', error);
    return;
  }
  console.log('Conexão com o MySQL estabelecida com sucesso!');
});

// Perguntas secretas permitidas
const perguntasSecretas = [
  'Qual o nome do seu primeiro pet?',
  'Qual o nome o seu primeiro namorado(a)?',
  'Qual cidade você nasceu?',
  'Qual o nome da maternidade que você nasceu?',
  'Qual o nome do seu professor favorito?'
];

/* 
Endpoint de registro de usuário.
Espera receber um JSON com os seguintes campos:
  - nome
  - email
  - login
  - senha
  - perguntaSecreta (deve ser uma das permitidas do array perguntasSecretas)
  - respostaSecreta
  - idTipoUsuario (deve ser um valor válido da tabela TipoUsuario)
*/
app.post('/api/users/register', async (req, res) => {
  try {
    const { nome, email, login, senha, perguntaSecreta, respostaSecreta, idTipoUsuario } = req.body;

    if (!nome || !email || !login || !senha || !perguntaSecreta || !respostaSecreta || !idTipoUsuario) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Verifica se a pergunta secreta é permitida
    if (!perguntasSecretas.includes(perguntaSecreta)) {
      return res.status(400).json({ error: 'A pergunta secreta é inválida.' });
    }

    // Criptografa a senha usando a variável "senha"
    const senhaCripto = await bcrypt.hash(senha, 10);

    const query = `
      INSERT INTO Usuario (nome, email, login, senha, perguntaSecreta, respostaSecreta, idTipoUsuario)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(
      query,
      [nome, email, login, senhaCripto, perguntaSecreta, respostaSecreta, idTipoUsuario],
      (error, results) => {
        if (error) {
          console.error('Erro ao inserir usuário:', error);
          return res.status(500).json({ error: 'Erro ao registrar usuário.' });
        }
        res.json({ message: 'Usuário registrado com sucesso!', userId: results.insertId });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno.' });
  }
});

/* 
Endpoint de login do usuário.
Espera receber um JSON com:
  - login
  - senha
Realiza a busca na tabela Usuario e compara a senha informada com a senha criptografada armazenada.
*/
app.post('/api/users/login', async (req, res) => {
  try {
    const { login, senha } = req.body;
    if (!login || !senha) {
      return res.status(400).json({ error: 'Login e senha são obrigatórios.' });
    }

    const query = `SELECT * FROM Usuario WHERE login = ?`;
    connection.query(query, [login], async (error, results) => {
      if (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Erro no login.' });
      }
      if (results.length === 0) {
        return res.status(400).json({ error: 'Usuário não encontrado.' });
      }

      const user = results[0];
      const match = await bcrypt.compare(senha, user.senha);
      if (match) {
        res.json({ message: 'Login realizado com sucesso!', userId: user.id });
      } else {
        res.status(400).json({ error: 'Senha incorreta.' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno.' });
  }
});

// Inicia o servidor na porta 3000 (ou na porta definida na variável de ambiente PORT)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
