# TSK-PROF-002 — Implementação local para revisão humana

Data: 19/09/2026. Estado: **IMPLEMENTAÇÃO VALIDADA LOCALMENTE; PUBLICAÇÃO AUTORIZADA PELO PROPRIETÁRIO**.

A correção posterior do pedido autoriza commit, envio ao GitHub e verificação no Vercel. Ela substitui a restrição inicial de entrega somente local. APECOF confirmada e resumo FaCiencia incorporado; não há questionário ou pendência de dados necessários. Resultados de publicação devem ser registrados após a execução, sem presumir sucesso antecipado.

## 1. Escopo e situação inicial

Repositório único: `C:\Users\marco\Desktop\Codex\pericia-digital-marco-site`.
Git root conferido, branch inicial `master`, HEAD `e59f55c91c47581fdf2453e75e7ec7e4c1d3fb56`; remoto fetch/push `https://github.com/bgbarbosa/pericia-digital-marco-site.git`.
Branch criada: `codex/TSK-PROF-002-atualizacao-consolidada`. Na etapa inicial local, HEAD permaneceu inalterado. Sem merge, rebase, cherry-pick, revert, sequencer ou index.lock no início.

Mudanças preexistentes autorizadas: remoção de `public/marco.jpeg` e inclusão ainda não rastreada de `public/ChatGPT Image 19 de set. de 2026, 11_51_40.png`. Ambas preservadas. Não havia outro trabalho preexistente modificado. Não foi aberto nem alterado o repositório Dama Universe.

Lido o AGENTS.md do repositório e os guias locais do Next.js sobre Server/Client Components, metadata e ImageResponse. Stack preservada: Next.js 16.2.10, React 19, Tailwind 4, JavaScript e Playwright. Nenhuma alteração em package.json, package-lock.json, configuração de produção, DNS ou serviços externos.

## 2. Resultado funcional

- Home com nome de apresentação, título breve, foto próxima das ações no celular, dois CTAs prioritários e acessos secundários a Lattes e cartão.
- Conteúdo técnico preservado nas páginas de aprofundamento; resumos na home, com vínculo funcional exclusivamente curricular e aviso institucional no rodapé.
- Formação, Aplicação, Experiência e Formação em destaque são links semânticos. Padrão adotado: páginas internas na mesma aba. Links externos com indicação visual e proteção `noopener noreferrer`.
- Capacitações diferenciam prática orientada, atividades estruturadas, exposição/discussão e acompanhamento personalizado. Público e temas são descritos sem inventar agenda, preço ou duração; contato comum para alinhamento.
- Dama Universe apresentado como projeto autoral de Marco, com link externo. LinkedIn é perfil profissional pessoal.
- Cartão prioriza foto compacta, identificação, WhatsApp, e-mail legível, salvar contato e compartilhar/copiar. Mantidos ligação, e-mail, acesso ao site, imagem social, QR e informações complementares.
- Compartilhamento/cópia tratam sucesso, indisponibilidade, cancelamento, recusa e retorno falso do fallback. Nenhuma mensagem externa foi enviada.
- Menu móvel usa diálogo modal com foco inicial, circulação de Tab/Shift+Tab, Escape, fechamento por seleção e restauração de rolagem, inclusive na mudança de largura.
- Foco visível, quebra de textos ampliados, bordas das fotos, contraste visual do aviso e redução de movimento revisados. Não equivale a certificação de acessibilidade.

## 3. Contatos antes/depois — histórico de alteração

| Campo | Antes, histórico | Atual |
|---|---|---|
| Telefone | (67) 99939-8990 | (67) 99236-8049 |
| Internacional | +5567999398990 | +5567992368049 |
| Dígitos | 5567999398990 | 5567992368049 |
| E-mail | marcobarbo@gmail.com | marcobarbosa@damauniverse.com.br |
| LinkedIn | Sem campo central | https://www.linkedin.com/in/marco-aur%C3%A9lio-barbosa-79850926a/ |
| Dama Universe | Sem campo central | https://damauniverse.com.br |

Fonte central: `data/profile.js`. Consumidores: home/contato, cartão, links `wa.me`, `tel:`, `mailto:` e VCF. O VCF também inclui os links profissionais. Lattes preservado: https://lattes.cnpq.br/1970561249212557.

## 4. Páginas e navegação

| Rota | Conteúdo | Estado |
|---|---|---|
| `/` | Apresentação, capacitações, aplicações, formação/experiência e contato | Implementado e testado |
| `/cartao` | Contatos e funções do cartão | Implementado e testado |
| `/formacao` | Graduação, pós-graduações, especialização, cursos e vínculo associativo | Implementado e testado; currículo não revalidado documentalmente |
| `/aplicacoes` | IA, ChatGPT, prompts, dados, GPTs, organização documental, automação e exemplos didáticos | Implementado e testado |
| `/experiencia` | Trajetória, oito áreas técnicas preexistentes, métodos e limitações | Implementado e testado; informações curriculares preservadas |
| `/formacao/deteccao-imagens-ia` | Contexto do campo, 20 horas, agosto/2026 e limites | Implementado e testado; complementos ocultos |

Cada página tem H1, conteúdo útil, retorno/contato e metadata. As seis rotas constam no sitemap. O build local sem override utiliza canonical no domínio atual `https://pericia-digital-marco-site.vercel.app`. Testes usam override local deliberado; isso não altera configuração externa. Âncoras anteriores `#inicio`, `#capacitacoes`, `#aplicacoes-ia`, `#solucoes-digitais`, `#conhecimentos`, `#sobre` e `#contato` permanecem existentes.

## 5. Retrato e rastreabilidade

Original preservado byte a byte. Derivado `public/marco-barbosa.jpg`: 900 × 1125, 82.127 bytes, contra 2.079.785 bytes do PNG fornecido. Conversão com sharp: auto-orientação, largura máxima 900 sem ampliar, JPEG qualidade 86/mozjpeg. Nenhuma geração de retrato ou alteração de rosto, roupa ou expressão.

SHA256 do original: `f86022123933ab55400fdd10643b8f7016ecaff05213f74f5f3e2d307addc2fc`.
SHA256 do derivado: `c00ad08b2aeae8949f223da4c50605e25f94135137d5e6336df4a607b6722cfb`.

Consumidores confirmados: `HeroSection`, `VirtualCard`, `app/opengraph-image.jsx` e `app/cartao/opengraph-image.jsx`. As duas rotas sociais leem `profile.image`, geram PNG 1200 × 630 e foram inspecionadas visualmente. Recorte responsivo mantém proporções; o cartão desktop limita a altura da moldura a 450px. Manifesto: `TSK-PROF-002_RETRATO.json`.

## 6. Estruturas preparadas e conteúdo ainda oculto

`data/public-content.js` contém arrays vazios de registros aprovados; `ApprovedContent.jsx` renderiza eventos e demonstrações somente com campos suficientes. Filtros em `lib/public-content.js`. Dados não aprovados não são passados a componentes de cliente. Não há rota de rascunho ou página vazia de eventos/demonstrações. Exemplos usados em testes ficam apenas em testes.

Trajetória e Atuação: estrutura pronta, seção e menu ausentes até haver registros aprovados. Demonstrações: imagem, origem/uso, técnica, observação, indicação e limitação preparados, subseção ausente. Conteúdos do curso: array preparado; siglas, instrutor e período adicional aguardam certificado. A página textual funciona sem esses itens.

Campos opcionais e confirmações estão em `TSK-PROF-002_PENDENCIAS.md` e vinculados ao manual existente. Certificado integral, QR acadêmico e códigos não foram publicados.

## 7. Matriz requisito → implementação → verificação → estado

| Requisito | Implementação | Verificação realizada | Estado |
|---|---|---|---|
| Auditoria/base/branch | Git root, HEAD, remoto e operações conferidos | Status inicial/final e HEAD | Implementado e testado |
| Foto preexistente | Original preservado e JPEG derivado | SHA256, tamanho e inspeção visual | Implementado e testado |
| Todos os retratos | profile.image + duas rotas OG | E2E, PNG 1200×630 e revisão visual | Implementado e testado |
| Contatos centralizados | data/profile.js, links e VCF | Valores exatos nos testes | Implementado e testado |
| QR | Rota existente preservada | SVG e destino local/público conferidos | Implementado e testado |
| Hero e CTAs | Nome, proposta curta, foto e ações | Capturas 320/390/768/1440 | Implementado e testado |
| Home resumida | Aprofundamento realocado | Oito áreas técnicas/credenciais mantidas nos testes | Implementado e testado |
| Cards navegáveis | Links para quatro destinos | Mouse, Enter, mesma aba, retorno e foco | Implementado e testado |
| Formação | Página completa com dados publicados | Conteúdo e carregamento | Implementado com verificação curricular limitada |
| Aplicação | Explicações e exemplos didáticos identificados | Rotas, texto e responsividade | Implementado e testado |
| Experiência | Conteúdo publicado, campos técnicos e método | E2E e leitura editorial | Implementado com verificação curricular limitada |
| Formação em destaque | Página própria, 20h, agosto/2026 | E2E e inspeção visual | Implementado e testado |
| Detalhes do certificado | Pendências fora dos dados públicos | Ausência no HTML/estrutura vazia | Estrutura preparada aguardando conteúdo |
| Demonstrações | Componente com contexto e limites | Filtros, ausência da seção e rota de rascunho | Estrutura preparada aguardando conteúdo |
| Capacitações | Quatro modalidades diferenciadas | Conteúdo e CTA funcional | Implementado e testado |
| Trajetória e Atuação | Dados/componentes condicionais | Filtros e ausência de seção/menu vazios | Estrutura preparada aguardando conteúdo |
| APECOF e vínculo | Informação preexistente preservada | Associação confirmada pelo proprietário; logo público idêntico ao local | Preservado conforme solicitado |
| Dama/LinkedIn | Campos centrais e links externos | Destinos conferidos sem mensagens | Implementado e testado |
| Cartão e funções | Ordem móvel e ações preservadas | VCF, QR, cópia/share e falhas simuladas | Implementado e testado |
| Conteúdo educativo/fontes | Fontes primárias indicadas | Páginas/resumos efetivamente lidos | Implementado com verificação limitada ao escopo citado |
| Menu/acabamento | Modal, teclado, overflow e reflow | Tab/Shift+Tab, Escape, resize, texto 200%, reduced motion | Implementado e testado em Chromium |
| Metadata/sitemap | Seis rotas publicáveis | Testes + build servido localmente | Implementado e testado |
| Docs/evidências | Relatório, pendências, manual e galeria | Arquivos existentes e capturas | Implementado e testado |
| Imagem independente de cartão | Opção registrada | Nenhum novo exportador criado | Não realizado, conforme pedido |
| Commit/push/publicação | Autorizados na continuação do pedido | Conferir GitHub e Vercel após envio | Autorização recebida; sem merge ou tag planejados |

Nenhum bloqueio técnico remanescente identificado nos fluxos testados.

## 8. Comandos e resultados reais

Auditoria: `git -c safe.directory=C:/Users/marco/Desktop/Codex/pericia-digital-marco-site rev-parse --show-toplevel`, `status --short --branch`, `log -1`, `remote -v`; verificação explícita dos marcadores Git. Branch: `git ... switch -c codex/TSK-PROF-002-atualizacao-consolidada`.

Leituras: `Get-Content`, `Get-ChildItem` e `rg --files`/`rg --no-ignore -n` nos diretórios autorizados. Conversão: `node` com sharp já disponível no projeto. Implementação e documentação aplicadas por scripts Python locais, com escopo limitado a este repositório. `npx --yes prettier --write` foi limitado aos arquivos novos/editados, sem acrescentar dependência ao projeto.

| Comando final | Resultado |
|---|---|
| `npm run lint` | Exit 0, nenhum erro ou aviso |
| `npm run test` | Exit 0, **52 passed (53.8s)**; 14 testes originais preservados/adaptados e 38 novos |
| `npm run build` | Exit 0; compilação 2,7s; 18/18 saídas estáticas geradas |
| `git diff --check` | Exit 0; sem erro de whitespace; Git informou conversão LF→CRLF futura conforme configuração existente |
| `npm start -- --hostname 127.0.0.1 --port 3101` | Build local iniciado; seis páginas HTTP 200, canonical público, VCF/QR corretos |
| `node work/check-production.cjs` no workspace desta tarefa | Verificação complementar aprovada; zero pageerrors e ambas as imagens sociais 1200×630 |
| `npx --yes agent-browser --session tsk-prof-002 open ...` e `snapshot -i` | Home e cartão carregados; elementos e contatos reconhecidos |

Capturas de todas as páginas em 320, 390, 768 e 1440px; a suíte preexistente também cobre home em 375, 430 e 1024px. Testes de console, links, ausência de overflow, imagens carregadas, campos ocultos, rotas inexistentes, teclado, texto ampliado e redução de movimento. Compartilhamento nativo simulado; nenhum envio real.

Falhas intermediárias registradas e resolvidas: trecho residual de sintaxe no menu e uso de links nativos apontados pelo lint; CSS de cache antigo sem novas regras (cache `.next` preservado em backup sob `work/next-cache-before-validation`, seguido de recompilação); 43/51 e depois 49/51 testes em rodadas intermediárias; ajuste de canonical da raiz sem barra pelo Next.js; foco testado com teclado após interação de mouse; quebra de palavras no zoom; recorte desktop da foto. Uma repetição foi bloqueada por EPERM em `.test-results/.last-run.json`, e o fluxo completo foi reexecutado com permissão. O script auxiliar de produção teve correção de `Response.status` antes da aprovação final. A montagem dos painéis gerou aviso de cache Fontconfig; as capturas originais do navegador foram produzidas e preservadas.

## 9. Fontes consultadas e limites

- Solicitação TSK-PROF-002 anexada: autoridade para implementação, contatos, foto e dados públicos confirmados do curso.
- Repositório em HEAD e arquivos locais: fonte do conteúdo curricular preservado, não prova documental de títulos ou situação atual.
- Relatório `ANALISE_SITE_PROFISSIONAL_2026-09-19.md` e trechos da fonte `DU_EDITORIAL_001_FONTE_MESTRA_v1_0.md` no projeto ChatGPT indicado: apoio editorial, somente leitura; prompts arquivados não foram executados. Nenhuma afirmação de leitura integral da fonte editorial extensa.
- [OpenAI — GPTs in ChatGPT](https://help.openai.com/en/articles/8554407-gpts-faq): consultada a definição de configurações por instruções/conhecimento/recursos. A página também registra mudanças de disponibilidade; o texto público não promete continuidade ou disponibilidade universal.
- [NIST AI 100-4](https://www.nist.gov/publications/reducing-risks-posed-synthetic-content-overview-technical-approaches-digital-content): página/resumo consultado para procedência, marcação e detecção. PDF integral não lido nesta tarefa.
- [NISTIR 8354](https://www.nist.gov/publications/digital-investigation-techniques-nist-scientific-foundation-review): página/resumo consultado para limites de descoberta/recuperação e significado de artefatos. PDF integral não lido nesta tarefa.

Na primeira etapa, a ferramenta web não acessou o site. Na continuação, consulta HTTPS direta retornou 200, confirmou APECOF e Análise de Dados no site atual e verificou que `/apecof.jpeg` é idêntico ao arquivo local (SHA256 `69ff38a5564363785cdc5f3c4ff5ca2091af09c2b6052252dd1f21a4d9f3c44b`). O GitHub informou Vercel com sucesso para o commit base `e59f55c`.

## 10. Riscos, limitações e prontidão

Publicação expressamente autorizada pelo proprietário em 19/09/2026. Nenhuma reconfirmação de informações já publicadas é necessária. O núcleo definido está implementado/testado; os complementos não impedem navegação e ficam ocultos.

Sem auditoria completa WCAG, Lighthouse/Core Web Vitals ou testes em aparelhos físicos, Safari/Firefox e leitores de tela. Responsividade foi conferida em Chromium com larguras simuladas e texto em 200%. Compartilhamento real depende do navegador/permissões; os cenários foram simulados localmente. QR foi verificado por destino/SVG, sem leitura por câmera física. Não foi importado VCF na agenda pessoal.

APECOF confirmada pelo proprietário; pós-graduação em Análise de Dados atualizada para Faculdade FaCiencia, 360 horas, 2023 a 2024, concluída. As demais informações curriculares publicadas foram preservadas. Nenhum certificado estava entre os arquivos do repositório consultados; não houve busca indiscriminada em outras pastas. Informações adicionais relatadas no planejamento permanecem nas pendências. O conteúdo educativo não representa laudo nem promessa de resultado. Dados de eventos e demonstrações só devem ser inseridos depois de aprovação e revisão de privacidade.

## 11. Conferência no Windows

```powershell
Set-Location 'C:\Users\marco\Desktop\Codex\pericia-digital-marco-site'
git -c safe.directory=C:/Users/marco/Desktop/Codex/pericia-digital-marco-site status --short --branch
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Abrir `http://127.0.0.1:3000/` e as cinco rotas listadas na seção 4. Conferir foto, CTAs, quatro cards, contatos, download VCF, QR e menu com Tab/Shift+Tab/Escape. No DevTools, repetir 320/390/768/1440px. Encerrar com Ctrl+C.

Para repetir o fluxo validado: `npm run lint`, `npm run test`, `npm run build`. Para servir o build: `npm start -- --hostname 127.0.0.1 --port 3101`, abrir `http://127.0.0.1:3101/`. A configuração Playwright define sua URL local na porta 3100. Sem override, QR/VCF/canonical utilizam o domínio público atual; o QR local não deve ser usado para inferir publicação.

Não há questionário. `TSK-PROF-002_PENDENCIAS.md` registra confirmações e possibilidades futuras não bloqueantes.

## 12. Evidências e estado final

No workspace desta tarefa: `outputs/VALIDACAO_FINAL.log`, `outputs/evidencias/index.html`, 24 capturas completas, quatro capturas de viewport do build local, duas imagens sociais e `outputs/evidencias/producao-local.json`. Os painéis são conveniência de navegação; para examinar texto use as capturas originais. Cópias do relatório/pendências e inventário Git acompanham os outputs.

O `git diff --stat` considera somente arquivos rastreados, incluindo a remoção preexistente da foto. Arquivos novos aparecem no inventário separado; não foram adicionados ao index. `GIT_FINAL.txt` registra status, stat, arquivos novos e HEAD. Esse inventário corresponde à etapa local inicial, anterior à autorização posterior de commit, push e publicação.

### Arquivos rastreados com diferenças

- `README.md`
- `app/cartao/contato.vcf/route.js`
- `app/cartao/opengraph-image.jsx`
- `app/globals.css`
- `app/layout.js`
- `app/opengraph-image.jsx`
- `app/page.js`
- `app/sitemap.js`
- `components/ContactSection.jsx`
- `components/Footer.jsx`
- `components/Header.jsx`
- `components/HeroSection.jsx`
- `components/PositioningSections.jsx`
- `components/ProfessionalSections.jsx`
- `components/ShareCardActions.jsx`
- `components/VirtualCard.jsx`
- `data/profile.js`
- `docs/MANUAL_DE_MANUTENCAO_DO_SITE.md`
- `docs/PRD_PERICIA_DIGITAL_MARCO.md`
- `docs/PUBLICACAO_GITHUB_VERCEL.md`
- `lib/site-url.js`
- `public/marco.jpeg`
- `tests/e2e/site.spec.js`

### Arquivos novos

- `app/aplicacoes/page.js`
- `app/experiencia/page.js`
- `app/formacao/deteccao-imagens-ia/page.js`
- `app/formacao/page.js`
- `components/ApprovedContent.jsx`
- `components/DetailPage.jsx`
- `data/public-content.js`
- `docs/TSK-PROF-002_PENDENCIAS.md`
- `docs/TSK-PROF-002_RELATORIO.md`
- `docs/TSK-PROF-002_RETRATO.json`
- `lib/page-metadata.js`
- `lib/public-content.js`
- `public/ChatGPT Image 19 de set. de 2026, 11_51_40.png`
- `public/marco-barbosa.jpg`
- `tests/e2e/consolidated.spec.js`

### git diff --stat

```text
README.md                            |  23 ++--
 app/cartao/contato.vcf/route.js      |   2 +
 app/cartao/opengraph-image.jsx       |   8 +-
 app/globals.css                      | 196 ++++++++++++++++++++++++++++++++++-
 app/layout.js                        |   3 +-
 app/opengraph-image.jsx              |   8 +-
 app/page.js                          | 123 +++++++++++++++++-----
 app/sitemap.js                       |  10 ++
 components/ContactSection.jsx        |  48 +++++++--
 components/Footer.jsx                |   4 +-
 components/Header.jsx                | 129 ++++++++++++++---------
 components/HeroSection.jsx           | 190 ++++++++++++++-------------------
 components/PositioningSections.jsx   |  19 ++--
 components/ProfessionalSections.jsx  |   2 +-
 components/ShareCardActions.jsx      |  48 ++++-----
 components/VirtualCard.jsx           |  78 ++++++++++----
 data/profile.js                      |  33 +++---
 docs/MANUAL_DE_MANUTENCAO_DO_SITE.md |  14 ++-
 docs/PRD_PERICIA_DIGITAL_MARCO.md    |   2 +
 docs/PUBLICACAO_GITHUB_VERCEL.md     |   2 +
 lib/site-url.js                      |   9 +-
 public/marco.jpeg                    | Bin 71500 -> 0 bytes
 tests/e2e/site.spec.js               |  18 ++--
 23 files changed, 670 insertions(+), 299 deletions(-)
```

### Busca final por contatos/foto antigos

Nenhuma ocorrência ativa em app/components/data/lib ou no README/manual corrente. A suíte contém a referência negativa `99939|marcobarbo@gmail\.com` para impedir regressão. Neste relatório, os valores antigos e `marco.jpeg` são histórico legítimo de antes/depois e estado inicial; a remoção Git de `public/marco.jpeg` também é preexistente. Nenhum consumidor ativo usa a foto antiga. Varredura de placeholders e links públicos foi coberta pela suíte.


### Conferência complementar de encerramento

O primeiro servidor do build local registrou EPERM ao tentar gravar `.next/cache/images` sob o sandbox. Foi encerrado e reiniciado com a permissão de escrita adequada. A verificação complementar foi repetida incluindo console e decodificação de todas as imagens das páginas: seis respostas 200, canonical público correto, VCF/QR corretos, imagens sociais 1200×630 e zero erros de página/console. O segundo servidor não registrou erros antes de ser encerrado intencionalmente. O navegador auxiliar também foi fechado.

Uma chamada adicional de `git diff --check` foi feita por engano no workspace de outputs, que não é repositório; foi repetida no Git root autorizado com exit 0. Não houve alteração de arquivos por essa chamada.

## Correção expressa incorporada

O resumo acadêmico em `data/profile.js` usa exclusivamente os cinco dados solicitados da pós-graduação em Análise de Dados. O logotipo APECOF não foi editado, substituído ou redesenhado. O teste dirigido confere o resumo completo e a associação em `/formacao`, além do logotipo na home. A documentação de manutenção elimina pedidos dispensáveis de confirmação.

### Validação após a correção do proprietário

`npm run lint`, `npm run test` e `npm run build`: exit 0. Os 52 testes passaram; build com 18/18 saídas estáticas. O teste APECOF verifica as dimensões originais de 128, 144 e 160 pixels conforme a largura. O bloco de apresentação original foi preservado na home consolidada. O arquivo do logotipo é idêntico ao publicado e ao Git base.

O conector Vercel não tem acesso ao escopo do projeto (403); a verificação da publicação será feita pelo status Vercel associado ao commit no GitHub e pelo site público. Logs privados do Vercel não estão disponíveis por esse conector.
