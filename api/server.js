require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,  
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});


connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conexão com o MySQL estabelecida com sucesso!');
  
 
  connection.query('SHOW DATABASES', (err, results) => {
    if (err) {
      console.error('Erro ao listar databases:', err);
      return;
    }
    console.log('Databases disponíveis:', results);
  });
});


const perguntasSecretas = [
  'Qual o nome do seu primeiro pet?',
  'Qual o nome o seu primeiro namorado(a)?',
  'Qual cidade você nasceu?',
  'Qual o nome da maternidade que você nasceu?',
  'Qual o nome do seu professor favorito?'
];


app.post('/api/users/register', async (req, res) => {
  console.log('Dados recebidos no backend:', req.body);

  const { nome, email, senha, perguntaSecreta, respostaSecreta, tipoUsuario, cpf, cnpj } = req.body;
  
 
  if (!nome || !email || !senha || !perguntaSecreta || !respostaSecreta || !tipoUsuario) {
    return res.status(400).json({ error: 'Dados inválidos ou incompletos!' });
  }


  if (!perguntasSecretas.includes(perguntaSecreta)) {
    return res.status(400).json({ error: 'A pergunta secreta é inválida.' });
  }
  

  if (tipoUsuario === 'Empresa') {
    if (!cnpj) {
      return res.status(400).json({ error: 'CNPJ é obrigatório para empresas.' });
    }
  } else if (tipoUsuario === 'Geral' || tipoUsuario === 'Administrador') {
    if (!cpf) {
      return res.status(400).json({ error: 'CPF é obrigatório para usuários gerais e administradores.' });
    }
  } else {
    return res.status(400).json({ error: 'Tipo de usuário inválido.' });
  }

  try {
 
    const senhaCripto = await bcrypt.hash(senha, 10);

   
    const cpfValue = (tipoUsuario === 'Empresa') ? null : cpf;
    const cnpjValue = (tipoUsuario === 'Empresa') ? cnpj : null;

    const query = `
      INSERT INTO Usuario (tipoUsuario, nome, email, senha, cpf, cnpj, perguntaSecreta, respostaSecreta)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    connection.query(
      query,
      [tipoUsuario, nome, email, senhaCripto, cpfValue, cnpjValue, perguntaSecreta, respostaSecreta],
      (err, results) => {
        if (err) {
          console.error('Erro ao inserir usuário:', err);
          return res.status(500).json({ error: 'Erro interno ao registrar usuário.' });
        }
        res.status(200).send('Usuário cadastrado com sucesso!');
      }
    );
  } catch (err) {
    console.error('Erro no registro:', err);
    return res.status(500).json({ error: 'Erro interno.' });
  }
});


app.post('/api/users/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const query = `SELECT * FROM Usuario WHERE email = ?`;
    connection.query(query, [email], async (error, results) => {
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


const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`API rodando na porta ${port}`);
});
