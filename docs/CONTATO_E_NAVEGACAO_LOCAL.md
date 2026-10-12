# Contato e navegação

Este documento descreve o formulário de contato e a navegação atualizada. As seções históricas do manual, do README e de `PERICIA_NA_PRATICA.md` devem ser lidas à luz deste fluxo.

## Rotas e conteúdo

- `/contato` reúne nome, e-mail, assunto, tipo de contato e mensagem. O assunto e o tipo podem vir da URL (`assunto` e `tipo`), especialmente dos quatro artigos. Os demais campos não são preenchidos por parâmetros.
- Formação e experiência estão nos dois elementos `<details>` da home, com IDs `formacao-card` e `experiencia-card`. `/formacao` e `/experiencia` redirecionam permanentemente para essas âncoras. O curso de detecção permanece em `/formacao/deteccao-imagens-ia`.
- `/aplicacoes` apresenta dois cartões: `/aplicacoes/da-necessidade-a-ferramenta` e `/aplicacoes/dama-universe`. A home não replica o conteúdo dessas páginas.
- A seção `/#capacitacoes` continua na home, mas não ocupa item do menu principal. Seus quatro painéis `<details>` mostram apenas título e indicador quando fechados; o texto aparece ao abrir por mouse ou teclado. O botão de informações aponta para `/contato` com o tipo Capacitações.
- `/formacao/deteccao-imagens-ia` preserva 20 horas, conclusão em agosto de 2026, ressalvas e fonte NIST. Dois SVGs autorais em `public/formacao/` ilustram conceitos e fluxo; suas legendas informam que não são material de caso. As duas situações hipotéticas são um bloco editorial separado. `verifiedTrainingTopics` e `imageDemonstrations` continuam vazios até verificação ou aprovação própria.
- Links de contato por e-mail na home, no cartão e nos artigos apontam para o formulário. O endereço profissional permanece legível e o botão de copiar dos artigos permanece disponível. WhatsApp, telefone, vCard e compartilhamento conservam suas finalidades próprias.

## Configuração privada necessária

Crie **um formulário próprio** no Formspree, separado do Dama Universe, com destinatário verificado `marcobarbosa@damauniverse.com.br`. Configure a regra de notificação correspondente no painel do serviço e confirme a entrega com um envio controlado antes de publicar. No Cloudflare Turnstile, registre os domínios autorizados do site e gere site key e secret próprios. Na Vercel, configure:

| Variável | Uso |
|---|---|
| `CONTACT_FORM_ENDPOINT` | URL HTTPS `https://formspree.io/f/ID` do formulário próprio; somente no servidor |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Chave pública do widget; visível ao navegador |
| `TURNSTILE_SECRET_KEY` | Chave privada da verificação Siteverify; somente no servidor |

Não coloque valores reais em `.env.example`, em testes ou no repositório. O endpoint `/api/contact` valida dados e origem, verifica o token no serviço Cloudflare e só depois envia os cinco campos ao Formspree. Não usa contador em memória. O provedor aplica seus limites de envios; `429` é repassado como limite temporário. A interface só informa sucesso quando o provedor aceita a requisição HTTP. Essa aceitação **não comprova** a entrega à caixa postal; a confirmação exige acesso ao painel e à caixa de destino. Sem configuração, o envio permanece indisponível e a página oferece WhatsApp.

## Validação local no Windows

Na raiz do repositório, com Node.js 24.x e dependências instaladas:

```powershell
git diff --check
npm audit --omit=dev
node scripts/audit-dev-allowlist.mjs
npm run lint
npm test
npm run build
$env:CONTACT_TEST_SITE_KEY='1'; npm run test:e2e -- tests/e2e/new-flows.spec.js; Remove-Item Env:CONTACT_TEST_SITE_KEY
npm run dev -- --hostname 127.0.0.1 --port 3100
```

O teste `CONTACT_TEST_SITE_KEY` injeta uma **chave pública de teste** e simula o widget e a resposta do endpoint no navegador. Ele não encaminha mensagem real. No navegador, confira `/`, `/contato`, `/aplicacoes`, os dois detalhes e um artigo em 390 px e desktop; amplie o texto a 200%. Os testes cobrem também 320 px, teclado, redirecionamentos, parâmetros contextuais e estados de erro/sucesso simulados. Para entrega real, configure as três variáveis em ambiente seguro, faça um envio controlado, confirme o painel do Formspree e o recebimento no endereço de destino. Pare o servidor com `Ctrl+C`.
