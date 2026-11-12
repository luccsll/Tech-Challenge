const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
const createUsersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/professores", createUsersRouter("professor"));
app.use("/alunos", createUsersRouter("aluno"));

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

app.listen(PORT, () => {
  console.log(`API do blog rodando em http://localhost:${PORT}`);
});
