const { nanoid } = require("nanoid");

const posts = [
  {
    id: "1",
    title: "Como a IA está mudando a sala de aula",
    author: "Profa. Marina Souza",
    description: "Um panorama de ferramentas de IA aplicadas ao ensino básico e superior.",
    content:
      "A inteligência artificial deixou de ser promessa e virou ferramenta do dia a dia em muitas escolas. " +
      "Neste post vamos explorar alguns exemplos práticos de uso em sala de aula, desde correção automática de " +
      "redações até tutores virtuais que ajudam estudantes fora do horário de aula. O importante é lembrar que " +
      "a tecnologia é um apoio ao professor, não um substituto.",
    createdAt: "2026-01-10T12:00:00.000Z",
  },
  {
    id: "2",
    title: "Guia rápido de React Hooks",
    author: "Prof. Carlos Lima",
    description: "useState, useEffect e useContext explicados com exemplos simples.",
    content:
      "Hooks mudaram a forma como escrevemos componentes em React. Neste guia vamos cobrir os três hooks mais " +
      "usados no dia a dia: useState para estado local, useEffect para efeitos colaterais e useContext para " +
      "compartilhar dados entre componentes sem precisar passar props manualmente em cada nível da árvore.",
    createdAt: "2026-02-02T09:30:00.000Z",
  },
  {
    id: "3",
    title: "Avaliação formativa: por onde começar",
    author: "Profa. Marina Souza",
    description: "Estratégias simples para dar feedback contínuo aos alunos.",
    content:
      "Avaliação formativa não precisa ser complicada. Pequenos ajustes na rotina, como pedir um resumo de " +
      "três linhas no fim da aula ou usar quizzes rápidos, já ajudam o professor a entender o que a turma " +
      "realmente absorveu antes da prova final.",
    createdAt: "2026-03-14T15:45:00.000Z",
  },
];

const comments = [];

const users = [
  {
    id: "u1",
    name: "Profa. Marina Souza",
    username: "marina.souza",
    // senha: professor123
    passwordHash: "$2a$10$zB/vEqsd14367R2DWnoRz.xCBeVnaQrtfQIKaHFHpiIokYF31Ftw2",
  },
];

module.exports = { posts, comments, users, nanoid };
