require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json());

const dbPath = process.env.DB_PATH || './cosmepedia.db';

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err.message);
  } else {
    console.log('Conexão com SQLite realizada com sucesso!');
  }
});


app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  console.log('Corpo da requisição:', req.body);
  next();
});


app.post('/api/users/register', async (req, res) => {
  try {
    console.log('Dados recebidos no backend:', req.body);

    const { nome, email, senha, perguntaSecreta, respostaSecreta, tipoUsuario, cpf, cnpj } = req.body;

    if (!nome || !email || !senha || !perguntaSecreta || !respostaSecreta || !tipoUsuario) {
      console.error('Dados inválidos ou incompletos:', { nome, email, senha, perguntaSecreta, respostaSecreta, tipoUsuario });
      return res.status(400).json({ error: 'Dados inválidos ou incompletos!' });
    }

    if (tipoUsuario === 'Empresa' && !cnpj) {
      console.error('CNPJ faltando para tipoUsuario Empresa:', { cnpj });
      return res.status(400).json({ error: 'CNPJ é obrigatório para empresas.' });
    }

    if (['Geral', 'Administrador'].includes(tipoUsuario) && !cpf) {
      console.error('CPF faltando para tipoUsuario Geral ou Administrador:', { cpf });
      return res.status(400).json({ error: 'CPF é obrigatório para este tipo de usuário.' });
    }

    const senhaCripto = await bcrypt.hash(senha, 10);

    const cpfValue = tipoUsuario === 'Empresa' ? null : cpf;
    const cnpjValue = tipoUsuario === 'Empresa' ? cnpj : null;

    const query = `
      INSERT INTO Usuario (tipoUsuario, nome, email, senha, cpf, cnpj, perguntaSecreta, respostaSecreta)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [tipoUsuario, nome, email, senhaCripto, cpfValue, cnpjValue, perguntaSecreta, respostaSecreta], function (err) {
      if (err) {
        console.error('Erro ao inserir usuário no SQLite:', err.message);
        return res.status(500).json({ error: 'Erro interno ao registrar usuário.' });
      }
      console.log('Usuário inserido com sucesso, ID:', this.lastID);
      res.status(200).send('Usuário cadastrado com sucesso!');
    });
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
    db.get(query, [email], async (err, user) => {
      if (err) {
        console.error('Erro ao buscar usuário:', err.message);
        return res.status(500).json({ error: 'Erro ao buscar usuário.' });
      }

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      const match = await bcrypt.compare(senha, user.senha);
      if (match) {
        res.json({ message: 'Login realizado com sucesso!', userId: user.id });
      } else {
        res.status(400).json({ error: 'Senha incorreta.' });
      }
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro interno.' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`API rodando na porta ${port}`);
});
