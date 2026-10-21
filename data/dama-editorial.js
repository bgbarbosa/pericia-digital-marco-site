import { profile } from "./profile.js";

export const damaEditorial = {
  home: profile.damaUniverse,
  publicUtility: new URL("/utilidade-publica", profile.damaUniverse).toString(),
  tools: [
    {
      slug: "dama-gestor-rh",
      title: "Dama Gestor de RH",
      description: "Projeto voltado à organização de trabalhadores, contratos, alocações e acompanhamento operacional.",
      status: "Projeto sob consulta",
      action: "Conhecer o projeto",
      href: new URL("/programas/dama-gestor-rh", profile.damaUniverse).toString(),
    },
    {
      slug: "especialista-em-escrita-e-revisao",
      title: "Especialista em Escrita e Revisão",
      description: "GPT no ChatGPT para apoiar revisão, clareza, fluidez e adequação de textos ao público e à finalidade.",
      status: "GPT no ChatGPT · Revisão humana necessária",
      action: "Conhecer o assistente",
      href: new URL("/gpts#especialista-em-escrita-e-revisao", profile.damaUniverse).toString(),
    },
  ],
};
