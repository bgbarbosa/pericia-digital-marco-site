# Exceção temporária de auditoria — braces

Autorização específica do usuário em 11/10/2026 para a publicação de Perícia na Prática. A exceção substitui apenas o requisito de saída zero da auditoria completa; vulnerabilidades de produção continuam bloqueando a publicação, sem exceções.

## Aviso e limite

- Aviso: [GHSA-vfj7-8cjw-p6xm / CVE-2026-93687](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
- Severidade autorizada: **high** (alta), sem autorização para outros níveis ou avisos.
- Pacote vulnerável: `braces@3.0.3`; versões afetadas: `<=3.0.3`.
- Em consulta ao registro npm e ao aviso em 11/10/2026, `3.0.3` era a versão mais recente e não havia versão corrigida publicada.
- Revisão obrigatória até **2026-11-11**, inclusive, no fuso `America/Cuiaba`. A partir de 12/11/2026, o verificador falha enquanto a política não for revisada ou removida.

Somente esta cadeia é autorizada, exclusivamente em desenvolvimento:

```text
eslint-config-next@16.4.0
└── @next/eslint-plugin-next@16.4.0
    └── fast-glob@3.3.1
        └── micromatch@4.0.8
            └── braces@3.0.3
```

O aviso trata de esgotamento da pilha por padrões de chaves profundamente aninhados. Neste projeto a dependência faz parte da ferramenta de lint; não integra a árvore de produção. Essa delimitação justifica a exceção temporária autorizada, sem declarar ausência de vulnerabilidade ou impossibilidade de exploração em desenvolvimento.

## Comportamento do gate

`node scripts/audit-dev-allowlist.mjs` executa as auditorias de produção e completa em JSON. Não usa `audit fix`, `--force`, downgrade, fork, filtro genérico de severidade nem `continue-on-error`.

O verificador exige formato conhecido, contadores coerentes, códigos de saída esperados, zero vulnerabilidades de produção e, na auditoria completa, somente o aviso acima e os cinco pacotes de sua propagação. Valida severidade, nós, origens e efeitos, a dependência direta em `devDependencies`, as versões instaladas e o lockfile. Qualquer outro ancestral, cópia, alias, dependência direta, dependência de produção, peer ou cadeia envolvendo os pacotes autorizados reprova o gate.

`fixAvailable: true` ou uma indicação de correção diferente da ausência de correção e do downgrade já identificado para `eslint-config-next@14.2.35` também reprova: é necessário revisar a solução disponível e retirar a exceção quando a correção for compatível. O downgrade não é executado nem autorizado pelo script.

Falhas de rede, JSON inválido, formato desconhecido, relatório incompleto, severidade alterada, prazo vencido ou divergência entre instalação e lockfile encerram com saída 1. A data de execução vem do relógio do processo; não existe variável de ambiente para contornar a validade.

O workflow mantém `npm audit --omit=dev` como etapa independente e obrigatória. Apenas a execução bruta de `npm audit` foi substituída pelo verificador. A auditoria completa pura continua retornando **saída 1**, por causa do aviso autorizado e de sua propagação. O verificador retorna saída 0 somente se a exceção for estritamente satisfeita ou se não houver vulnerabilidades e a política ainda estiver no prazo.

## Retirada e validação

Retirar a exceção assim que houver versão corrigida ou atualização compatível da cadeia que elimine a dependência vulnerável. Atualizar o lockfile, executar ambas as auditorias, retirar o tratamento excepcional e restaurar o gate integral. Não ampliar aviso, cadeia, severidade ou prazo silenciosamente.

Os testes negativos em `tests/unit/audit-dev-allowlist.test.mjs` integram `npm run test` e cobrem produção, novos avisos/pacotes/cadeias, origem direta, instalação, contadores, falhas de auditoria e o limite de data no fuso definido.

```powershell
npm audit --omit=dev
npm audit
node scripts/audit-dev-allowlist.mjs
node --test tests/unit/audit-dev-allowlist.test.mjs
```

Não considerar `npm audit` aprovado apenas porque o verificador aceitou a exceção. Registrar os resultados separadamente no relatório da publicação.
