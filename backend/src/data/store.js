const { nanoid } = require("nanoid");
const posts = [
  {
    id: "4",
    title: "A importância da acessibilidade na web",
    author: "Prof. Rafael Mendes",
    description:
      "Como tornar sites e sistemas mais acessíveis para todos os usuários.",
    content:
      "A acessibilidade digital é fundamental para garantir que pessoas com diferentes necessidades possam utilizar sites e sistemas de forma independente. " +
      "Recursos como textos alternativos, navegação por teclado, contraste adequado e uma estrutura semântica bem definida " +
      "são algumas das práticas que podem melhorar significativamente a experiência dos usuários.",
    createdAt: "2026-04-05T10:15:00.000Z",
  },

  {
    id: "5",
    title: "JavaScript moderno: o que você precisa saber",
    author: "Prof. Carlos Lima",
    description:
      "Conheça recursos modernos da linguagem que facilitam o desenvolvimento.",
    content:
      "O JavaScript evoluiu bastante nos últimos anos e trouxe recursos que tornam o código mais simples e organizado. " +
      "Arrow functions, destructuring, promises, async/await e módulos são exemplos de funcionalidades que fazem parte " +
      "do desenvolvimento moderno e ajudam a criar aplicações mais eficientes e fáceis de manter.",
    createdAt: "2026-04-18T14:20:00.000Z",
  },

  {
    id: "6",
    title: "Como organizar seus estudos",
    author: "Profa. Marina Souza",
    description:
      "Algumas estratégias para melhorar a organização e o aproveitamento dos estudos.",
    content:
      "Ter uma rotina de estudos organizada pode fazer uma grande diferença no aprendizado. " +
      "Definir pequenas metas, separar períodos específicos para cada assunto e revisar conteúdos regularmente " +
      "são estratégias simples que ajudam a manter a constância e evitar o acúmulo de matérias.",
    createdAt: "2026-05-02T08:45:00.000Z",
  },

  {
    id: "7",
    title: "O que é UX Design?",
    author: "Profa. Juliana Alves",
    description:
      "Entenda como a experiência do usuário influencia produtos digitais.",
    content:
      "UX Design envolve muito mais do que criar telas bonitas. O objetivo é entender as necessidades dos usuários " +
      "e criar experiências simples, intuitivas e eficientes. Pesquisas, testes de usabilidade, prototipação e análise " +
      "de comportamento são algumas das práticas utilizadas durante o processo de desenvolvimento de um produto digital.",
    createdAt: "2026-05-15T16:10:00.000Z",
  },

  {
    id: "8",
    title: "Banco de dados: SQL ou NoSQL?",
    author: "Prof. André Martins",
    description:
      "Entenda as principais diferenças entre bancos relacionais e não relacionais.",
    content:
      "A escolha entre SQL e NoSQL depende das características de cada projeto. Bancos relacionais trabalham " +
      "com estruturas organizadas e relacionamentos entre dados, enquanto bancos NoSQL oferecem diferentes modelos " +
      "de armazenamento e podem ser interessantes para aplicações que precisam lidar com grandes volumes de dados " +
      "ou estruturas mais flexíveis.",
    createdAt: "2026-05-27T11:30:00.000Z",
  },

  {
    id: "9",
    title: "Primeiros passos com Git e GitHub",
    author: "Prof. Carlos Lima",
    description:
      "Um guia para quem está começando a trabalhar com controle de versão.",
    content:
      "Git é uma das principais ferramentas utilizadas por equipes de desenvolvimento para controlar versões do código. " +
      "Com comandos básicos como commit, branch, merge e pull, é possível organizar alterações, trabalhar em equipe " +
      "e manter um histórico completo do desenvolvimento de um projeto.",
    createdAt: "2026-06-03T13:00:00.000Z",
  },

  {
    id: "10",
    title: "Como a tecnologia transforma empresas",
    author: "Prof. Ricardo Oliveira",
    description:
      "Exemplos de como soluções digitais podem melhorar processos corporativos.",
    content:
      "A tecnologia pode transformar processos que antes dependiam de tarefas manuais e repetitivas. " +
      "Sistemas internos, automações, dashboards e integrações entre diferentes plataformas permitem que empresas " +
      "economizem tempo, reduzam erros e tenham acesso mais rápido às informações necessárias para tomar decisões.",
    createdAt: "2026-06-19T09:15:00.000Z",
  },

  {
    id: "11",
    title: "Introdução ao desenvolvimento de APIs",
    author: "Prof. Carlos Lima",
    description:
      "Entenda como APIs permitem a comunicação entre diferentes sistemas.",
    content:
      "APIs são fundamentais para conectar aplicações e permitir que diferentes sistemas troquem informações. " +
      "Uma API pode disponibilizar dados ou funcionalidades para outros sistemas de maneira padronizada, " +
      "facilitando integrações entre aplicações web, aplicativos mobile, serviços externos e bancos de dados.",
    createdAt: "2026-07-01T15:40:00.000Z",
  },

  {
    id: "12",
    title: "Inteligência artificial na programação",
    author: "Prof. Rafael Mendes",
    description:
      "Como ferramentas de IA podem auxiliar desenvolvedores no dia a dia.",
    content:
      "Ferramentas de inteligência artificial já fazem parte da rotina de muitos desenvolvedores. " +
      "Elas podem ajudar na criação de exemplos de código, identificação de erros, documentação e geração de testes. " +
      "Apesar disso, compreender a lógica por trás do código continua sendo essencial para avaliar as respostas e tomar boas decisões técnicas.",
    createdAt: "2026-07-12T10:25:00.000Z",
  },

  {
    id: "13",
    title: "A importância da lógica de programação",
    author: "Prof. André Martins",
    description:
      "Por que desenvolver o raciocínio lógico é essencial para programadores.",
    content:
      "Antes de aprender uma linguagem de programação, é importante desenvolver o raciocínio lógico. " +
      "Variáveis, condições, repetições e funções são conceitos presentes em praticamente todas as linguagens. " +
      "Com uma boa base lógica, fica mais fácil aprender novas tecnologias e resolver problemas de diferentes formas.",
    createdAt: "2026-07-25T17:00:00.000Z",
  },

  {
    id: "14",
    title: "Como criar um bom portfólio de tecnologia",
    author: "Prof. Lucas Ferreira",
    description:
      "Dicas para apresentar projetos e experiências de forma profissional.",
    content:
      "Um bom portfólio pode ajudar profissionais e estudantes a demonstrarem na prática aquilo que sabem fazer. " +
      "Além de apresentar os projetos, é interessante explicar quais problemas foram resolvidos, quais tecnologias foram utilizadas " +
      "e quais foram os principais desafios encontrados durante o desenvolvimento.",
    createdAt: "2026-08-08T12:35:00.000Z",
  },

  {
    id: "15",
    title: "O futuro da educação digital",
    author: "Profa. Marina Souza",
    description: "Tecnologias que podem transformar a forma como aprendemos.",
    content:
      "A educação digital vem ganhando novas possibilidades com o avanço da inteligência artificial, plataformas online " +
      "e ambientes de aprendizagem personalizados. Essas tecnologias podem ampliar o acesso ao conhecimento e oferecer " +
      "novas formas de interação entre professores e estudantes, tornando o aprendizado mais flexível e personalizado.",
    createdAt: "2026-08-21T09:50:00.000Z",
  },
];

const comments = [];

const users = [
  {
    id: "u1",
    name: "Profa. Marina Souza",
    username: "marina.souza",
    passwordHash:
      "$2a$10$zB/vEqsd14367R2DWnoRz.xCBeVnaQrtfQIKaHFHpiIokYF31Ftw2",
  },
];

module.exports = { posts, comments, users, nanoid };
