export const applicationTopics = [
  {
    slug: "da-necessidade-a-ferramenta",
    title: "Da necessidade à ferramenta",
    image: "/aplicacoes/necessidade-ferramenta.svg",
    imageAlt: "Fluxo ilustrado que parte de uma necessidade, passa por análise e termina em uma ferramenta revisada",
    description: "Como uma demanda concreta pode orientar uma ferramenta, automação ou fluxo digital com revisão humana.",
  },
  {
    slug: "dama-universe",
    title: "Projeto autoral Dama Universe",
    image: "/aplicacoes/dama-universe.svg",
    imageAlt: "Ilustração de programas, conteúdos e referências reunidos em uma central digital",
    description: "Um espaço autoral para organizar e compartilhar programas, conteúdos e referências de tecnologia.",
  },
];

export function findApplicationTopic(slug) {
  return applicationTopics.find((item) => item.slug === slug);
}
