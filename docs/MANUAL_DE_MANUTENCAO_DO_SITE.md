# Manual de manutenção do site profissional

Versão 2.0 — 28/07/2026. Este manual representa a implementação da branch `feat/reposicionamento-ia-chatgpt`, após o reposicionamento para Inteligência Artificial, ChatGPT e capacitações. Os procedimentos usam Windows PowerShell e JavaScript.

## 1. Visão geral e árvore comentada

```text
pericia-digital-marco-site/
|-- .github/workflows/ci.yml          # auditoria, lint, E2E e build
|-- app/
|   |-- cartao/
|   |   |-- contato.vcf/route.js      # vCard
|   |   |-- qr-code/route.js          # QR Code SVG
|   |   |-- opengraph-image.jsx       # imagem social do cartão
|   |   `-- page.js                   # /cartao
|   |-- global-error.js               # erro global, Client Component
|   |-- layout.js                     # layout e metadata global
|   |-- manifest.js                   # /manifest.webmanifest
|   |-- not-found.js                  # 404
|   |-- opengraph-image.jsx           # imagem social da home
|   |-- page.js                       # /
|   |-- robots.js                     # /robots.txt
|   `-- sitemap.js                    # /sitemap.xml
|-- components/                       # interface e seções
|-- data/profile.js                   # fonte estruturada de conteúdo
|-- lib/site-url.js                   # URL pública
|-- public/                            # retrato, marca e ícones
|-- tests/e2e/site.spec.js            # 14 testes Playwright
|-- next.config.mjs                   # CSP e headers
|-- package.json                      # scripts e dependências
`-- playwright.config.js              # servidor de teste na porta 3100
```

Server Components são o padrão. `components/Header.jsx`, `components/ShareCardActions.jsx` e `app/global-error.js` usam `"use client"`.

## 2. Preparação no Windows

Abra o PowerShell e execute:

```powershell
cd "C:\Users\marco\Desktop\Codex\pericia-digital-marco-site"
git status --short --branch
npm ci
```

Ambiente conferido: Node.js 24.x; o projeto usa npm e `package-lock.json`. Na primeira execução dos testes E2E, instale separadamente o navegador:

```powershell
npx playwright install chromium
```

Não coloque senha ou token em `.env.local`. `NEXT_PUBLIC_SITE_URL` é pública.

## 3. Procedimento padrão antes de alterar

1. Entre na pasta e execute `git status --short --branch`.
2. Identifique o arquivo principal na matriz da seção 37.
3. Pesquise consumidores do campo e registre impactos em home, cartão, metadata, OG, sitemap e testes.
4. Faça uma alteração por assunto; não edite arquivos gerados.
5. Execute localmente, teste visualmente e rode a validação completa.
6. Antes de commit, execute `git diff --check` e revise o diff no editor/Git.
7. Para desfazer, reverta somente as linhas da alteração no editor ou use um commit de reversão conforme a seção 34.

Comandos de validação confirmados:

```powershell
git diff --check
npm run lint
npm run test
npm run build
```

Não há script separado de typecheck ou cobertura.

## 4. Atualizar nome, título, biografia e contatos

**Objetivo:** alterar identidade e contato. **Principal:** `data/profile.js`. **Afetados:** hero, cartão, contato, metadata, OG, manifest, vCard e testes.

Edite conscientemente `profile.name`, `title`, `heroTitle`, `subtitle`, `introduction`, `phone.digits`, `phone.international`, `phone.display`, `email`, `city`, `lattes` e `image`. Preserve os três formatos do telefone e URLs completas. Em seguida, revise `/`, `/cartao`, vCard, OG e testes. Erros comuns são formatos de telefone divergentes, URL incompleta e texto antigo duplicado. Desfaça apenas os campos editados.

## 5. Alterar o hero

**Principal:** `components/HeroSection.jsx`. **Dados:** `profile` e `heroHighlights` em `data/profile.js`.

Mantenha um único H1, o CTA principal em `#capacitacoes`, o Lattes e o cartão. Cada destaque usa `{ label, text }`; preserve os eixos Formação, Aplicação e Experiência sem inserir o nome do órgão público. Teste texto, imagem e botões em 320, 390, 768 e 1440 px. O hero influencia a primeira impressão, os testes de posicionamento e, editorialmente, metadata e OG. Não reintroduza o cargo público como título principal.

## 6. Adicionar ou atualizar modalidade de capacitação

**Principal:** `capacityModalities` em `data/profile.js`. **Componente:** `CapacitySection` em `components/PositioningSections.jsx`.

Use objetos `{ title, text }`; a ordem do array é a ordem visual. Informe formato e limites sem transformar modalidades em catálogo permanente. Abra `/#capacitacoes`, confira o grid e rode os testes. Não há rota individual, preço, agenda, inscrição ou sitemap por modalidade. Para desfazer, reverta somente o objeto alterado.

## 7. Adicionar ou atualizar tema de IA

**Principal:** `aiApplications`; **componente:** `AiApplicationsSection`.

Use `{ title, text }`, preserve linguagem responsável e destaque validação humana, privacidade e limites quando aplicável. Teste `/#aplicacoes-ia` e responsividade. Uma alteração de posicionamento também exige revisar hero, metadata, OG, cartão e expectativas E2E.

## 8. Alterar soluções digitais

**Principal:** `digitalSolutionPoints`; **componente:** `DigitalSolutionsSection`.

Cada item usa `{ title, text }`. Soluções digitais são oferta secundária; não anuncie produto, disponibilidade ou integração que não exista. Valide `/#solucoes-digitais`, aviso institucional, contato e textos de metadata. A redação existente está preservada na publicação autorizada pelo proprietário.

## 9. Adicionar ou atualizar experiência e formação forense

**Principal:** `knowledgeAreas`; **componente:** `KnowledgeAreasSection` em `components/ProfessionalSections.jsx`.

Use `{ title, text }` e preserve a ordem: perícia digital; investigação/OSINT; computação forense; análise de dados; dispositivos móveis; documentos/laudos; imagem, áudio e vídeo; segurança da informação. A seção deve comunicar experiência, formação e conhecimento aplicado, nunca contratação de perícia ou garantia de resultado. `specializationAreas` é apenas alias de compatibilidade. Teste `/#conhecimentos`; o cartão usa a estrutura independente `virtualCardForensics`.

## 10. Alterar trajetória e credenciais

**Principais:** `TrajectorySection`, `CredentialsSection`, `credentials` e `emphasisPoints`.

Textos narrativos ficam em `components/ProfessionalSections.jsx`; `academicFormation`, `credentials` e `emphasisPoints` ficam em `data/profile.js`. Confirme formação e experiência antes de publicar. Teste `/#sobre`, credenciais e a marca APECOF. Mudanças curriculares podem exigir revisão do hero, cartão, metadata, OG e testes, mesmo quando não são consumidas automaticamente.

Fatos confirmados nesta versão:

- pós-graduação em Inteligência Artificial para Agentes da Lei, 360 horas, concluída em 2026;
- pós-graduação em Análise de Dados pela Faculdade FaCiencia, 360 horas, período de 2023 a 2024, concluída;
- especialização em Inteligência Artificial pela UTFPR em andamento;
- graduação em Administração concluída em 2009;
- curso de ChatGPT para Policiais e Agentes da Lei, 40 horas, concluído em 2024;
- mais de 12 anos de experiência em investigação e análise técnica.

O certificado e o histórico, por serem posteriores, confirmam a conclusão da pós-graduação em Inteligência Artificial para Agentes da Lei, embora o Lattes ainda apresente status antigo. Não altere “em andamento” para a especialização da UTFPR sem nova comprovação. Os documentos acadêmicos são apenas fontes de verificação: não copie PDFs/XML para `public/` ou para o repositório e não transcreva CPF, RG, data de nascimento, endereço, códigos, QR acadêmico, registros, notas ou nomes de professores.

## 11. Tratar o cargo público

O cargo público deve permanecer como informação curricular em trajetória/credenciais, nunca como endosso, marca comercial ou título do hero/cartão. Revise `ProfessionalSections.jsx`, `credentials`, `Footer.jsx`, hero, cartão, metadata e OG. O teste E2E exige ausência do cargo no hero e presença em `#sobre`. O aviso institucional deve ser validado antes da publicação.

## 12. Alterar a APECOF e o logotipo

**Principal:** `profile.association` e `public/apecof.jpeg`. A associação aparece na área de credenciais da home; foi removida do cartão.

Preserve `acronym`, `name`, `image` e `statement`, o logotipo existente e sua apresentação responsiva. A associação foi confirmada pelo proprietário em 19/09/2026 e não requer nova autorização. Alterações futuras só devem ocorrer mediante solicitação expressa. Teste a home e verifique que o cartão continua sem o logotipo, salvo novo requisito aprovado. APECOF não é referência bibliográfica nem endosso automático.

## 13. Alterar a home e sua ordem

`app/page.js` compõe, nesta ordem: `Header`, `HeroSection`, `CapacitySection`, `AiApplicationsSection`, `DigitalSolutionsSection`, `KnowledgeAreasSection`, `TrajectorySection`, `CredentialsSection`, `ContactSection` e `Footer`.

Ao mover uma seção, preserve import/export, IDs, ordem do menu e hierarquia de títulos. Teste todas as âncoras e o fluxo em celular. Nova rota só entra no sitemap quando realmente criada e indexável.

## 14. Alterar menu e rodapé

**Menu:** `homeMenu` e `cardMenu` em `data/profile.js`, renderizados por `Header.jsx`. `cardMenu` converte `#id` em `/#id`. O texto visual da marca ainda é fixo como `M.A.P.B` no Header.

**Rodapé:** `components/Footer.jsx`. Confira o link do cartão, ano, descrição e aviso. Teste desktop/mobile, Escape, foco, abertura e fechamento. Um `href` deve corresponder exatamente a um `id` existente.

## 15. Alterar o aviso institucional

**Principal:** `components/Footer.jsx`; confira também `ProfessionalSections.jsx` e `data/profile.js`. O aviso deve distinguir atuação profissional, cargo público e eventual associação. Não publique texto jurídico ou institucional não aprovado. Esta redação é **PENDENTE DE VALIDAÇÃO**.

## 16. Alterar o contato

**Dados:** `profile.phone`, `profile.email`, `profile.city`; **URLs:** `whatsappUrl`, `telephoneUrl`, `emailUrl`; **interface:** `ContactSection.jsx`.

Teste WhatsApp, ligação, e-mail, cartão e vCard em dispositivo apropriado. O site não recebe nem armazena mensagens. Não crie campos visuais que pareçam formulário sem implementar validação, servidor, privacidade, antispam e testes.

## 17. Atualizar o cartão virtual

**Página:** `app/cartao/page.js`; **interface:** `VirtualCard.jsx`; **dados:** `profile`, `virtualCardAreas` e `virtualCardForensics`.

Mantenha o e-mail profissional escrito e clicável abaixo do posicionamento, além das quatro áreas principais e do bloco em largura total “Investigação e tecnologia forense”. O e-mail deve continuar vindo de `profile.email` e `emailUrl`, sem duplicação manual. O bloco forense deve ter destaque moderado, sem ícone, animação, CTA ou linguagem de contratação. Revise metadata específica, contatos, endereço exibido, QR, vCard e compartilhamento. O cartão não exibe APECOF. Teste em 390 px e desktop, inclusive sem Web Share API.

## 18. Validar QR Code e vCard

**QR:** `app/cartao/qr-code/route.js`; **vCard:** `app/cartao/contato.vcf/route.js`; **URL:** `lib/site-url.js`.

Com `npm run dev` ativo, abra no navegador `/cartao/qr-code` e `/cartao/contato.vcf`. Confirme SVG válido, alvo do cartão, download VCF e dados atualizados. O Playwright também valida MIME, conteúdo e URL. Erro comum: QR ou vCard apontar para localhost porque a URL pública não foi configurada.

## 19. Alterar compartilhamento

**Principal:** `components/ShareCardActions.jsx`, Client Component. Preserve Web Share API e fallback de cópia pela Clipboard API, status acessível e tratamento de erro. Teste `/cartao` em navegador com e sem compartilhamento nativo. Alterar a URL exige revisar a seção 25.

## 20. Adicionar ou trocar imagens

Retrato: `public/marco-barbosa.jpg`; APECOF: `public/apecof.jpeg`. Confirme direito de uso, proporção, compressão e remoção de EXIF/GPS quando aplicável. `next/image` é usado na interface; as imagens OG leem o retrato pelo sistema de arquivos. Se renomear, atualize `profile.image` e ambos os arquivos OG. Teste carregamento, enquadramento, texto alternativo e build.

## 21. Alterar favicon e ícones

Arquivos: `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `public/icon-192.png` e `public/icon-512.png`. Consumidores: `app/layout.js` e `app/manifest.js`. Preserve dimensões declaradas, formato e contraste. Teste aba do navegador, manifest e build; caches podem exigir novo deploy ou limpeza no navegador.

## 22. Alterar metadata e SEO

Global: `app/layout.js`. Cartão: `app/cartao/page.js`. Altere título, descrição, categoria, canonical, Open Graph e Twitter Card de forma coordenada. `metadataBase` vem de `lib/site-url.js`; não grave domínio provisório no código. Teste HTML e rotas de imagem. Uma mudança de posicionamento exige pesquisa por textos antigos em layout, cartão, OG, manifest e testes.

## 23. Alterar imagens Open Graph

Home: `app/opengraph-image.jsx`; cartão: `app/cartao/opengraph-image.jsx`. Ambas geram PNG 1200×630. Mantenha apenas CSS compatível com `ImageResponse`, revise retrato e textos e abra as duas rotas no navegador. Falhas comuns são caminho de imagem incorreto e propriedade de estilo não suportada. O build e o E2E devem continuar verdes.

## 24. Atualizar sitemap e robots

`app/sitemap.js` lista apenas `/` e `/cartao`. `app/robots.js` permite rastreamento e informa host/sitemap quando há URL pública. Não inclua QR, vCard, OG ou páginas de erro. Ao criar rota pública indexável, atualize sitemap e teste `/sitemap.xml` e `/robots.txt`. Sem URL pública, o sitemap pode ficar vazio por projeto.

## 25. Alterar a URL pública

**Principal:** variável `NEXT_PUBLIC_SITE_URL`; **regra:** `lib/site-url.js`; **consumidores:** canonical, OG, sitemap, robots, QR, vCard e endereço do cartão.

Em desenvolvimento, use `http://localhost:3000`. Na Vercel, configure a URL HTTPS confirmada em Preview/Production conforme o ambiente. Não inclua barra/caminho específico nem segredo. Depois da mudança, execute build e valide todos os consumidores. Domínio definitivo ainda está **PENDENTE DE VALIDAÇÃO**.

## 26. Alterar headers e CSP

**Principal:** `next.config.mjs`. Há CSP, COOP, Permissions Policy, Referrer Policy, `nosniff`, `DENY` e HSTS condicional.

Libere somente a origem e a diretiva necessárias; não use `*` como atalho. Teste `/`, `/cartao`, imagens, fontes, QR, vCard, console e E2E. Serviços de vídeo, analytics ou formulário exigiriam revisão de CSP, privacidade e novo escopo.

## 27. Alterar estilos e responsividade

Tailwind 4 é aplicado no JSX; base e variáveis ficam em `app/globals.css`. Trabalhe mobile-first e preserve foco, alvos de pelo menos 44 px e `prefers-reduced-motion`. Revise 320, 375, 390, 430, 768, 1024 e 1440 px; cabeçalho também em larguras grandes. Não use ocultação de overflow para mascarar largura fixa incorreta.

## 28. Criar nova página futuramente

Esta é apenas uma orientação futura. O projeto usa JavaScript: crie `app/nova-rota/page.js` ou um componente `.jsx`, nunca `page.tsx` sem migração aprovada. Defina metadata, reutilize Header/Footer, trate estados, adicione menu/sitemap quando aplicável e crie teste. Não crie a rota para simular programa, blog ou catálogo ainda inexistente.

## 29. Adicionar uma dependência

Confirme necessidade, manutenção, licença, segurança e compatibilidade com Node 24/Next 16. Instale pelo npm para atualizar `package.json` e lockfile; nunca edite o lockfile à mão. Depois, execute lint, testes e build e revise CSP/privacidade. O comando de instalação específico deve ser confirmado no momento da mudança; este manual não prescreve pacote inexistente.

## 30. Remover uma dependência

Pesquise imports, configuração e uso dinâmico; remova pelo npm somente depois de confirmar que ficou sem consumidores. Revise `package.json`, lockfile, rotas e build. Não use limpeza destrutiva ou alteração manual do lockfile. O comando exato deve ser confirmado conforme o pacote real.

## 31. Executar lint, testes e build

```powershell
cd "C:\Users\marco\Desktop\Codex\pericia-digital-marco-site"
git status --short --branch
git diff --check
npm run lint
npm run test
npm run build
```

`npm run test` executa 14 testes Playwright e inicia o servidor na porta 3100. `npm run build` faz a verificação integrada do Next.js. Não existe script separado de typecheck ou cobertura.

## 32. Validar antes de publicar

- [ ] conteúdo institucional preservado conforme autorização; associação APECOF confirmada pelo proprietário em 19/09/2026;
- [ ] domínio, Vercel e branch de produção confirmados;
- [ ] nome, conteúdo, contatos, imagens e Lattes conferidos;
- [ ] `/`, `/cartao`, QR, vCard, OG, manifest, robots e sitemap conferidos;
- [ ] menu, teclado, foco e viewports revisados;
- [ ] CSP e ausência de erros no console conferidas;
- [ ] `git diff --check`, lint, 14 testes e build aprovados;
- [ ] nenhum `.env`, segredo, `.next`, `node_modules` ou relatório incluído;
- [ ] rollback identificado.

## 33. Visualizar localmente e publicar

### 33.1 Visualização em desenvolvimento

```powershell
cd "C:\Users\marco\Desktop\Codex\pericia-digital-marco-site"
git status --short --branch
npm ci
npm run dev
```

Abra `http://localhost:3000` e `http://localhost:3000/cartao`. Para parar, pressione `Ctrl+C` no terminal.

### 33.2 Visualização igual ao modo de produção

```powershell
npm run build
npm start
```

Abra os mesmos endereços e pare com `Ctrl+C`. Não execute `npm run dev` e `npm start` simultaneamente na mesma porta.

### 33.3 Subir as mudanças para o GitHub

Antes do envio:

```powershell
git status --short --branch
git diff --check
npm run lint
npm run test
npm run build
```

Depois de confirmar que a branch contém apenas os commits aprovados, o comando de envio é:

```powershell
git push -u origin feat/reposicionamento-ia-chatgpt
```

Esse comando altera o repositório remoto e **não foi executado nesta etapa**. Ele envia a branch, não publica automaticamente em produção.

### 33.4 Publicar pela Vercel

1. Envie a branch ao GitHub somente após autorização.
2. Abra um pull request e revise o preview, se a integração GitHub/Vercel estiver ativa.
3. No painel Vercel, confirme projeto, Root Directory na raiz, Node 24.x e Build Command `npm run build`.
4. Configure `NEXT_PUBLIC_SITE_URL` com a URL HTTPS confirmada nos ambientes corretos.
5. Valide o Preview; depois faça merge na branch de produção aprovada.
6. Confirme o deployment de produção e repita o checklist pós-deploy.

Projeto Vercel, domínio e branch de produção ainda são **PENDENTES DE VALIDAÇÃO**. Não use publicação por CLI até confirmar conta e projeto.

## 34. Desfazer alterações e reverter commit

Antes do commit, revise o diff e desfaça apenas suas linhas pelo editor. Depois do commit, prefira um novo commit de reversão auditável; evite `reset --hard`, `clean` e reescrita de histórico compartilhado. Em produção, reverta o commit e gere novo deploy ou promova um deployment anterior no painel, após confirmar o alvo. Sempre repita testes.

## 35. Solução de problemas

| Problema | Verificação/correção |
|---|---|
| Âncora não funciona | compare `homeMenu.href` com o `id` da seção |
| Menu móvel falha | revise `Header.jsx`, console, foco e teste E2E |
| Imagem quebra | confira nome, capitalização, `profile.image` e arquivo público |
| OG falha | abra a rota OG; revise retrato e estilos de `ImageResponse` |
| QR/vCard aponta a localhost | configure `NEXT_PUBLIC_SITE_URL` e gere novo build/deploy |
| Canonical/sitemap ausente | confirme URL pública válida em `lib/site-url.js`/ambiente |
| Contato incorreto | alinhe os três formatos do telefone e URLs derivadas |
| Build falha | leia o primeiro erro de import, sintaxe, metadata ou dependência |
| Teste falha | corrija produto ou expectativa conforme o requisito real |
| CSP bloqueia recurso | libere a origem mínima somente após aprovação |
| Layout transborda | corrija largura/classe base no menor viewport |
| Formulário/analytics/banner não funciona | capacidade não existe; exige novo escopo |

## 36. Checklists rápidos

**Conteúdo:** editar fonte correta; conferir home/cartão; pesquisar texto antigo; revisar metadata/OG; testar.

**Imagem:** autorização; dimensões; metadados sensíveis; caminhos; alt; home/cartão/OG.

**Publicação:** status limpo; validações verdes; preview; URL pública; celular real; rollback.

**Segurança:** finalidade; privacidade; CSP mínima; sem segredo no cliente; teste de bloqueio/carregamento.

## 37. Matriz “o que alterar”

| Quero alterar | Principal | Revisar também |
|---|---|---|
| Identidade/contato | `data/profile.js` | home, cartão, vCard, metadata, OG, testes |
| Capacitações | `capacityModalities` | `CapacitySection`, hero, contato |
| Temas de IA | `aiApplications` | seção, metadata, OG |
| Soluções digitais | `digitalSolutionPoints` | seção, contato, aviso |
| Experiência/formação forense | `knowledgeAreas` | seção, ordem dos cards, cartão e E2E |
| Formação acadêmica | `academicFormation` | trajetória, revisão curricular do hero e E2E |
| Trajetória/credenciais | `ProfessionalSections.jsx`, listas | cargo público, APECOF, testes |
| Hero | `HeroSection.jsx`, `heroHighlights` | metadata, OG, E2E |
| Menu | `homeMenu` | IDs, Header, cartão e E2E |
| Cartão | `VirtualCard.jsx`, `virtualCardAreas`, `virtualCardForensics` | metadata, QR, vCard, compartilhar |
| SEO/URL | layout e `site-url.js` | OG, sitemap, robots, QR, vCard |
| Segurança | `next.config.mjs` | integrações, console e testes |

## 38. Arquivos críticos

| Arquivo | Risco |
|---|---|
| `data/profile.js` | alimenta quase todo o conteúdo e contato |
| `lib/site-url.js` | afeta canonical, sitemap, QR e vCard |
| `next.config.mjs` | cabeçalhos globais podem bloquear o site |
| `app/layout.js` | metadata e layout global |
| `components/Header.jsx` | navegação, foco e mobile |
| Route Handlers do cartão | downloads/compartilhamento público |
| arquivos Open Graph | previews sociais e build |
| `package.json`/lockfile | instalação, CI e deploy |
| `tests/e2e/site.spec.js` | contrato automatizado do comportamento |

## 39. Convenções

- JavaScript `.js`/`.jsx`, componentes em PascalCase e App Router;
- alias `@/` para a raiz, IDs minúsculos sem acentos e dados em `data/profile.js`;
- português do Brasil, conteúdo verificável e sem promessa não aprovada;
- layout mobile-first, foco visível e `next/image`;
- links externos em nova guia com `noopener noreferrer`;
- commits em português e Conventional Commits;
- não versionar `.env`, `.next`, `node_modules`, `.vercel` ou relatórios gerados.

## 40. Glossário

| Termo | Significado |
|---|---|
| App Router | rotas do Next.js baseadas na pasta `app/` |
| Server Component | componente executado no servidor por padrão |
| Client Component | componente com `"use client"` e APIs do navegador |
| Route Handler | endpoint HTTP, usado para QR e vCard |
| Metadata/OG | dados de navegador, buscador e compartilhamento |
| Canonical | URL preferida para indexação |
| CSP | política que limita origens de recursos |
| Preview | deployment de validação antes da produção |
| CI | validação automática no GitHub Actions |
| E2E | teste do fluxo completo no navegador |
| Rollback | retorno auditável a uma versão anterior |

## 41. Funcionalidades não existentes

Não há procedimento operacional atual para cadastrar programa, publicar download de programa, publicar atualização, criar post de blog, cadastrar referência, publicar vídeo, alterar analytics, alterar banner de cookies ou enviar formulário.

Para **cada uma** dessas capacidades vale a mesma regra: esta capacidade não existe na implementação atual. Sua inclusão requer novo escopo, definição de modelo de dados, rotas, componentes, metadados, sitemap, segurança e testes. Não crie entidade, arquivo ou exemplo fictício que pareça funcionalidade publicada.

## Atualização operacional — TSK-PROF-002 (19/09/2026)

Esta seção prevalece sobre exemplos históricos anteriores deste manual. Há seis páginas públicas; aprofundamentos em `app/formacao`, `app/aplicacoes`, `app/experiencia` e `app/formacao/deteccao-imagens-ia`. A home mantém resumos e âncoras compatíveis.

Contatos e retrato: `data/profile.js`. Ambas as rotas `opengraph-image.jsx` leem `profile.image`. Preserve o PNG original e registre novos derivados no manifesto do retrato.

Dados de eventos/demonstrações aprovados: `data/public-content.js`; contratos em `TSK-PROF-002_PENDENCIAS.md`. Nunca coloque rascunhos ou imagens restritas em `public`, nas props de Client Components ou nesses arrays. Os componentes de apresentação ficam em `ApprovedContent.jsx`; filtros em `lib/public-content.js`.

Navegação interna: mesma aba. Menu móvel usa diálogo modal nativo, com foco isolado, Escape e restauração de rolagem. Testes existentes foram preservados e adaptados à realocação de conteúdo. Testes novos: `tests/e2e/consolidated.spec.js`.

Validação e resultados efetivos: `TSK-PROF-002_RELATORIO.md`. Conteúdo confirmado e campos opcionais: `TSK-PROF-002_PENDENCIAS.md`. Nenhum questionário é necessário para a entrega atual.

## Atualização local — Perícia na Prática

Para a nova coleção, prevalecem os procedimentos de `PERICIA_NA_PRATICA.md`. A fonte editorial única é `data/practice-articles.json`; as cinco novas rotas usam `/pericia-na-pratica`. A home mantém IA como apresentação principal e recebe uma chamada para os quatro artigos.

AI Brasil fica em `profile.community`, junto à APECOF na home. O retrato ativo é `public/marco-barbosa-profissional.jpg`, centralizado em `profile.image`; o PNG original e as imagens anteriores são preservados. O formato das imagens embutidas em Open Graph acompanha `profile.imageType`. O manifesto `PERICIA_NA_PRATICA_INTEGRIDADE.json` registra os hashes.

A publicação foi autorizada para 11/10/2026, com envio de `HEAD` para `origin/master` e deployment automático no projeto Vercel existente `marcopericia`. A coleção e os quatro artigos registram essa data, estado `publicado` e URLs na origem `https://pericia-digital-marco-site.vercel.app`; `preparedAt` permanece apenas como registro de preparação. A conclusão externa depende do commit remoto, do CI e do conteúdo público confirmados no relatório de entrega. A suíte nova é `tests/e2e/practice.spec.js`; `npm run test` também executa `tests/unit/audit-dev-allowlist.test.mjs`. Os totais executados devem ser consultados no relatório, sem reutilizar contagens históricas.

O gate `npm audit --omit=dev` exige zero vulnerabilidades. `node scripts/audit-dev-allowlist.mjs` admite somente a exceção de desenvolvimento descrita em `EXCECAO_AUDITORIA_BRACES.md`, válida até 11/11/2026 em America/Cuiaba. `npm audit` puro continua retornando saída 1 por esse aviso; a exceção deve ser retirada assim que houver correção compatível.

## Fluxo atual — contato e navegação

O fluxo atual está em [`CONTATO_E_NAVEGACAO_LOCAL.md`](CONTATO_E_NAVEGACAO_LOCAL.md) e prevalece sobre as instruções antigas de `mailto:`, âncoras de aplicações na home e páginas gerais de formação/experiência. Toda nova publicação exige autorização explícita e validação do lote correspondente.
