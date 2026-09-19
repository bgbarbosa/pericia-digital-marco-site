# Site Profissional — Marco Aurélio Pereira Barbosa

Site profissional de Marco Barbosa voltado à Inteligência Artificial, ChatGPT, capacitações e soluções digitais. Perícia digital e computação forense integram sua formação complementar. O projeto inclui uma página principal responsiva e um cartão virtual próprio para compartilhamento em celulares e aplicativos como o WhatsApp.

## Recursos

- página institucional responsiva;
- navegação móvel acessível com suporte a teclado e `Escape`;
- cartão profissional em `/cartao`;
- compartilhamento pela Web Share API com cópia de link como alternativa;
- links para WhatsApp, telefone, e-mail e Currículo Lattes;
- contato em formato vCard (`.vcf`);
- QR Code gerado localmente pelo servidor;
- imagens Open Graph de 1200 × 630 geradas pelo Next.js;
- metadados, robots, sitemap e manifest;
- cabeçalhos defensivos e Content Security Policy;
- testes end-to-end com Playwright;
- workflow de CI para GitHub Actions.

## Stack

- Next.js 16 com App Router;
- React 19;
- Tailwind CSS 4;
- JavaScript;
- Playwright;
- Node.js 24 LTS.

## Estrutura principal

```text
app/
├── cartao/
│   ├── contato.vcf/route.js
│   ├── qr-code/route.js
│   ├── opengraph-image.jsx
│   └── page.js
├── favicon.ico
├── global-error.js
├── globals.css
├── layout.js
├── manifest.js
├── not-found.js
├── opengraph-image.jsx
├── page.js
├── robots.js
└── sitemap.js
components/
data/profile.js
lib/site-url.js
public/
├── apecof.jpeg
└── marco-barbosa.jpg
tests/e2e/site.spec.js
.github/workflows/ci.yml
```

O favicon fica em `app/favicon.ico`, conforme a convenção do App Router.

## Requisitos

- Node.js 24 LTS;
- npm compatível com a instalação do Node.js;
- Windows, macOS ou Linux.

O arquivo `.nvmrc` fixa a linha 24. O `package.json` usa `engines.node: 24.x` para compatibilidade com a versão LTS padrão da Vercel.

## Variável de ambiente

Copie `.env.example` para `.env.local` durante o desenvolvimento, se precisar definir explicitamente a URL:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Na Vercel, `NEXT_PUBLIC_SITE_URL` deve receber a URL pública real, incluindo `https://`. O domínio atual de referência é `https://pericia-digital-marco-site.vercel.app/`, usado como fallback público.

A mesma fonte de URL é usada em canonical, sitemap, compartilhamento, QR Code e vCard. Em previews da Vercel, o projeto pode usar a URL informada automaticamente pela plataforma. Sem variável configurada, o fallback público é `https://pericia-digital-marco-site.vercel.app/`. Para QR/VCF apontarem para o servidor local, defina `NEXT_PUBLIC_SITE_URL` explicitamente antes de iniciar o servidor.

## Instalação e execução

```powershell
cd "C:\Users\marco\Desktop\Codex\pericia-digital-marco-site"
npm ci
npm run dev
```

Acesse:

- página principal: `http://localhost:3000`;
- cartão virtual: `http://localhost:3000/cartao`.

## Validação

```powershell
npm ls --depth=0
npm audit --omit=dev
npm audit
npm run lint
npm run test
npm run build
```

Na primeira execução local dos testes, instale o navegador do Playwright:

```powershell
npx playwright install chromium
```

Os testes verificam 320, 375, 390, 430, 768, 1024 e 1440 px, navegação móvel, ausência de rolagem horizontal, imagens, contatos, QR Code, VCF, metadados e cabeçalhos.

## Build de produção

```powershell
npm run build
npm start
```

## Cartão virtual

A página `/cartao` apresenta os mesmos dados profissionais centralizados em `data/profile.js` e oferece:

- acesso ao site principal;
- WhatsApp;
- ligação telefônica;
- e-mail;
- download do contato em `/cartao/contato.vcf`;
- compartilhamento nativo;
- cópia do link;
- QR Code em `/cartao/qr-code`;
- imagem social em `/cartao/opengraph-image`.

Se a Web Share API não estiver disponível, o botão de compartilhamento copia o endereço do cartão e informa o resultado na tela.

## Segurança e privacidade

O projeto não deve incluir senhas, tokens, chaves, arquivos `.env` reais, documentos sigilosos ou dados pessoais de terceiros. `.next`, `node_modules`, relatórios de teste e `.vercel` permanecem ignorados.

O retrato derivado `public/marco-barbosa.jpg` é usado na home, no cartão e nas duas imagens sociais. A imagem PNG original permanece preservada. Conversão e hashes: `docs/TSK-PROF-002_RETRATO.json`.

## Git e publicação

A atualização TSK-PROF-002 foi preparada na branch `codex/TSK-PROF-002-atualizacao-consolidada`. Em 19/09/2026, o proprietário autorizou commit, envio ao GitHub e verificação da publicação no Vercel. O remoto de produção usa `master`; o envio deve ser normal, sem reescrita de histórico.

O manual completo para criar o repositório no GitHub, enviar a branch, importar na Vercel, configurar variável e domínio está em:

[`docs/PUBLICACAO_GITHUB_VERCEL.md`](docs/PUBLICACAO_GITHUB_VERCEL.md)

## Autor

**Marco Aurélio Pereira Barbosa**

Campo Grande/MS

E-mail: [marcobarbosa@damauniverse.com.br](mailto:marcobarbosa@damauniverse.com.br)

Currículo Lattes: <https://lattes.cnpq.br/1970561249212557>

## Licença e uso

Este projeto possui finalidade institucional e autoral. A reprodução, adaptação ou redistribuição deve respeitar a autoria e eventuais restrições aplicáveis às imagens e ao conteúdo.

## Atualização consolidada — 19/09/2026

Páginas: `/formacao`, `/aplicacoes`, `/experiencia` e `/formacao/deteccao-imagens-ia`. Links internos abrem na mesma aba.

- [Relatório de implementação e validação](docs/TSK-PROF-002_RELATORIO.md)
- [Conteúdo confirmado e complementos opcionais](docs/TSK-PROF-002_PENDENCIAS.md)
- Telefone: (67) 99236-8049; e-mail: marcobarbosa@damauniverse.com.br.
- LinkedIn e Dama Universe são centralizados em `data/profile.js`.
