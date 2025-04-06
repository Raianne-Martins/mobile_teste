require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');

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

// Rota de registro de usuário
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

// Rota de login
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

// Rota para solicitar a recuperação de senha
app.post('/api/users/recuperar-senha', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email é obrigatório.' });
  }

  const query = `SELECT * FROM Usuario WHERE email = ?`;
  db.get(query, [email], (err, user) => {
    if (err) {
      console.error('Erro ao buscar usuário para recuperação de senha:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Gerar token e definir data de expiração 
    const token = crypto.randomBytes(20).toString('hex');
    const expiryDate = Date.now() + 3600000; // 1 hora em milissegundos

    const updateQuery = `
      UPDATE Usuario
      SET reset_token = ?, reset_token_expiry = ?
      WHERE email = ?
    `;
    db.run(updateQuery, [token, expiryDate, email], function(err) {
      if (err) {
        console.error('Erro ao atualizar token no SQLite:', err.message);
        return res.status(500).json({ error: 'Erro ao gerar token de recuperação.' });
      }


      const resetLink = `https://seu-app.com/resetar-senha?token=${token}`;
      console.log(`Link para redefinição de senha: ${resetLink}`);

      res.json({ message: 'Email de recuperação enviado. Verifique sua caixa de entrada.' });
    });
  });
});

// Rota para redefinir a senha utilizando o token recebido
app.post('/api/users/resetar-senha', async (req, res) => {
  const { token, novaSenha } = req.body;
  if (!token || !novaSenha) {
    return res.status(400).json({ error: 'Token e nova senha são obrigatórios.' });
  }

  // Buscar o usuário que possui o token
  const query = `SELECT * FROM Usuario WHERE reset_token = ?`;
  db.get(query, [token], async (err, user) => {
    if (err) {
      console.error('Erro ao buscar usuário para resetar senha:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }

    if (!user) {
      return res.status(404).json({ error: 'Token inválido ou expirado.' });
    }

    // Verifica se o token ainda é válido
    if (Date.now() > user.reset_token_expiry) {
      return res.status(400).json({ error: 'Token expirado.' });
    }

    // Criptografa a nova senha e atualiza o registro no banco, limpando os campos de token
    const novaSenhaCripto = await bcrypt.hash(novaSenha, 10);
    const updateQuery = `
      UPDATE Usuario
      SET senha = ?, reset_token = NULL, reset_token_expiry = NULL
      WHERE id = ?
    `;
    db.run(updateQuery, [novaSenhaCripto, user.id], function(err) {
      if (err) {
        console.error('Erro ao atualizar senha:', err.message);
        return res.status(500).json({ error: 'Erro ao atualizar a senha.' });
      }
      res.json({ message: 'Senha redefinida com sucesso!' });
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`API rodando na porta ${port}`);
});
