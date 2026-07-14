# Publicação no GitHub e na Vercel

Este manual prepara a publicação pelo Windows PowerShell. Ele não substitui a conferência dos nomes de conta, repositório, branch, projeto e domínio exibidos nos painéis.

## Estado esperado do projeto

- framework: Next.js;
- diretório raiz: raiz deste repositório;
- Node.js: 24 LTS;
- instalação: `npm ci`;
- build: `npm run build`;
- saída: detecção automática do Next.js;
- branch preparada: `fix/producao-mobile-cartao`;
- variável necessária: `NEXT_PUBLIC_SITE_URL`;
- remoto: deve ser configurado somente depois que o repositório correto existir.

Não é necessário criar `vercel.json`. A Vercel detecta o Next.js por `package.json`.

## 1. Conferência local obrigatória

```powershell
cd "C:\Users\marco\Desktop\Codex\pericia-digital-marco-site"

git status
git diff --check
git log --oneline --decorate -10
git branch --show-current
git remote -v
git ls-files

npm ci
npm ls --depth=0
npm audit --omit=dev
npm audit
npm run lint
npm run test
npm run build
```

Confirme que `git ls-files` não lista `.env`, `.env.local`, `.next`, `node_modules`, `.vercel`, caches ou relatórios de teste.

### Busca segura por arquivos potencialmente sensíveis

Os comandos abaixo mostram nomes de arquivos, não valores secretos:

```powershell
Get-ChildItem -Force -Recurse -File |
  Where-Object {
    $_.FullName -notmatch '\\(node_modules|\.next|\.git)\\' -and
    $_.Name -match '(^\.env($|\.)|\.pem$|\.key$|id_rsa|credential|secret|token)'
  } |
  Select-Object -ExpandProperty FullName

git grep -l -i -E 'password|senha|api.?key|client.?secret|private.?key|bearer' -- .
```

O segundo comando pode localizar documentação que menciona esses termos. Revise o arquivo sem publicar valores encontrados.

## 2. Branch oficial

O repositório nasceu na branch `master`; o trabalho de produção está na branch `fix/producao-mobile-cartao`. É possível publicar essa branch diretamente ou integrá-la em `master` após revisão.

Para manter `master` como principal:

```powershell
git switch master
git merge --ff-only fix/producao-mobile-cartao
```

Se futuramente optar por renomear a principal para `main`, revise primeiro as configurações do GitHub e da Vercel. O comando seria:

```powershell
git branch -M main
```

Não execute a renomeação apenas por convenção; escolha uma estratégia e use o nome real no primeiro push.

## 3. Opção 1 — Criar repositório pelo site do GitHub

1. Entre em <https://github.com>.
2. Clique em **New repository**.
3. Escolha o nome do repositório.
4. Selecione público ou privado.
5. Não crie README, `.gitignore` ou licença no GitHub, pois o projeto já possui arquivos locais.
6. Crie o repositório e copie sua URL HTTPS.
7. Abra o PowerShell na pasta do projeto.
8. Confira estado, branch e remotos.
9. Adicione o remoto usando a URL copiada.
10. Confira novamente o remoto.
11. Faça o primeiro push da branch escolhida.
12. Confirme no GitHub se os arquivos corretos foram enviados.

```powershell
cd "C:\Users\marco\Desktop\Codex\pericia-digital-marco-site"

git status
git branch --show-current
git remote -v

git remote add origin https://github.com/USUARIO/NOME-DO-REPOSITORIO.git
git remote -v

git push -u origin NOME-DA-BRANCH
```

Substitua:

- `USUARIO` pelo usuário ou organização real;
- `NOME-DO-REPOSITORIO` pelo nome criado;
- `NOME-DA-BRANCH` por `master`, `main` ou `fix/producao-mobile-cartao`, conforme a decisão real.

Se `origin` já existir, não adicione outro. Confira-o e, se estiver incorreto, peça revisão antes de alterá-lo.

## 4. Opção 2 — Criar repositório com GitHub CLI

Verifique instalação e autenticação:

```powershell
gh --version
gh auth status
```

Exemplo de repositório privado:

```powershell
gh repo create NOME-DO-REPOSITORIO --private --source=. --remote=origin
git push -u origin NOME-DA-BRANCH
```

Exemplo de repositório público:

```powershell
gh repo create NOME-DO-REPOSITORIO --public --source=. --remote=origin
git push -u origin NOME-DA-BRANCH
```

Não presuma que o GitHub CLI esteja autenticado ou apontando para a conta correta.

## 5. Preparação da Vercel

Configuração esperada:

| Campo | Valor esperado |
|---|---|
| Framework Preset | Next.js |
| Root Directory | raiz do repositório |
| Install Command | automático ou `npm ci` |
| Build Command | `npm run build` |
| Output Directory | detecção automática do Next.js |
| Node.js | 24.x |

Não configure manualmente `.next` como saída. O adaptador Next.js da Vercel gerencia o build.

### Variável de ambiente

Cadastre em Production, Preview e Development conforme necessário:

```env
NEXT_PUBLIC_SITE_URL=https://URL-PUBLICA-CONFIRMADA
```

Ela é pública e não é segredo. Deve conter a URL real do site, sem inventar domínio. A variável é incorporada durante o build, portanto uma alteração exige novo deploy.

## 6. Publicar pelo site da Vercel

1. Acesse <https://vercel.com>.
2. Entre usando a conta vinculada ao GitHub correto.
3. Clique em **Add New** e depois em **Project**.
4. Localize o repositório e clique em **Import**.
5. Confirme o preset **Next.js**.
6. Confirme que o Root Directory é a raiz do projeto.
7. Mantenha instalação automática ou use `npm ci`.
8. Confirme `npm run build` como Build Command.
9. Não force um Output Directory.
10. Selecione Node.js 24.x, caso o painel não use o padrão do projeto.
11. Cadastre `NEXT_PUBLIC_SITE_URL` com a URL pública confirmada.
12. Inicie o deploy e acompanhe os logs.
13. Abra a URL gerada.
14. Teste `/` e `/cartao`.
15. Teste fotografia, APECOF, menu, WhatsApp, telefone, e-mail, QR e VCF.
16. Abra `/opengraph-image` e `/cartao/opengraph-image`.
17. Envie o link de `/cartao` pelo WhatsApp e confira a prévia.
18. Valide canonical, robots e sitemap.
19. Teste em um celular real.

## 7. Publicação opcional com Vercel CLI

Instalação global opcional:

```powershell
npm install -g vercel
```

Alternativa sem instalação global:

```powershell
npx vercel
```

Fluxo:

```powershell
vercel login
vercel link
vercel
vercel --prod
```

- `vercel` normalmente cria um deploy de pré-visualização;
- `vercel --prod` publica em produção;
- confira conta, equipe e projeto antes de confirmar;
- estes comandos não devem ser executados durante a preparação local.

Depois de vincular, confira:

```powershell
Get-Content .vercel\project.json
```

`.vercel` permanece ignorado pelo Git.

## 8. Configurar domínio próprio

1. Abra o projeto na Vercel.
2. Entre em **Settings**.
3. Abra **Domains**.
4. Adicione o domínio real.
5. Copie as instruções DNS apresentadas pela Vercel.
6. Configure esses registros no provedor do domínio.
7. Aguarde a propagação.
8. Confirme o certificado HTTPS.
9. Atualize `NEXT_PUBLIC_SITE_URL` com o domínio final.
10. Faça novo deploy.
11. Confira canonical, sitemap, QR Code, VCF e compartilhamento.

Não copie registros DNS genéricos deste manual; os valores corretos são os exibidos pelo painel da Vercel.

## 9. Atualizações futuras

```powershell
git status
git add .
git commit -m "descrição objetiva da alteração"
git push origin NOME-DA-BRANCH
```

Após o push, a Vercel normalmente cria um deploy. A branch configurada como produção atualiza o site público; outras branches e pull requests podem gerar previews.

Se um deploy falhar:

1. abra os logs da Vercel;
2. localize o primeiro erro real;
3. reproduza com `npm ci` e `npm run build`;
4. corrija localmente;
5. valide audit, lint e testes;
6. crie novo commit;
7. envie a correção.

## 10. Fluxo recomendado de publicação

1. concluir e validar tudo localmente;
2. revisar commits e arquivos rastreados;
3. criar o repositório no GitHub;
4. configurar o remoto correto;
5. enviar a branch escolhida;
6. revisar arquivos no GitHub;
7. importar na Vercel;
8. configurar a variável de ambiente;
9. gerar preview;
10. validar desktop, celular e WhatsApp;
11. configurar domínio;
12. atualizar `NEXT_PUBLIC_SITE_URL`;
13. publicar em produção;
14. validar novamente.

## Blocos finais

### Conferência local

```powershell
cd "C:\Users\marco\Desktop\Codex\pericia-digital-marco-site"
git status
git log --oneline --decorate -10
npm ci
npm audit --omit=dev
npm run lint
npm run test
npm run build
```

### Envio para o GitHub

```powershell
git remote add origin https://github.com/USUARIO/NOME-DO-REPOSITORIO.git
git remote -v
git push -u origin NOME-DA-BRANCH
```

### Publicação opcional pela Vercel CLI

```powershell
vercel login
vercel link
vercel
vercel --prod
```
