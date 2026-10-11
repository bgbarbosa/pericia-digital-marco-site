export const profile = {
  name: "Marco Aurélio Pereira Barbosa",
  displayName: "Marco Barbosa",
  linkedin: "https://www.linkedin.com/in/marco-aur%C3%A9lio-barbosa-79850926a/",
  damaUniverse: "https://damauniverse.com.br",
  initials: "M.A.P.B",
  title: "Inteligência Artificial, capacitação e soluções digitais",
  heroTitle:
    "Inteligência Artificial aplicada à prática profissional",
  subtitle:
    "Treinamentos, cursos, palestras e mentorias em ChatGPT, engenharia de prompts e produtividade para profissionais e equipes.",
  introduction:
    "O trabalho também abrange projetos, automações e soluções digitais personalizadas voltadas à organização, produtividade e análise de informações.",
  phone: {
    digits: "5567992368049",
    international: "+5567992368049",
    display: "(67) 99236-8049",
  },
  email: "marcobarbosa@damauniverse.com.br",
  city: "Campo Grande/MS",
  lattes: "https://lattes.cnpq.br/1970561249212557",
  image: "/marco-barbosa-profissional.jpg",
  imageType: "image/jpeg",
  community: {
    name: "AI Brasil",
    image: "/ai-brasil-comunidade.png",
    title: "Membro da comunidade AI Brasil",
    statement:
      "Atualização contínua e troca de conhecimentos em inteligência artificial que fortalecem minha atuação em análise de dados, computação forense e desenvolvimento de soluções.",
  },
  association: {
    acronym: "APECOF",
    name: "Associação Nacional dos Peritos em Computação Forense",
    image: "/apecof.jpeg",
    statement:
      "Associado à Associação Nacional dos Peritos em Computação Forense - APECOF.",
  },
};

export const homeMenu = [
  { label: "Início", href: "#inicio" },
  { label: "Capacitações", href: "#capacitacoes" },
  { label: "Aplicações de IA", href: "#aplicacoes-ia" },
  { label: "Perícia na Prática", href: "/pericia-na-pratica" },
  { label: "Experiência", href: "/experiencia" },
  { label: "Formação e trajetória", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export const cardMenu = homeMenu.map((item) => ({
  ...item,
  href: item.href.startsWith("#") ? `/${item.href}` : item.href,
}));

export const capacityModalities = [
  {
    title: "Treinamentos",
    text: "Encontros práticos para profissionais e equipes, com conteúdos personalizados sobre ChatGPT, engenharia de prompts, produtividade, organização de informações e uso responsável da Inteligência Artificial.",
  },
  {
    title: "Cursos e oficinas",
    text: "Para quem busca aprender de forma estruturada: introdução ao uso de IA, exercícios de escrita, revisão e organização de informações. Oficinas dão espaço à prática orientada e à discussão das atividades.",
  },
  {
    title: "Palestras",
    text: "Para públicos de eventos e encontros profissionais: exposição e discussão sobre IA no cotidiano, ChatGPT, oportunidades, riscos, ética e uso seguro. O tema é recortado de acordo com o público.",
  },
  {
    title: "Mentorias",
    text: "Acompanhamento personalizado para uso de ferramentas de Inteligência Artificial, construção e melhoria de prompts, organização de fluxos de trabalho, produtividade, planejamento de projetos com IA e utilização responsável de ferramentas generativas.",
  },
];

export const aiApplications = [
  {
    title: "ChatGPT na prática",
    text: "Aplicação do ChatGPT em atividades de redação, revisão, síntese, planejamento e organização, sempre com análise crítica e validação humana dos resultados.",
  },
  {
    title: "Engenharia de prompts",
    text: "Construção e melhoria de instruções claras, com definição de contexto, objetivo, restrições e critérios de qualidade para obter respostas mais úteis.",
  },
  {
    title: "Produtividade e fluxos de trabalho",
    text: "Uso da Inteligência Artificial para apoiar rotinas profissionais, organizar etapas, estruturar documentos e tornar fluxos de trabalho mais claros e consistentes.",
  },
  {
    title: "Automação de tarefas",
    text: "Identificação de tarefas repetitivas que podem receber apoio de automações e ferramentas de IA, com supervisão adequada e respeito aos limites de cada contexto.",
  },
  {
    title: "Análise e organização de informações",
    text: "Apoio à classificação, comparação, síntese e apresentação de informações, preservando a rastreabilidade das fontes e a necessidade de conferência.",
  },
  {
    title: "Uso responsável",
    text: "Atenção à privacidade, à segurança, às limitações dos modelos, a possíveis vieses e à verificação das informações antes de sua utilização.",
  },
];

export const digitalSolutionPoints = [
  {
    title: "Ferramentas sob medida",
    text: "Recursos digitais definidos a partir do problema, do público e do fluxo de trabalho de cada projeto.",
  },
  {
    title: "Automações",
    text: "Apoio à organização e à execução de tarefas repetitivas, com regras e limites estabelecidos para cada contexto.",
  },
  {
    title: "Protótipos e sistemas",
    text: "Validação de possibilidades técnicas e desenvolvimento gradual de interfaces, integrações e aplicações.",
  },
  {
    title: "Inteligência Artificial aplicada",
    text: "Uso criterioso de recursos de IA em soluções que demandem análise, geração ou organização de informações.",
  },
];

export const knowledgeAreas = [
  {
    title: "Perícia digital e evidências eletrônicas",
    text: "Estudo de métodos para identificar, preservar, organizar e analisar vestígios eletrônicos, com atenção à integridade, à cadeia de custódia e à documentação.",
  },
  {
    title: "Investigação digital e OSINT",
    text: "Experiência e estudo de vestígios digitais, fontes abertas e indícios técnicos em ambientes digitais, com organização e registro das informações analisadas.",
  },
  {
    title: "Computação forense",
    text: "Conhecimento aplicado à análise de dados em discos rígidos, SSDs e servidores, com ênfase na organização de vestígios digitais e na recuperação de dados, quando tecnicamente viável.",
  },
  {
    title: "Análise de dados e organização da informação",
    text: "Formação aplicada à estruturação, leitura, comparação e apresentação de dados e informações em contextos técnicos e profissionais.",
  },
  {
    title: "Dispositivos móveis",
    text: "Estudo técnico de procedimentos relacionados à extração, preservação, organização e análise de dados provenientes de smartphones e outros dispositivos móveis, com atenção à integridade dos vestígios e à documentação das etapas executadas.",
  },
  {
    title: "Leitura técnica de documentos e laudos",
    text: "Estudo de temas relacionados à formulação de quesitos, leitura crítica de laudos, compreensão técnica do material examinado e análise de aspectos relevantes em contexto pericial.",
  },
  {
    title: "Imagem, áudio, vídeo e metadados",
    text: "Conhecimento aplicado à verificação de autenticidade, leitura de metadados, análise de edições, exame de CFTV e tratamento técnico de imagem, áudio e vídeo voltado à melhor compreensão de elementos relevantes.",
  },
  {
    title: "Segurança da informação",
    text: "Formação complementar sobre proteção de informações, análise de riscos, práticas seguras e uso responsável de recursos tecnológicos.",
  },
];

export const specializationAreas = knowledgeAreas;

export const heroHighlights = [
  {
    label: "Formação",
    href: "/formacao",
    text: "Pós-graduado em Inteligência Artificial",
  },
  {
    label: "Aplicação",
    href: "/aplicacoes",
    text: "ChatGPT, engenharia de prompts e produtividade",
  },
  {
    label: "Experiência",
    href: "/experiencia",
    text: "Mais de 12 anos em investigação e análise técnica",
  },
];

export const featuredTraining = {
  label: "Formação em destaque",
  href: "/formacao/deteccao-imagens-ia",
  title: "Detecção de Fotos e Vídeos gerados por Inteligência Artificial",
  workload: "20h",
  completion: "Concluído • ago/2026",
};

export const virtualCardAreas = [
  "Treinamentos e cursos",
  "Palestras e mentorias",
  "ChatGPT e engenharia de prompts",
  "Soluções digitais personalizadas",
];

export const virtualCardForensics = {
  title: "Investigação e tecnologia forense",
  text: "Experiência em investigação, análise técnica e evidências digitais, com formação em perícia digital, computação forense e análise de dados.",
};

export const academicFormation = [
  "Pós-graduado em Inteligência Artificial para Agentes da Lei, formação lato sensu de 360 horas concluída em 2026.",
  "Pós-graduação em Análise de Dados pela Faculdade FaCiencia, 360 horas, período de 2023 a 2024, concluída.",
  "Especialização em Inteligência Artificial pela Universidade Tecnológica Federal do Paraná - UTFPR, em andamento.",
  "Graduado em Administração pela Universidade Anhanguera - Uniderp.",
];

export const emphasisPoints = [
  "Rigor técnico",
  "Cadeia de custódia",
  "Formação contínua",
  "Método e rastreabilidade",
  "Clareza técnica",
  "Documentação e análise de evidências",
];

export const credentials = [
  "Investigador da Polícia Civil do Mato Grosso do Sul",
  "Mais de 12 anos de experiência em investigação e análise técnica",
  "Curso de Detecção de Fotos e Vídeos gerados por Inteligência Artificial, 20 horas, concluído em 2026.",
  "Curso de ChatGPT para Policiais e Agentes da Lei, 40 horas, concluído em 2024.",
  "Formação complementar em perícia digital e computação forense",
  "Cursos em perícia mobile, OSINT e forense na internet, IPED Forensics, ADB Forensics, Avilla Forensics, UFED e Cellebrite",
  profile.association.statement,
];

export const whatsappUrl = `https://wa.me/${profile.phone.digits}`;
export const telephoneUrl = `tel:${profile.phone.international}`;
export const emailUrl = `mailto:${profile.email}`;
