# Perícia na Prática — manutenção e publicação

Esta atualização reúne AI Brasil, o novo retrato e quatro artigos. O proprietário autorizou a publicação em 11/10/2026, com commit, envio para `origin/master` e acompanhamento do deployment automático do projeto Vercel existente. A conclusão da publicação depende da confirmação do commit remoto, do CI aprovado e do conteúdo público; as evidências constam no relatório de entrega.

## Conteúdo e rotas

`data/practice-articles.json` é a única fonte de manutenção editorial. Os quatro Markdown do pacote foram lidos e comparados integralmente com `bodyMarkdown`, removendo da comparação apenas os elementos visuais presentes separadamente nos metadados. Não foram incorporadas cópias desses Markdown nem o HTML autônomo.

O nome público aprovado é **Perícia na Prática**, com **Aplicações, exemplos e situações concretas.** As cinco páginas são:

- `/pericia-na-pratica`
- `/pericia-na-pratica/mensagens-whatsapp-alem-do-print`
- `/pericia-na-pratica/contratacao-eletronica-contestada-analise-tecnica`
- `/pericia-na-pratica/horario-cameras-cftv-cronologia-fatos`
- `/pericia-na-pratica/nfe-danfe-analise-tecnica-divergencias`

O JSON preserva os quatro corpos, títulos, subtítulos, resumos, autoria, marca secundária, referências, exemplos hipotéticos, destaques, temas e quadros. `coverCaption` foi transcrito dos Markdown. Foram ajustados apenas o nome/apresentação da coleção e os caminhos de integração; `markdownPath`, `proposedPath` e `proposedBasePath` deram lugar à organização efetiva do projeto. A identificação `preparedAt` permanece um registro de preparação, não exibido como data de publicação.

`lib/practice-articles.js` deriva rotas, sumário, seções e metadados. Cada H2/H3 textual origina uma âncora. `ArticleBody.jsx` renderiza CommonMark/GFM no servidor usando `react-markdown` 10.1.0 e `remark-gfm` 4.0.1 (MIT), sem HTML arbitrário. A atualização de segurança fixa Next.js e `eslint-config-next` em 16.4.0 e o override de PostCSS em 8.5.29, com correções transitivas no lockfile. React, React DOM, Tailwind e Playwright mantêm suas versões. A exceção temporária de desenvolvimento e seus limites estão em `EXCECAO_AUDITORIA_BRACES.md`.

Um H1, resumo e capa são produzidos pelo template. O destaque e o quadro aparecem uma vez, ao fim do H2 indicado em `pullQuoteAfterHeading` e `diagramAfterHeading`. A ocorrência original da frase no corpo é preservada. Em telas menores que 768 px o quadro é apresentado por `diagramMobile`; a versão SVG fica em `display: none`. Acima desse limite acontece o inverso, inclusive para a árvore de acessibilidade. As descrições móveis foram comparadas com o texto dos quatro SVG.

Para alterar o conteúdo, edite somente o JSON. Mantenha os títulos dos pontos de inserção sincronizados com os H2 e revise os testes quando houver alteração editorial aprovada. Capas e quadros devem permanecer conceituais, nunca apresentados como evidência de caso real.

## AI Brasil e retrato

`profile.community`, em `data/profile.js`, apresenta AI Brasil exclusivamente como comunidade da qual o titular é membro. Não há URL atribuída. A APECOF mantém logotipo, identificação e redação. `CredentialsAffiliations.jsx` coloca os blocos lado a lado quando a largura disponível comporta ambos e em sequência nos demais casos.

`profile.image` aponta para `/marco-barbosa-profissional.jpg`, consumido pela home, `/cartao` e suas imagens Open Graph. `profile.imageType` declara `image/jpeg`, coerente com o derivado incorporado; o resultado das duas rotas OG continua PNG 1200×630.

O PNG recebido foi preservado byte a byte em `public/marco-barbosa-profissional-original.png`. O JPEG mantém 1536×1024, sem recorte, redimensionamento, retoque ou IA. A conversão usou Sharp, qualidade 90, amostragem 4:4:4 e mozjpeg, sem copiar metadados. A apresentação usa a proporção 3:2 e `object-fit: contain`, incluindo as imagens sociais. As fotos anteriores permanecem intactas.

Os hashes do pacote, de cada corpo, dos Markdown consultados e das onze imagens incorporadas constam em `PERICIA_NA_PRATICA_INTEGRIDADE.json`.

## Data real de publicação

A coleção e os quatro artigos registram `publicationStatus: "publicado"`, `publicationDate: "2026-10-11"` e os endereços canônicos em `publicUrl`, na origem `https://pericia-digital-marco-site.vercel.app`. A data corresponde à publicação autorizada de 11/10/2026 em America/Cuiaba, após aprovação dos gates locais. A confirmação externa dessa data e do conteúdo servido deve integrar o relatório de publicação.

`preparedAt` continua sendo apenas o registro de preparação. O gerador de metadata utiliza `publicationDate` em `article:published_time`; o sitemap não inventa `lastmod`. Referências, exemplos e corpos editoriais permanecem integrais. Qualquer `lastModified` futuro deverá refletir uma alteração efetiva documentada.

Canonical, Open Graph, Twitter e sitemap usam as rotas reais com a origem já adotada pelo projeto em `lib/site-url.js`; não comprovam publicação. As páginas não herdam o `noindex,nofollow` da prévia. Os caminhos antigos eram propostas e não recebem redirecionamentos artificiais.

## Conferência das referências

A revisão consultou as fontes primárias citadas (SWGDE, NIST, ITI, Clicksign, DFRWS, SEFAZ/RN, MOC/CONFAZ e Microsoft Learn). Não foi identificada incompatibilidade substancial nos trechos efetivamente acessíveis; os textos foram preservados, sem correção editorial silenciosa.

Reserva: o leitor web retornou erro interno para o texto consolidado do [Ajuste SINIEF 07/05](https://www.confaz.fazenda.gov.br/legislacao/ajustes/2005/AJ007_05), em duas tentativas. A redação e a remissão à **cláusula quarta, § 3º, I**, fornecidas no pacote, foram mantidas. Isso não equivale à validação independente da vigência ou de todas as remissões desse diploma. A conferência normativa permanece para revisão editorial; nenhum texto substituto foi inventado.

As datas de 21/08/2025 do [SWGDE 18-F-003 v2.0](https://www.swgde.org/documents/published-complete-listing/18-f-003-2/) e do [SWGDE 17-V-002 v1.4](https://www.swgde.org/documents/published-complete-listing/17-v-002-1-4/) correspondem à identificação de versão no rodapé das páginas, distinta das datas intermediárias do histórico de revisão. Não há motivo confirmado para modificá-las.

## Layout e contatos — revisão local posterior

As melhorias posteriores ao baseline `d69b587` são locais e aguardam auditoria e autorização específica para publicação. A autorização histórica acima não se estende a este lote.

A home e o cabeçalho compartilham largura máxima de 1280 px e margens laterais de 16–32 px. Espaçamentos e preenchimentos vêm das variáveis de `.home-page`, em `app/globals.css`. As associações ficam abaixo dos dois cards de formação, com logos inteiros e equilibrados. Os estilos de leitura dos artigos mantêm sua organização própria.

O menu central em `data/profile.js` começa por Início e Perícia na Prática. O cabeçalho usa uma container query em `rem` para acomodar também texto ampliado; o diálogo móvel mantém foco e restaura a rolagem. O card da coleção é um único link, com foco visível e uma transição de cor por opacidade de 14 segundos, desativada em `prefers-reduced-motion: reduce`.

`lib/practice-contact.js` monta as URLs de WhatsApp e e-mail a partir de `whatsappUrl` e `emailUrl`, derivados de `profile`. O título de cada artigo compõe a mensagem, o assunto e o corpo. Nome e profissão são linhas opcionais da mensagem: não há formulário, validação, captura automática, persistência ou envio pelo site. O visitante pode editar ou apagar o texto no WhatsApp e decidir se deseja enviá-lo.

`CopyEmailButton.jsx` é a pequena fronteira cliente do contato dos artigos. Tenta a Clipboard API após o clique e, se indisponível ou recusada, usa seleção temporária e `execCommand("copy")`. A seleção temporária é removida e o foco é restaurado; a confirmação com `role="status"` só anuncia sucesso real. Se ambos os métodos falharem, orienta a cópia manual do endereço visível. O `mailto:` depende do aplicativo configurado e não envia e-mail automaticamente nem exige provedor específico.

Os cenários de navegação, contato, cópia e layout estão em `tests/e2e/layout-contact.spec.js`. Artigos, imagens, datas, dependências e controles da exceção `braces` permanecem fora das alterações deste lote.

## Alteração local posterior — contato dos artigos

O fluxo de e-mail dos quatro artigos aponta para `/contato` com assunto e tipo contextualizados; o `mailto:` descrito acima é histórico. O botão de copiar endereço e os links de WhatsApp permanecem. A configuração e os limites de validação constam em [`CONTATO_E_NAVEGACAO_LOCAL.md`](CONTATO_E_NAVEGACAO_LOCAL.md).

## Validação no Windows

Na pasta do projeto, com Node.js 24.x e as dependências instaladas:

```powershell
git -c safe.directory=C:/Users/marco/Desktop/Codex/pericia-digital-marco-site diff --check
npm audit --omit=dev
node scripts/audit-dev-allowlist.mjs
npm run lint
npm run test
npm run build
npm run dev -- --hostname 127.0.0.1 --port 3100
```

Abra `http://127.0.0.1:3100`, `/cartao`, a coleção e os quatro artigos. Confira o menu, links, sumário, tabelas, quadros, foco por teclado e as rotas `/opengraph-image` e `/cartao/opengraph-image`. Os testes existentes do cartão preservam QR, VCF e compartilhamento; a suíte `practice.spec.js` cobre a atualização. A suíte também executa os testes unitários da política de auditoria. O relatório de entrega registra resultados executados, capturas e eventuais limitações. `npm audit` puro permanece com saída 1 enquanto a exceção autorizada estiver presente; o gate de produção deve retornar zero. Encerre o servidor com `Ctrl+C`.
