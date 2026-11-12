const bcrypt = require("bcryptjs");
const { users, nanoid } = require("../data/store");

const LABELS = { professor: "Professor", aluno: "Aluno" };

// The password hash never leaves the API.
function toPublic(user) {
  const { id, nome, username, email, role } = user;
  return { id, nome, username, email, role };
}

function parsePositiveInt(value, fallback) {
  if (value === undefined) return fallback;
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : null;
}

function readFields(body) {
  const { nome, username, email, senha } = body || {};
  const text = (value) => (typeof value === "string" ? value.trim() : "");
  return {
    nome: text(nome),
    username: text(username),
    email: text(email),
    senha: typeof senha === "string" ? senha : "",
  };
}

// Usernames are unique across both roles because login is by username.
function isUsernameTaken(username, exceptId) {
  return users.some((u) => u.username === username && u.id !== exceptId);
}

// Shared by /professores and /alunos: every handler only sees users with `role`.
function createUsersController(role) {
  const notFound = { message: `${LABELS[role]} não encontrado.` };
  const findById = (id) => users.find((u) => u.id === id && u.role === role);

  return {
    list(req, res) {
      const page = parsePositiveInt(req.query.page, 1);
      const limit = parsePositiveInt(req.query.limit, 10);
      if (!page || !limit) {
        return res
          .status(400)
          .json({ message: "page e limit devem ser números inteiros maiores que zero." });
      }

      const filtered = users.filter((u) => u.role === role);
      const start = (page - 1) * limit;

      res.json({
        data: filtered.slice(start, start + limit).map(toPublic),
        page,
        limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit),
      });
    },

    get(req, res) {
      const user = findById(req.params.id);
      if (!user) {
        return res.status(404).json(notFound);
      }
      res.json(toPublic(user));
    },

    async create(req, res) {
      const { nome, username, email, senha } = readFields(req.body);
      if (!nome || !username || !email || !senha) {
        return res.status(400).json({ message: "Nome, username, e-mail e senha são obrigatórios." });
      }

      const passwordHash = await bcrypt.hash(senha, 10);
      // Checked after the await so two simultaneous requests cannot both take the username.
      if (isUsernameTaken(username)) {
        return res.status(409).json({ message: "Este username já está em uso." });
      }

      const user = { id: nanoid(8), nome, username, email, role, passwordHash };
      users.push(user);
      res.status(201).json(toPublic(user));
    },

    async update(req, res) {
      const user = findById(req.params.id);
      if (!user) {
        return res.status(404).json(notFound);
      }

      const { nome, username, email, senha } = readFields(req.body);
      if (!nome || !username || !email) {
        return res.status(400).json({ message: "Nome, username e e-mail são obrigatórios." });
      }

      // An empty password keeps the current one.
      const passwordHash = senha ? await bcrypt.hash(senha, 10) : user.passwordHash;
      if (isUsernameTaken(username, user.id)) {
        return res.status(409).json({ message: "Este username já está em uso." });
      }

      Object.assign(user, { nome, username, email, passwordHash });
      res.json(toPublic(user));
    },

    remove(req, res) {
      const index = users.findIndex((u) => u.id === req.params.id && u.role === role);
      if (index === -1) {
        return res.status(404).json(notFound);
      }

      users.splice(index, 1);
      res.status(204).end();
    },
  };
}

module.exports = { createUsersController, toPublic };
