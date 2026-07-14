export const profile = {
  name: "Marco Aurélio Pereira Barbosa",
  initials: "M.A.P.B",
  title: "Perícia Digital, Computação Forense e Evidências Digitais",
  subtitle:
    "Trajetória profissional voltada à investigação, análise técnica, cadeia de custódia e estudo aplicado de vestígios eletrônicos.",
  introduction:
    "Página institucional de apresentação profissional, formação complementar e áreas de conhecimento em tecnologia forense, perícia digital e análise de evidências eletrônicas.",
  phone: {
    digits: "5567999398990",
    international: "+5567999398990",
    display: "(67) 99939-8990",
  },
  email: "marcobarbo@gmail.com",
  city: "Campo Grande/MS",
  lattes: "https://lattes.cnpq.br/1970561249212557",
  image: "/marco.jpeg",
  association: {
    acronym: "APECOF",
    name: "Associação Nacional dos Peritos em Computação Forense",
    image: "/apecof.jpeg",
  },
};

export const homeMenu = [
  { label: "Início", href: "#inicio" },
  { label: "Perícia Digital", href: "#pericia-digital" },
  { label: "Especialização", href: "#especializacao" },
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Credenciais", href: "#credenciais" },
  { label: "Contato", href: "#contato" },
  { label: "Cartão virtual", href: "/cartao" },
];

export const cardMenu = homeMenu.map((item) => ({
  ...item,
  href: item.href.startsWith("#") ? `/${item.href}` : item.href,
}));

export const specializationAreas = [
  {
    title: "Perícia Digital em Dispositivos Móveis",
    text: "Estudo técnico de procedimentos relacionados à extração, preservação, organização e análise de dados provenientes de smartphones e outros dispositivos móveis, com atenção à integridade dos vestígios e à documentação das etapas executadas.",
  },
  {
    title: "Computação Forense",
    text: "Conhecimento aplicado à análise de dados em discos rígidos, SSDs e servidores, com ênfase em organização de vestígios digitais e recuperação de dados, quando tecnicamente viável.",
  },
  {
    title: "Estudos sobre atuação pericial e leitura crítica de laudos",
    text: "Estudo de temas relacionados à formulação de quesitos, leitura crítica de laudos, compreensão técnica do material examinado e análise de aspectos relevantes em contexto pericial.",
  },
  {
    title: "Investigação Digital",
    text: "Estudo de vestígios digitais relacionados a fraudes, vazamento de dados, concorrência desleal e apuração de indícios técnicos em ambientes digitais.",
  },
  {
    title: "Imagem e Vídeo",
    text: "Conhecimento aplicado à verificação de autenticidade, leitura de metadados, análise de edições, exame de CFTV e tratamento técnico voltado à melhor visualização de elementos relevantes.",
  },
  {
    title: "Parecer Técnico",
    text: "Atuação voltada à produção de conteúdo técnico e interpretação de evidências digitais, dispositivos eletrônicos e viabilidade de análise de material apresentado.",
  },
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
  "Pós-graduação em Análise de Dados",
  "Especialização em Inteligência Artificial",
  "Formação complementar em perícia digital e computação forense",
  "Cursos em perícia mobile, IPED, ADB Forensics, Ávila Forensics, UFED e Cellebrite",
  "Associado à APECOF",
];

export const whatsappUrl = `https://wa.me/${profile.phone.digits}`;
export const telephoneUrl = `tel:${profile.phone.international}`;
export const emailUrl = `mailto:${profile.email}`;
