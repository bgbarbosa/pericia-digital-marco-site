> Registro histórico anterior à TSK-PROF-002. Contatos, imagens e procedimentos aqui citados podem estar superados. Consulte data/profile.js e docs/TSK-PROF-002_RELATORIO.md para o estado atual. Este registro não autoriza publicação.

# PRD — Site profissional de Marco Aurélio Pereira Barbosa

## 1. Identificação do produto

| Item | Estado confirmado em 28/07/2026 |
|---|---|
| Produto | Site profissional de Marco Aurélio Pereira Barbosa |
| Versão documental | 2.0 — pós-reposicionamento |
| Responsável identificado | Marco Aurélio Pereira Barbosa |
| Domínio público | **PENDENTE DE VALIDAÇÃO** |
| Repositório | `https://github.com/bgbarbosa/pericia-digital-marco-site.git` |
| Branch de trabalho | `feat/reposicionamento-ia-chatgpt` |
| Commit da implementação | `7123785e541b3de6b80a25f0dab900fb9c1a0870` |
| Tecnologias | JavaScript, Next.js 16.2.10, React 19.2.7, Tailwind CSS 4.3.2 e Playwright 1.61.1 |
| Runtime previsto | Node.js 24.x e npm |
| Hospedagem prevista | Vercel; vínculo, projeto, branch de produção e domínio ainda pendentes de validação |

## 2. Visão do produto

O produto é uma presença profissional enxuta, destinada a apresentar serviços e facilitar contato. O posicionamento principal é Inteligência Artificial, ChatGPT e capacitações práticas — treinamentos, cursos, oficinas, palestras e mentorias — para profissionais e equipes.

Soluções digitais personalizadas aparecem como oferta secundária. Perícia digital, investigação e tecnologia forense recebem uma seção própria de experiência e formação técnica, sem disputar o protagonismo do posicionamento em IA e sem caracterizar oferta comercial direta de serviços periciais.

O site atende profissionais, equipes, organizações, gestores, educadores, profissionais do Direito e da segurança pública, estudantes e pessoas interessadas em IA ou soluções digitais. Sua proposta de valor é comunicar competências de forma clara, responsável e verificável, sem apresentar catálogo, agenda, preço ou promessa comercial inexistente.

## 3. Objetivos

### Principais

- tornar inequívoco o posicionamento em IA, ChatGPT e capacitações;
- apresentar modalidades, temas e aplicações da IA;
- permitir contato direto e acesso ao cartão virtual.

### Secundários

- apresentar soluções digitais personalizadas;
- registrar trajetória, formação acadêmica, experiência forense e credenciais;
- preservar independência institucional entre atuação profissional e cargo público.

### Técnicos e editoriais

- manter dados recorrentes centralizados e conteúdo rastreável;
- oferecer navegação responsiva, acessível por teclado e sem rolagem horizontal;
- manter metadata, Open Graph, manifest, sitemap e robots coerentes;
- minimizar integrações externas, coleta de dados e superfície de ataque;
- executar lint, testes E2E e build antes de publicação;
- evitar alegações não verificadas, exposição de segredos e associação institucional indevida.

## 4. Escopo implementado

- home em página única, com hero e âncoras;
- seções de capacitações, aplicações de IA, soluções digitais, experiência e formação forense, trajetória, credenciais e contato;
- cartão virtual reposicionado, com quatro áreas resumidas e bloco de investigação e tecnologia forense;
- links de WhatsApp, telefone, e-mail e Currículo Lattes;
- QR Code SVG gerado localmente e vCard VCF gerado por Route Handlers;
- compartilhamento pela Web Share API, com alternativa pela Clipboard API;
- metadata global e específica do cartão, canonical condicional, Open Graph e Twitter Card;
- imagens Open Graph geradas por código, manifest, sitemap e robots;
- páginas de erro global e 404;
- CSP e cabeçalhos defensivos;
- 14 testes E2E, lint, build e CI no GitHub Actions.

## 5. Escopo não encontrado

Não existem páginas independentes de cursos, catálogo de cursos, agenda, projetos autorais publicados, blog, programas, downloads de programas, últimas atualizações, referências, vídeos, CMS, busca, formulário, banco de dados, autenticação, analytics, cookies, banner de consentimento, checkout, preços ou planos comerciais.

Esses itens não possuem procedimento operacional. Uma inclusão futura exige novo escopo, modelo de dados, rotas, componentes, metadata, sitemap, segurança e testes próprios. Não devem ser tratados como funcionalidade existente.

## 6. Perfis de usuários

| Perfil | Necessidade principal |
|---|---|
| Profissionais e equipes | Conhecer capacitações aplicáveis ao trabalho |
| Organizações e gestores | Avaliar temas, modalidades e possibilidade de solução sob medida |
| Educadores e estudantes | Conhecer abordagem, formação e formas de contato |
| Direito e segurança pública | Verificar trajetória e conhecimentos técnicos complementares |
| Interessados em soluções digitais | Entender a oferta secundária e iniciar conversa |
| Visitantes do cartão | Salvar contato, compartilhar ou acessar canais diretos |
| Mantenedor | Atualizar conteúdo com segurança e validar a publicação |

## 7. Jornadas

1. O visitante acessa `/`, reconhece o posicionamento no hero e navega por âncoras.
2. Consulta modalidades em `#capacitacoes` e aplicações em `#aplicacoes-ia`.
3. Consulta soluções em `#solucoes-digitais`, conhecimentos em `#conhecimentos` e formação em `#sobre`.
4. Usa `#contato` para WhatsApp, ligação ou e-mail; não há formulário.
5. Acessa `/cartao`, salva `/cartao/contato.vcf`, lê o QR Code ou compartilha o endereço.
6. Em celular, usa o menu móvel, os botões de contato e o layout sem rolagem horizontal.

## 8. Requisitos funcionais rastreáveis

| ID | Descrição | Situação e arquivos | Critério de aceitação |
|---|---|---|---|
| RF-001 | Exibir hero com prioridade para capacitações em IA | Implementado: `components/HeroSection.jsx`, `data/profile.js` | H1, subtítulo, introdução e CTA `#capacitacoes` visíveis |
| RF-002 | Exibir modalidades de capacitação | Implementado: `capacityModalities`, `CapacitySection` | Quatro modalidades renderizadas em `#capacitacoes` |
| RF-003 | Exibir temas e aplicações de IA | Implementado: `aiApplications`, `AiApplicationsSection` | Seis temas renderizados em `#aplicacoes-ia` |
| RF-004 | Exibir soluções digitais como oferta secundária | Implementado: `digitalSolutionPoints`, `DigitalSolutionsSection` | Quatro pontos em `#solucoes-digitais` |
| RF-005 | Exibir experiência e formação em perícia, investigação e tecnologia forense | Implementado: `knowledgeAreas`, `KnowledgeAreasSection` | Título forense, texto de contexto e oito áreas ordenadas em `#conhecimentos`, sem CTA comercial |
| RF-006 | Exibir trajetória, credenciais e associação | Implementado: `ProfessionalSections.jsx`, `profile.js` | Cargo aparece como informação curricular e APECOF na home |
| RF-007 | Oferecer contato direto | Implementado: `ContactSection.jsx`, URLs derivadas | WhatsApp, `tel:` e `mailto:` funcionam sem coleta pelo site |
| RF-008 | Oferecer cartão virtual | Implementado: `/cartao`, `VirtualCard.jsx` | Identidade, e-mail escrito e clicável, quatro áreas, bloco forense e demais contatos visíveis |
| RF-009 | Gerar QR Code e vCard | Implementado: Route Handlers em `app/cartao/` | Respostas SVG/VCF válidas e alvo coerente com a URL |
| RF-010 | Compartilhar cartão | Implementado: `ShareCardActions.jsx` | Web Share quando disponível; cópia como alternativa |
| RF-011 | Manter SEO técnico | Implementado: layout, metadata, OG, manifest, sitemap, robots | Rotas respondem e canonical só aparece com URL pública |
| RF-012 | Oferecer navegação responsiva e acessível | Implementado: `Header.jsx`, estilos e testes | menu por teclado, foco, Escape e sem overflow |
| RF-013 | Tratar erros | Implementado: `app/not-found.js`, `app/global-error.js` | 404 e erro global apresentam saída compreensível |

## 9. Requisitos não funcionais

- **Desempenho:** renderização majoritariamente no servidor, `next/image`, fontes otimizadas e ausência de scripts analíticos.
- **Segurança:** CSP, COOP, Permissions Policy, Referrer Policy, `nosniff`, `DENY` e HSTS condicional.
- **Privacidade:** apenas dados profissionais públicos; sem formulário, cookies próprios, banco ou armazenamento local persistente.
- **Acessibilidade:** HTML semântico, idioma `pt-BR`, foco visível, ARIA no menu e suporte a movimento reduzido.
- **Compatibilidade:** navegadores atuais com fallback para compartilhamento; layout de 320 a 1440 px validado.
- **Manutenibilidade:** JavaScript, App Router, dados estruturados e componentes por responsabilidade.
- **Confiabilidade:** lint, 14 testes E2E, build e CI.
- **SEO:** metadata e rotas de SEO dependentes de URL pública válida.
- **Disponibilidade:** dependente do provedor futuro; SLA não definido.
- **Escalabilidade editorial:** adequada ao site estático atual; não há CMS.
- **Dependências externas:** limitadas a fontes via Next, Lattes, WhatsApp, telefonia e e-mail acionados pelo visitante.

## 10. Arquitetura

Next.js 16.2.10 e React 19.2.7 usam App Router. Componentes são Server Components por padrão. `Header.jsx`, `ShareCardActions.jsx` e `app/global-error.js` são Client Components por dependerem de estado ou APIs do navegador. Dados estão em `data/profile.js`; URL em `lib/site-url.js`; cabeçalhos em `next.config.mjs`; testes em `tests/e2e/site.spec.js`.

```text
Visitante
   |
   v
Next.js App Router
   |
   +-- Layout e metadados globais
   +-- Home em página única
   |     +-- componentes de posicionamento
   |     +-- componentes profissionais
   |     +-- dados centralizados
   |
   +-- Cartão virtual
   |     +-- contatos e compartilhamento
   |     +-- QR Code e vCard (Route Handlers)
   |
   +-- Metadata routes
         +-- Open Graph
         +-- manifest
         +-- sitemap
         +-- robots
```

Rotas públicas: `/`, `/cartao`, `/cartao/contato.vcf`, `/cartao/qr-code`, `/opengraph-image`, `/cartao/opengraph-image`, `/manifest.webmanifest`, `/robots.txt` e `/sitemap.xml`.

## 11. Modelo de conteúdo

Todos os campos abaixo têm obrigatoriedade prática: sua remoção exige revisar consumidores e testes.

| Estrutura/campo | Tipo | Finalidade e exemplo não sensível | Consumidores |
|---|---|---|---|
| `profile.name`, `initials` | string | identidade; `M.A.P.B` | páginas, metadata, OG, vCard |
| `profile.title`, `heroTitle`, `subtitle`, `introduction` | string | posicionamento e apresentação | hero, cartão, manifest, vCard |
| `profile.phone` | objeto com 3 strings | formatos para link e exibição | contato, cartão, vCard |
| `profile.email`, `city`, `lattes`, `image` | string | contato, localidade, currículo e retrato | home, cartão, OG, vCard |
| `profile.association` | objeto | sigla, nome, imagem e declaração da APECOF | credenciais da home |
| `homeMenu` | array de `{label, href}` | navegação por âncoras | `Header` da home |
| `cardMenu` | array derivado | converte âncoras para `/#...` | `Header` do cartão |
| `capacityModalities` | array de `{title, text}` | treinamentos, cursos/oficinas, palestras e mentorias | `CapacitySection` |
| `aiApplications` | array de `{title, text}` | seis aplicações de IA | `AiApplicationsSection` |
| `digitalSolutionPoints` | array de `{title, text}` | quatro pontos de soluções digitais | `DigitalSolutionsSection` |
| `knowledgeAreas` | array de `{title, text}` | oito áreas de experiência e formação técnica | `KnowledgeAreasSection` |
| `specializationAreas` | alias de array | compatibilidade interna temporária | nenhum consumidor principal atual |
| `heroHighlights` | array de `{label, text}` | formação, aplicação e experiência | `HeroSection` |
| `virtualCardAreas` | array de strings | quatro áreas resumidas | `VirtualCard` |
| `virtualCardForensics` | objeto `{title, text}` | experiência em investigação e tecnologia forense | `VirtualCard` |
| `academicFormation` | array de strings | formações acadêmicas confirmadas e situação da UTFPR | `TrajectorySection` |
| `emphasisPoints`, `credentials` | array de strings | valores e currículo | `CredentialsSection` |
| `whatsappUrl`, `telephoneUrl`, `emailUrl` | strings derivadas | links de contato | home e cartão |

### Fatos curriculares confirmados

- pós-graduação lato sensu em Inteligência Artificial para Agentes da Lei, 360 horas, concluída em 2026;
- pós-graduação em Análise de Dados, 360 horas, concluída em 2024;
- especialização em Inteligência Artificial pela UTFPR em andamento;
- graduação em Administração concluída em 2009;
- curso de ChatGPT para Policiais e Agentes da Lei, 40 horas, concluído em 2024;
- mais de 12 anos de experiência em investigação e análise técnica;
- formação técnica em perícia digital, computação forense, dispositivos móveis, OSINT, imagem, áudio, vídeo, análise de dados e ferramentas forenses.

O certificado e o histórico escolar, por serem posteriores, prevalecem sobre o status ainda desatualizado do Lattes para a pós-graduação em Inteligência Artificial para Agentes da Lei. A especialização da UTFPR permanece explicitamente **em andamento**.

## 12. Fontes de dados e fluxos

| Tipo | Arquivo principal | Estrutura | Consumidores/observações |
|---|---|---|---|
| Dados profissionais | `data/profile.js` | objetos, arrays e URLs derivadas | home, cartão, handlers e metadata |
| Formação acadêmica verificada | certificado, histórico e currículo fornecidos pelo titular | fontes externas ao repositório | somente fatos curriculares necessários foram transcritos |
| Textos de posicionamento | `data/profile.js` e `components/PositioningSections.jsx` | dados + títulos introdutórios em JSX | home |
| Trajetória e credenciais | `components/ProfessionalSections.jsx` + dados | texto editorial em JSX e listas | home |
| Contato e aviso institucional | `components/ContactSection.jsx`, `components/Footer.jsx` | texto direto em JSX | home e rodapé |
| SEO e compartilhamento | `app/layout.js`, `app/cartao/page.js`, arquivos OG | strings parcialmente duplicadas | buscadores e mensageiros |
| URL pública | `lib/site-url.js` + ambiente | URL validada | canonical, sitemap, robots, QR, vCard |

Há duplicação deliberada de mensagens entre perfil, metadata, OG, cartão e rodapé. Toda mudança de posicionamento deve pesquisar os termos antigos nesses arquivos e revisar os testes. Dados recorrentes devem permanecer em `profile.js`; textos exclusivamente visuais podem continuar no componente responsável.

## 13. Integrações

| Integração | Estado |
|---|---|
| GitHub e GitHub Actions | remote `origin` e workflow `ci.yml` configurados; branch de trabalho ainda não enviada nesta etapa |
| Vercel | configuração prevista, mas projeto, domínio e produção **PENDENTES DE VALIDAÇÃO** |
| Currículo Lattes | link externo implementado |
| WhatsApp, telefonia e e-mail | links acionados pelo visitante |
| Web Share e Clipboard API | implementadas no navegador, com fallback |
| QR Code | gerado no servidor pela dependência `qrcode`, sem API externa |
| Vercel Analytics, Google Analytics, Clarity, YouTube, CMS e formulário | ausentes |

## 14. Privacidade e segurança

O site publica dados profissionais de contato e fatos curriculares estritamente necessários. Não há formulário, autenticação, banco, cookies próprios, analytics nem persistência em `localStorage` ou `sessionStorage`. O navegador só acessa serviços externos quando o visitante escolhe Lattes, WhatsApp, telefone, e-mail ou compartilhamento.

Os documentos acadêmicos foram usados apenas como fontes de verificação. PDFs, XML, certificados e históricos não foram copiados para o projeto. CPF, RG, data de nascimento, endereço residencial, códigos de validação, QR Code acadêmico, números de registro, notas, professores e outros identificadores desnecessários não foram incorporados ao site nem a esta documentação.

`NEXT_PUBLIC_SITE_URL` é pública e não pode conter segredo. Segredos futuros devem ficar exclusivamente no servidor e na plataforma. A CSP restringe origens, objetos, frames e formulários; cabeçalhos defensivos são globais. Logs da plataforma ainda não foram auditados em produção.

Pendências institucionais: validação do texto sobre soluções digitais, do aviso de independência institucional e da autorização/forma de uso da marca APECOF.

## 15. SEO e compartilhamento

`app/layout.js` define metadata global, `metadataBase`, Open Graph e Twitter Card. `/cartao` tem metadata própria. Canonical e URL OG só são emitidos quando existe URL pública válida. Imagens 1200×630 são geradas em `app/opengraph-image.jsx` e `app/cartao/opengraph-image.jsx`. `manifest.js`, `sitemap.js` e `robots.js` completam a descoberta.

`NEXT_PUBLIC_SITE_URL` tem prioridade; URLs da Vercel são fallback. Sem domínio confirmado, não há comprovação de canonical, preview social ou indexação em produção.

## 16. Responsividade e acessibilidade

O layout é mobile-first, com breakpoints Tailwind e largura máxima de 1480 px. Hero, grids, imagem, cartão e botões se reorganizam. O menu móvel usa `aria-expanded`, `aria-controls`, foco inicial, fechamento por seleção, clique externo e Escape. Links mantêm foco visível; alvos principais têm altura mínima; há regra para `prefers-reduced-motion`.

A validação cobriu 320, 375, 390, 430, 768, 1024 e 1440 px, além de revisão do cabeçalho em 1280 e 1600 px. Limitações: não houve auditoria formal WCAG com tecnologia assistiva nem teste em matriz ampla de navegadores/dispositivos reais.

## 17. Testes e qualidade

- `npm run lint`: ESLint, sem script separado de typecheck;
- `npm run test`: 14 testes Playwright, incluindo sete viewports, menu, âncoras, imagens, posicionamento, formação, privacidade, cartão, handlers, metadata e headers;
- `npm run build`: build de produção do Next.js;
- CI: `npm ci`, auditorias, lint, Chromium, testes e build no GitHub Actions;
- cobertura: não há relatório de cobertura nem testes unitários separados;
- auditoria: `npm audit --omit=dev` e `npm audit` existem no CI, mas não são scripts do `package.json`.

Na validação deste ajuste, lint, 14/14 testes e build foram aprovados. O novo teste cobre experiência forense, formação acadêmica e ausência de dados sensíveis.

## 18. Build e deploy

Ambiente confirmado: Node `v24.14.1`, npm `11.11.0`, `.nvmrc` e `engines.node` em 24.x. Instalação reproduzível: `npm ci`. Desenvolvimento: `npm run dev`. Simulação local de produção: `npm run build` seguida de `npm start`.

Vercel é o destino previsto. Antes de publicar, devem ser confirmados projeto, conta, branch de produção, integração GitHub, `NEXT_PUBLIC_SITE_URL` HTTPS e domínio. O fluxo recomendado é preview da branch, validação, merge aprovado e produção. Pós-deploy: revisar todas as rotas, contatos, QR/vCard, metadata, OG, sitemap, robots, headers e celular real. Rollback deve ocorrer por `git revert` e novo deploy, ou promoção consciente de deployment anterior na Vercel.

## 19. Riscos e limitações

| Classificação | Risco/limitação | Tratamento |
|---|---|---|
| Crítico | Publicar com URL/domínio incorreto | confirmar domínio e variável antes da produção |
| Crítico | Associação indevida entre oferta privada e cargo público | validar aviso institucional e conteúdo final |
| Crítico | Uso não autorizado ou inadequado da marca APECOF | obter validação institucional antes da publicação |
| Importante | Oferta de soluções digitais ainda depende de validação editorial | confirmar texto e limites comerciais |
| Importante | Dados profissionais ficam públicos | confirmar consentimento e contatos divulgados |
| Importante | Textos duplicados entre dados, JSX, metadata e OG | usar matriz de impacto e pesquisa global |
| Importante | README e manual de publicação anterior podem conter contexto antigo | harmonizar em etapa futura autorizada; não foram alterados neste commit |
| Melhoria futura | Sem CMS ou catálogo | manter Git como fonte até novo escopo |
| Melhoria futura | Sem auditoria WCAG formal e cobertura unitária | planejar conforme risco e evolução |

## 20. Roadmap

### Curto prazo

- validar as três pendências institucionais;
- confirmar domínio, Vercel, branch de produção e variável pública;
- validar preview e produção em celular real.

### Médio prazo

- harmonizar README e manual específico de publicação;
- avaliar auditoria de acessibilidade e monitoramento sem rastreamento desnecessário;
- reduzir duplicações editoriais quando houver nova alteração de posicionamento.

### Longo prazo

- avaliar páginas, catálogo, agenda, projetos, blog ou CMS somente mediante novo PRD;
- avaliar formulário e analytics somente com requisitos de privacidade, segurança e consentimento.

Roadmap não é escopo implementado.

## 21. Critérios de aceitação para publicação

- [ ] conteúdo de IA, capacitações, soluções digitais e conhecimentos aprovado;
- [ ] cargo público tratado apenas como informação curricular;
- [ ] aviso institucional, oferta de soluções digitais e APECOF validados;
- [ ] domínio, projeto Vercel e branch de produção confirmados;
- [ ] `NEXT_PUBLIC_SITE_URL` configurada com HTTPS real;
- [ ] retrato, logotipo e ícones autorizados e carregando;
- [ ] contatos, Lattes, cartão, compartilhar, QR e vCard validados;
- [ ] responsividade e acessibilidade revisadas, inclusive em celular real;
- [ ] canonical, OG, Twitter Card, manifest, sitemap e robots conferidos;
- [ ] `git diff --check`, lint, 14 testes e build aprovados;
- [ ] CSP e cabeçalhos verificados no ambiente publicado;
- [ ] commit de rollback e deployment anterior identificados;
- [ ] nenhuma funcionalidade ausente apresentada como disponível.
