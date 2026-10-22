# MB-TSK-UX-002 — ajustes locais da abertura e dos acessos de Contato

**Estado da etapa local: IMPLEMENTADO_LOCALMENTE_AGUARDANDO_REVISAO.**

Na entrega local da MB-TSK-UX-002: **COMMIT: NÃO. PUSH: NÃO. MERGE: NÃO. DEPLOY: NÃO.** Posteriormente, a missão **MB-TSK-DEPLOY-003** autorizou expressamente validar, versionar e publicar este candidato pelo fluxo existente. O resultado efetivo da publicação, com SHA, deployment e conferência pública, fica em `build/mb-tsk-deploy-003/RELATORIO_FINAL.md`, fora do commit.

## Baseline e preservação

- Projeto: `C:\Users\marco\Desktop\Codex\pericia-digital-marco-site`.
- Remoto: `https://github.com/bgbarbosa/pericia-digital-marco-site.git`.
- Branch atual preservada: `codex/TSK-PROF-002-atualizacao-consolidada`, sem upstream configurado. Não se alterou a configuração de tracking.
- HEAD inicial: `cfd0154a7532770705b9a53a382a25a45afa1f45`. Árvore limpa e índice vazio na entrada. A consulta somente para leitura de `refs/heads/master` retornou o mesmo SHA; não se presumiu que a branch local fosse `master`.
- Artefatos anteriores ignorados pelo Git foram preservados. Não se executaram limpeza, reset, instalação de dependências ou comandos de publicação.
- O repositório Dama Universe não foi alterado. Seu estado inicial foi registrado somente para comparação de preservação, incluindo o `npm-audit.json` não rastreado.

## Antes e depois

**Abertura:** foi removido apenas o parágrafo de `profile.displayName` antes do H1. Retirou-se também a margem superior `mt-3` do H1, evitando espaço residual. A propriedade `profile.displayName` continua intacta em `data/profile.js`; logomarca, H1 único, subtítulo, público, retrato, três ações e formação em destaque foram preservados.

Textos que permanecem literais:

- **H1:** Inteligência Artificial, perícia digital e desenvolvimento de software
- **Subtítulo:** Consultoria tecnológica, análise de dados, automação e capacitação em IA, com foco em necessidades concretas e escopo definido para cada projeto.
- **Público:** Para pessoas, empresas e profissionais do Direito.

**Contato:** a antiga linha de dois links sublinhados foi substituída por uma segunda grade de três cards compactos. Os três painéis informativos originais permanecem intactos e não foram transformados em links integrais.

| Primeira fileira preservada | Segunda fileira de navegação |
| --- | --- |
| Base profissional | LinkedIn profissional ↗ |
| WhatsApp e telefone | Dama Universe ↗ |
| E-mail | Perfil e currículo → |

As duas grades compartilham o mesmo contêiner, token `--grid-space` e breakpoint de três colunas em 1024 px. A largura e a posição de cada coluna da segunda fileira foram comparadas às da primeira em 1024 e 1440 px, com diferença inferior a 1 px.

## Arquitetura, componentes e arquivos

| Arquivo | Mudança localizada |
| --- | --- |
| `components/HeroSection.jsx` | Remove o rótulo redundante e sua margem, preservando os textos e ações aprovados |
| `components/ContactSection.jsx` | Usa `contact-link-grid` e três links semânticos com superfície inteira clicável |
| `components/Footer.jsx` | Acrescenta `showProfileLink`, padrão `true`, para controlar somente o link textual de perfil |
| `app/page.js` | Passa `showProfileLink={false}` exclusivamente ao rodapé da Home |
| `app/globals.css` | Define a grade e o acabamento compacto dos cards; compartilha colunas/gaps com os painéis existentes |
| `tests/e2e/hero-presentation.spec.js` | Substitui a expectativa do rótulo antigo pela ausência do nome e presença do H1 como primeiro elemento |
| `tests/e2e/contact-access-cards.spec.js` | Acrescenta 17 testes para cards, alinhamento, teclado, zoom, destinos e preservação dos rodapés |
| `docs/MB-TSK-UX-002.md` | Este relatório técnico |

O rodapé compartilhado mantém seu comportamento nas demais páginas. Na Home, desaparece somente o link textual diretamente abaixo da marca; o clique na logomarca continua direcionando a `/perfil`. Copyright, nota pessoal/não institucional e acesso ao cartão permanecem. Não há regra CSS global de ocultação.

## Destinos e comportamento

| Card | Destino | Tratamento |
| --- | --- | --- |
| LinkedIn profissional | `https://www.linkedin.com/in/marco-aur%C3%A9lio-barbosa-79850926a/` | `profile.linkedin`, nova aba, `noopener noreferrer` |
| Dama Universe | `https://damauniverse.com.br` | `profile.damaUniverse`, equivalente à URL com barra final, nova aba, `noopener noreferrer` |
| Perfil e currículo | `/perfil` | `next/link`, mesma aba |

Cada card é um único link, sem botões ou links aninhados. As setas usam `aria-hidden="true"`. Os testes conferiram quatro regiões próximas às bordas, ativação real por clique na borda e Enter, sequência de Tab e foco visível. Não existem handlers de rastreamento ou overlays de clique.

LinkedIn e Dama Universe tiveram navegação externa controlada nos testes, sem chamadas reais exigidas para certificar disponibilidade desses serviços. `/perfil` foi aberto efetivamente na prévia local. `/contato`, `/cartao`, `/perfil`, `/aplicacoes` e `/pericia-na-pratica` responderam 200 e conservaram o link textual de perfil e a marca em seus rodapés. Nenhum formulário foi enviado e não se efetuaram chamadas ou mensagens.

## Responsividade e acessibilidade verificadas

- **1024 px ou mais:** três cards em linha, alinhados aos três painéis, com a mesma largura total e gaps.
- **Abaixo de 1024 px:** painéis e cards em uma coluna, preservando os limites do contêiner. Não se força uma fileira comprimida no tablet.
- Larguras inspecionadas: **320, 360, 375, 390, 430, 768, 1024 e 1440 px**.
- Altura mínima de 64 px, sem altura fixa que impeça quebra de texto; texto claro, superfície escura, borda discreta e raio de 1,4 rem coerente com os painéis.
- Nenhum transbordamento, truncamento ou erro de console na Home do build local nessas oito larguras.
- Tab/Enter e foco visível verificados em 390 e 1440 px. Texto ampliado a 200% sem overflow. A preferência por movimento reduzido continua respeitada; não foram introduzidas animações contínuas.
- Inspeção em Chromium com viewports emulados e DPR 1; não se declara ensaio em aparelhos físicos ou auditoria integral de conformidade WCAG.

## Testes e resultados reais

| Comando | Resultado |
| --- | --- |
| `npm run lint` | Aprovado, código 0 |
| `npm run build` | Aprovado, código 0; 28 páginas geradas |
| `npm test -- --workers=2` | Código 0; **32 unitários e 164 E2E aprovados**, um E2E ignorado |
| `git diff --check` | Aprovado; avisos LF/CRLF da configuração Git não são erros de whitespace |
| `python -B ux002-evidence.py antes http://127.0.0.1:3140/` | Referência capturada em oito larguras antes do build do candidato |
| `python -B ux002-evidence.py depois http://127.0.0.1:3141/` | Oito larguras aprovadas, com preservação do HTML protegido e alinhamento das colunas |

Os scripts operacionais Python ficam no diretório de execução `C:\Users\marco\Documents\Codex\2026-09-19\files-mentioned-by-the-user-dama`, fora do repositório. Não foram adicionadas ferramentas ou dependências.

As capturas e a comparação automática confirmaram HTML idêntico para cabeçalho, ações da hero, retrato, formação em destaque, capacitações, formação/experiência, painéis informativos de Contato, imagem da marca no rodapé, copyright e aviso não institucional. O novo posicionamento vertical decorre somente da remoção do rótulo e da nova fileira solicitada.

## Capturas e evidências locais

Diretório ignorado pelo Git: `build/mb-tsk-ux-002/`.

- `baseline.json`: branch, HEAD, remoto, upstream, índice, working tree e hashes iniciais dos arquivos rastreados.
- `antes/hero-<largura>.png`, `antes/contato-<largura>.png` e `antes/rodape-<largura>.png`: referência anterior.
- `depois/hero-<largura>.png`: abertura sem o rótulo repetido.
- `depois/contato-enquadrado-<largura>.png` e `depois/rodape-enquadrado-<largura>.png`: recortes fiéis de capturas integrais, evitando a sobreposição do cabeçalho fixo própria de capturas isoladas de seção. Não se alterou CSS nem se ocultaram elementos para produzir os recortes.
- `depois/pagina-completa-<largura>.png`: origem integral desses recortes.
- `antes/renderizacao.json` e `depois/renderizacao.json`: resultados de HTTP, H1, overflow, console e hashes das áreas preservadas.
- `lint.log`, `build.log`, `tests.log` e `estado-final.json`: saídas e conferência final de escopo/preservação.

## Ressalvas

- Um teste condicional de formulário permanece ignorado por ausência de `CONTACT_TEST_SITE_KEY`; não se solicitou chave nem se efetuou envio real.
- A suíte voltou a registrar o aviso de hidratação de um expansível de Aplicações. Esse comportamento já foi reproduzido antes desta missão, no código anterior e no candidato da MB-TSK-HERO-001, sob interação antes da hidratação. Os arquivos de Aplicações não foram alterados nesta missão; os testes funcionais passaram. Evidência histórica local: `build/mb-tsk-hero-001/hydration-audit.json`. Não se declara correção desse aviso.
- A disponibilidade externa de LinkedIn/Dama e o fluxo completo de envio do formulário não foram certificados; não eram necessários para implementar ou testar a navegação solicitada.
- Não houve teste reprovado nem pendência impeditiva encontrada para estas duas correções locais.

## Revisão no Windows e estado de entrega

A prévia do candidato está em **http://127.0.0.1:3141/**. Conferir a abertura e rolar até Contato; usar Tab/Enter nos novos cards. O endereço da porta 3140 foi usado apenas como referência anterior e não deve ser usado para revisar o candidato.

Se precisar iniciar outra instância em uma porta livre:

```powershell
Set-Location "C:\Users\marco\Desktop\Codex\pericia-digital-marco-site"
npm run build
npm run start -- --hostname 127.0.0.1 --port 3142
```

Abrir `http://127.0.0.1:3142/`. Não iniciar outra instância na porta 3141 enquanto estiver ocupada. Os comandos de verificação são `npm run lint`, `npm test -- --workers=2` e `git diff --check`.

Na entrega local, o HEAD foi preservado em `cfd0154a7532770705b9a53a382a25a45afa1f45`, na mesma branch, com índice vazio, seis arquivos rastreados modificados e dois novos arquivos para revisão. A autorização posterior MB-TSK-DEPLOY-003 permite publicar exclusivamente esses ajustes após nova auditoria técnica, sem reformular outras páginas ou alterar configurações externas.

O relatório operacional da MB-TSK-DEPLOY-003 deve distinguir commit, push, READY e conteúdo efetivamente conferido no domínio oficial. Nenhuma autorização desse fluxo se estende a futuras alterações do site.

## Nova auditoria para MB-TSK-DEPLOY-003

Antes da publicação, repetiram-se lint, build e a suíte completa. A primeira execução da suíte encontrou uma falha na leitura do foco em 390 px; a captura correspondente mostrava a página sem o CSS aplicado. A publicação foi suspensa antes do staging. O teste passou a aguardar a altura mínima definida no CSS e a estabelecer a navegação com Tab, mantendo a exigência de contorno sólido de 3 px e verificando `:focus-visible`. Não se alterou a interface para contornar essa falha.

Os dois cenários de teclado foram repetidos três vezes: **6 aprovados**. A nova suíte completa terminou com **32 unitários e 164 E2E aprovados, um E2E ignorado, código 0**. O lint repetido e `git diff --check` também passaram; o build de produção gerou 28 páginas. A conferência adicional do build local cobriu oito larguras e navegação por borda, Enter e toque. A tentativa inicial, sua captura e os resultados finais ficam preservados em `build/mb-tsk-deploy-003/`, fora do commit. A atualização de produção depende ainda da confirmação do novo SHA e do conteúdo público, registrada no relatório operacional.
