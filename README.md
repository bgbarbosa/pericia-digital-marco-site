# Site Profissional — Marco Aurélio Pereira Barbosa

Site institucional/profissional de apresentação de **Marco Aurélio Pereira Barbosa**, voltado à divulgação de trajetória, formação complementar, áreas de conhecimento e atuação relacionada à **Perícia Digital, Computação Forense e Evidências Digitais**.

O projeto tem finalidade de apresentação pública, com linguagem técnica, objetiva e institucional, reunindo informações sobre experiência, especialização, credenciais, contato profissional e referências de atuação.

## Objetivo

Apresentar, de forma clara e organizada:

* trajetória profissional;
* áreas de conhecimento em perícia digital e computação forense;
* formação complementar;
* credenciais profissionais;
* vínculo com estudos e tecnologia forense;
* canais de contato profissional;
* links externos relevantes, como Currículo Lattes;
* conexão futura com projetos digitais autorais.

## Identidade do site

O site adota uma identidade visual escura, técnica e profissional, com uso de tons em azul/ciano, fundo escuro e cards informativos.

A proposta visual busca transmitir:

* seriedade;
* organização;
* tecnologia;
* clareza técnica;
* confiabilidade;
* atuação profissional;
* foco em evidências digitais e computação forense.

## Stack utilizada

* Next.js
* React
* Tailwind CSS
* JavaScript
* Vercel
* GitHub

## Estrutura principal

```text
pericia-digital-marco-site/
├── app/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── public/
│   ├── apecof.jpeg
│   ├── marco.jpeg
│   └── favicon.ico
├── package.json
├── postcss.config.mjs
├── eslint.config.mjs
├── next.config.mjs
└── README.md
```

## Conteúdo da página

A página principal contém as seguintes seções:

* Início;
* Perícia Digital;
* Áreas de Especialização;
* Trajetória Profissional;
* Credenciais;
* APECOF;
* Contato.

## Informações apresentadas

O site apresenta informações públicas e institucionais sobre:

* perícia digital;
* computação forense;
* evidências digitais;
* dispositivos móveis;
* análise técnica;
* cadeia de custódia;
* documentação de vestígios;
* leitura crítica de laudos;
* formação complementar;
* contato profissional.

## Cuidados de segurança e privacidade

Este projeto não deve conter:

* dados sensíveis;
* dados de ocorrências reais;
* documentos sigilosos;
* informações restritas;
* senhas;
* tokens;
* chaves de API;
* arquivos `.env`;
* dados pessoais de terceiros;
* materiais institucionais não autorizados.

As imagens e informações utilizadas devem possuir autorização, finalidade institucional ou caráter público adequado.

## Rodar localmente

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:

```text
http://localhost:3000
```

Caso a porta 3000 esteja em uso, o Next.js poderá iniciar automaticamente em outra porta, como:

```text
http://localhost:3001
```

## Build de produção

Para gerar a versão de produção:

```bash
npm run build
```

Para executar localmente a versão gerada:

```bash
npm run start
```

## Lint

Para verificar o código com ESLint:

```bash
npm run lint
```

## Deploy

O deploy pode ser realizado pela Vercel.

Quando o projeto estiver conectado ao GitHub, cada atualização enviada para a branch principal poderá acionar novo deploy automático na Vercel, conforme configuração do projeto.

Fluxo recomendado:

```bash
git status
git add .
git commit -m "docs: atualiza README do site profissional"
git push origin main
```

## Integração com Dama Universe

Este site pessoal/profissional pode ser vinculado ao projeto **Dama Universe** como página de referência sobre o criador.

Estratégia recomendada:

* manter este site como apresentação profissional de Marco Aurélio Pereira Barbosa;
* manter o Dama Universe como ecossistema de projetos, programas, GPTs personalizados, downloads, blog e ferramentas;
* criar links cruzados entre os dois sites:

  * no Dama Universe: “Quem está por trás do Dama Universe”;
  * no site pessoal: “Projetos e ferramentas — Dama Universe”.

## Autor

**Marco Aurélio Pereira Barbosa**
Campo Grande/MS
E-mail: [marcobarbo@gmail.com](mailto:marcobarbo@gmail.com)
Currículo Lattes: https://lattes.cnpq.br/1970561249212557

## Licença e uso

Este projeto possui finalidade institucional e autoral.
A reprodução, adaptação ou redistribuição do conteúdo deve respeitar a autoria, a finalidade profissional e eventuais restrições aplicáveis às imagens, textos e materiais utilizados.
