# MB-TSK-HERO-001 — implementação local da abertura

Implementação e testes da nova abertura profissional. A retomada **MB-TSK-HERO-001 — finalização e publicação em produção** autorizou expressamente commit, push e atualização pelo fluxo GitHub → Vercel, substituindo a restrição da etapa local. O resultado operacional, com SHA, deployment e conferência pública, fica em `build/mb-tsk-hero-001/publicacao/RELATORIO_FINAL.md`, fora do commit.

## Baseline e preservação

- Diretório: `C:\Users\marco\Desktop\Codex\pericia-digital-marco-site`.
- Remoto: `https://github.com/bgbarbosa/pericia-digital-marco-site.git`.
- Branch preservada: `codex/TSK-PROF-002-atualizacao-consolidada`.
- HEAD inicial: `fd629d75147f33bd9a3da93e44298a16851bc4ac`; árvore limpa, índice vazio e nenhum arquivo não rastreado visível ao Git na entrada. Os artefatos locais ignorados em `build/` foram preservados.
- `origin/master` foi consultada somente para leitura e correspondia ao mesmo SHA. Não houve troca de branch, merge ou escrita no remoto.
- As correções anteriores de nitidez da marca e do card Dama Universe foram preservadas. `BrandLogo.jsx`, seu CSS e `Header.jsx` não foram editados.
- O repositório Dama Universe foi consultado somente para registrar seu estado: branch `main`, HEAD `835889bd25e189b6aeb3cf7af876d7f3c7c1512c`, índice vazio e `npm-audit.json` não rastreado. Nenhum arquivo desse projeto foi alterado.

## Texto aplicado literalmente

**H1 único:** Inteligência Artificial, perícia digital e desenvolvimento de software

**Subtítulo:** Consultoria tecnológica, análise de dados, automação e capacitação em IA, com foco em necessidades concretas e escopo definido para cada projeto.

**Público:** Para pessoas, empresas e profissionais do Direito.

`Marco Barbosa` permanece na identificação superior. `profile.title`, dados do cartão virtual, currículo, formação, contatos e metadados foram preservados. Não se considerou necessário ajustar o SEO global para esta intervenção localizada; não houve mudança em canônicas ou rotas.

## Três cards de navegação

| Ordem | Rótulo | Destino | Comportamento |
| --- | --- | --- | --- |
| 1 | Entrar em contato | `/contato` | Mesma aba; `Link` semântico |
| 2 | Currículo Lattes ↗ | `https://lattes.cnpq.br/1970561249212557` | Nova aba, `noopener noreferrer` |
| 3 | Abrir cartão virtual → | `/cartao` | Mesma aba; `Link` semântico |

Cada superfície é um único link, sem controles aninhados. As setas decorativas não repetem o nome acessível. Um foco por ação, Tab em sequência, ativação por Enter e clique na borda foram comprovados. Pontos próximos às quatro bordas pertencem ao próprio link; o espaço entre os cards não navega. Os destinos internos responderam 200 e abriram suas páginas, sem envio de formulário. No teste do Lattes, a navegação externa foi interceptada para conferir URL, abertura e segurança sem depender do servidor do CNPq; a disponibilidade pública do currículo não foi certificada nesta missão.

O CTA `Conhecer capacitações` foi removido exclusivamente da abertura. A seção `#capacitacoes`, seus quatro expansíveis e seu CTA de contato continuam intactos. Formação em destaque permanece como acesso independente ao conteúdo existente, fora do conjunto de três ações.

## Visual e responsividade

- Cards com altura mínima de 64 px, larguras equilibradas, bordas azul-ciano, superfícies escuras e destaque moderado para contato.
- Até 767 px: três cards empilhados, ocupando a largura disponível.
- De 768 a 1023 px: composição 2+1.
- A partir de 1024 px: três cards na mesma linha, com alturas e larguras equivalentes.
- H1 com `clamp(1.9rem, 3.6vw, 3.25rem)`, entrelinha 1,12 e quebra equilibrada. No desktop a coluna do retrato usa `clamp(320px, 32vw, 420px)` e intervalo de 2 rem para acomodar o título e os cards.
- Foto, arquivo, proporção e `object-contain` preservados; apenas a largura da coluna se adapta. Nenhuma imagem foi criada ou recomprimida.
- Transições limitadas a cor de fundo/borda. O tratamento global de movimento reduzido e o foco visível existentes continuam aplicáveis.
- Os estilos novos são específicos da abertura. Os estilos compartilhados `.action-primary` e `.action-secondary` das demais seções não foram alterados; removeu-se apenas a antiga regra de flex exclusiva da hero.

## Arquivos desta implementação

| Arquivo | Alteração |
| --- | --- |
| `data/profile.js` | Textos literais da abertura e campo `heroAudience`; demais campos preservados |
| `components/HeroSection.jsx` | Linha de público e conjunto de três links-card; remoção do CTA antigo e da segunda linha de links |
| `app/globals.css` | Estilos específicos dos cards, tipografia e ajustes localizados dos breakpoints da hero |
| `tests/e2e/site.spec.js` | Atualização do H1 e do CTA esperado, mantendo verificações curriculares |
| `tests/e2e/capacity-course.spec.js` | Confirma remoção do CTA antigo sem perder a cobertura dos expansíveis |
| `tests/e2e/practice.spec.js` | Atualiza a expectativa do H1 e preserva testes de navegação da coleção |
| `tests/e2e/hero-presentation.spec.js` | 16 novos casos: textos, sete larguras, superfícies, teclado, movimento reduzido, texto ampliado, destinos e espaço entre cards |
| `docs/MB-TSK-HERO-001.md` | Este relatório técnico |

## Comandos e resultados reais

| Comando | Resultado |
| --- | --- |
| `npm run lint` | Aprovado, código 0 |
| `npm run build` | Aprovado, código 0; 28 páginas geradas |
| `npm run test -- --workers=2` | Código 0; 32 unitários e 147 E2E aprovados; 1 E2E ignorado |
| `git diff --check` | Aprovado; avisos LF/CRLF da configuração Git não são erros de whitespace |
| `python -B hero-preview.py antes http://127.0.0.1:3132/` | Sete capturas de referência do build anterior, sem erros de console |
| `python -B hero-preview.py depois http://127.0.0.1:3133/` | Sete larguras aprovadas, sem transbordamento nem erros de console na abertura |

Os scripts operacionais Python ficam fora do repositório, no diretório de execução `C:\Users\marco\Documents\Codex\2026-09-19\files-mentioned-by-the-user-dama`. Não são novas dependências do projeto.

O teste condicional do formulário foi ignorado por ausência de `CONTACT_TEST_SITE_KEY`. Não se iniciou login, não se solicitou chave e nenhuma mensagem real foi enviada. As rotas de formulário foram preservadas e os testes de rejeição/validação existentes passaram.

A suíte registrou um aviso de hidratação em `/aplicacoes`, envolvendo o atributo `open` de `<details class="application-card">`. A investigação da retomada confirmou que o comportamento é **preexistente à missão**, em controle isolado extraído do SHA `fd629d75147f33bd9a3da93e44298a16851bc4ac` e no candidato atual.

No ensaio controlado, adiaram-se os arquivos JavaScript no navegador, abriu-se o expansível nativo e liberou-se a hidratação. O atributo `open` já havia sido alterado pelo navegador quando o React conferiu o HTML, reproduzindo o mesmo aviso nas duas versões. Sem a interação antecipada, nenhuma das versões apresentou aviso. Nos quatro cenários, abrir/recolher por mouse e Enter e operar o menu móvel funcionou, sem exceção JavaScript. O HTML inicial da grade de Aplicações foi idêntico: SHA-256 `ca9db2ff15982675895b96be50f718284eeb2564279d0afc113a8bf6e4edeb6b`.

Evidências: `build/mb-tsk-hero-001/hydration-audit.json`, `baseline-control-manifest.json` e capturas `hydration-*.png`. O controle reutilizou as dependências existentes, sem instalação, cópia de segredos ou alteração dos componentes do candidato. Conclusão: aviso preexistente, reproduzido sob interação anterior à hidratação e não impeditivo nos fluxos testados. Ele permanece como ressalva, sem correção fora do escopo da hero.

## Capturas e comparação de preservação

Evidências locais ignoradas pelo Git: `build/mb-tsk-hero-001/`.

- `baseline.json`: estado inicial, remoto consultado, estado da Dama e hashes dos arquivos rastreados do profissional.
- `antes/hero-<largura>.png` e `antes/pagina-<largura>.png`: build anterior, porta 3132.
- `depois/hero-<largura>.png` e `depois/pagina-<largura>.png`: implementação local, porta 3133.
- Larguras: **320, 360, 390, 768, 1024, 1440 e 1920 px**, altura de viewport 1100 px, Chromium, DPR 1, movimento reduzido. Capturas da hero podem exceder a altura da viewport para incluir a seção completa.
- `antes/renderizacao.json` e `depois/renderizacao.json`: textos, links, geometria, console e hashes do HTML das áreas preservadas.
- Em cada largura, o HTML de `#capacitacoes`, `#sobre`, `#contato`, `.hero-featured`, `.hero-portrait`, `.site-header` e `footer` foi comparado com o baseline e permaneceu idêntico. A geometria muda com os novos textos e a largura responsiva da coluna, conforme previsto.
- `lint.log`, `build.log` e `tests.log`: saídas reais dos comandos.

A primeira tentativa de referência usou a porta 3130, deixada por execução anterior, e encontrou uma instância incompatível com o build disponível. Ela não foi usada como evidência; iniciou-se uma instância nova do build anterior na porta 3132, sem encerrar o processo preexistente. A referência válida foi capturada antes do build desta missão.

## Revisão no Windows

A prévia desta implementação está em **http://127.0.0.1:3133/**. Conferir também `/contato` e `/cartao`, sem enviar mensagens. A porta 3132 é apenas a instância usada para a referência anterior e não deve ser usada para revisar o candidato.

Para iniciar uma prévia em outra porta livre, caso necessário:

```powershell
Set-Location "C:\Users\marco\Desktop\Codex\pericia-digital-marco-site"
npm run build
npm run start -- --hostname 127.0.0.1 --port 3134
```

Abrir `http://127.0.0.1:3134/`. Não iniciar outra instância na porta 3133 enquanto ela estiver ocupada. Para reproduzir verificações: `npm run lint`, `npm run test -- --workers=2` e `git diff --check`.

## Estado de entrega e limites

- O candidato local foi preparado sobre `fd629d75147f33bd9a3da93e44298a16851bc4ac`, inicialmente com índice vazio. A retomada autoriza versionar somente os oito arquivos relacionados nesta missão, após revisão do diff e das evidências.
- A publicação deve seguir a integração existente `origin/master` → projeto Vercel `marcopericia`, com push normal e conferência do novo SHA no domínio oficial. O relatório operacional final registra o resultado efetivo de cada etapa.
- Não alterar DNS, credenciais, ambiente, dependências ou integrações externas. Não implementar novas conexões com a Dama Universe.
- Teste condicional do Turnstile e aviso preexistente de hidratação em Aplicações ficam registrados como ressalvas. Não houve correção de outras páginas por suposição.
- A inspeção responsiva foi feita em navegador emulado; não se declara ensaio em aparelhos físicos ou disponibilidade externa do CNPq.
