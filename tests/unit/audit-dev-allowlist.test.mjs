import assert from "node:assert/strict";
import test from "node:test";
import { POLICY, localDate, validateAudits } from "../../scripts/audit-dev-allowlist.mjs";

function report(vulnerabilities = {}) {
  const counts = { info: 0, low: 0, moderate: 0, high: 0, critical: 0, total: 0 };
  for (const entry of Object.values(vulnerabilities)) { counts[entry.severity] += 1; counts.total += 1; }
  return { auditReportVersion: 2, vulnerabilities, metadata: { vulnerabilities: counts } };
}

function fixture() {
  const packageJson = { name: "site", devDependencies: { "eslint-config-next": "16.4.0" } };
  const packages = { "": structuredClone(packageJson) };
  const vulnerabilities = {};
  const installedVersions = {};
  for (let index = 0; index < POLICY.chain.length; index += 1) {
    const [name, version] = POLICY.chain[index];
    const next = POLICY.chain[index + 1];
    packages[`node_modules/${name}`] = { version, dev: true, ...(next ? { dependencies: { [next[0]]: next[1] } } : {}) };
    installedVersions[name] = version;
    vulnerabilities[name] = {
      name, severity: "high", isDirect: index === 0,
      via: next ? [next[0]] : [{ name: "braces", dependency: "braces", severity: "high", range: "<=3.0.3", url: POLICY.advisory }],
      effects: index ? [POLICY.chain[index - 1][0]] : [], nodes: [`node_modules/${name}`],
      fixAvailable: { name: "eslint-config-next", version: "14.2.35", isSemVerMajor: true },
    };
  }
  return {
    production: report(), productionExitCode: 0,
    complete: report(vulnerabilities), completeExitCode: 1,
    packageJson, lock: { lockfileVersion: 3, packages }, installedVersions,
    now: new Date("2026-10-11T19:00:00Z"),
  };
}

test("aceita exclusivamente o aviso alto e a cadeia de desenvolvimento autorizados", () => {
  assert.deepEqual(validateAudits(fixture()), { exceptionUsed: true });
});

test("relatório sem vulnerabilidades não utiliza a exceção", () => {
  const input = fixture();
  input.complete = report(); input.completeExitCode = 0;
  assert.deepEqual(validateAudits(input), { exceptionUsed: false });
});

test("validade inclui todo o dia 11/11 no fuso America/Cuiaba", () => {
  const input = fixture();
  input.now = new Date("2026-11-12T03:59:59Z");
  assert.equal(localDate(input.now), "2026-11-11");
  assert.equal(validateAudits(input).exceptionUsed, true);
  input.now = new Date("2026-11-12T04:00:00Z");
  assert.throws(() => validateAudits(input), /expirada/);
});

const rejectionCases = [
  ["outra vulnerabilidade em produção", (input) => {
    input.production = report({ unrelated: { severity: "moderate" } }); input.productionExitCode = 1;
  }],
  ["mesmo braces em produção", (input) => {
    input.production = report({ braces: input.complete.vulnerabilities.braces }); input.productionExitCode = 1;
  }],
  ["erro de registro npm com relatório vazio", (input) => { input.production.error = { code: "ENETUNREACH" }; }],
  ["formato de auditoria desconhecido", (input) => { input.complete.auditReportVersion = 3; }],
  ["relatório ausente", (input) => { input.complete = null; }],
  ["código de saída de erro inesperado", (input) => { input.completeExitCode = 2; }],
  ["processo sem código de saída", (input) => { input.productionExitCode = null; }],
  ["falsa saída zero com avisos", (input) => { input.completeExitCode = 0; }],
  ["contagem incompatível", (input) => { input.complete.metadata.vulnerabilities.high = 0; }],
  ["novo pacote vulnerável", (input) => {
    input.complete = report({ ...input.complete.vulnerabilities, another: { severity: "high" } });
  }],
  ["novo aviso em braces", (input) => { input.complete.vulnerabilities.braces.via.push({ ...input.complete.vulnerabilities.braces.via[0], url: "https://github.com/advisories/GHSA-new" }); }],
  ["substituição do aviso autorizado", (input) => { input.complete.vulnerabilities.braces.via[0].url = "https://github.com/advisories/GHSA-new"; }],
  ["severidade crítica", (input) => {
    input.complete.vulnerabilities.braces.severity = "critical";
    input.complete = report(input.complete.vulnerabilities);
  }],
  ["severidade interna do aviso divergente", (input) => { input.complete.vulnerabilities.braces.via[0].severity = "moderate"; }],
  ["propagação diferente no relatório", (input) => { input.complete.vulnerabilities.micromatch.effects.push("other"); }],
  ["origem de propagação diferente", (input) => { input.complete.vulnerabilities["fast-glob"].via = ["other"]; }],
  ["cópia adicional vulnerável", (input) => { input.complete.vulnerabilities.braces.nodes.push("node_modules/other/node_modules/braces"); }],
  ["dependência direta em produção", (input) => { input.packageJson.dependencies = { "eslint-config-next": "16.4.0" }; }],
  ["braces adicionado diretamente", (input) => { input.packageJson.devDependencies.braces = "3.0.3"; }],
  ["classificação de desenvolvimento ausente no lock", (input) => { delete input.lock.packages["node_modules/braces"].dev; }],
  ["raiz divergente no lock", (input) => { input.lock.packages[""].dependencies = { "eslint-config-next": "16.4.0" }; }],
  ["outra cadeia transitiva", (input) => { input.lock.packages["node_modules/another"] = { version: "1.0.0", dev: true, dependencies: { braces: "3.0.3" } }; }],
  ["outra cadeia por peer dependency", (input) => { input.lock.packages["node_modules/another"] = { version: "1.0.0", dev: true, peerDependencies: { micromatch: "4.0.8" } }; }],
  ["cópia adicional no lock", (input) => { input.lock.packages["node_modules/other/node_modules/braces"] = { version: "3.0.3", dev: true }; }],
  ["versão de braces não autorizada", (input) => { input.lock.packages["node_modules/braces"].version = "3.0.4"; }],
  ["instalação divergente do lock", (input) => { input.installedVersions.braces = "3.0.2"; }],
  ["indicação nova de correção compatível", (input) => { input.complete.vulnerabilities.braces.fixAvailable = true; }],
  ["indicação de correção fora da exceção", (input) => { input.complete.vulnerabilities.braces.fixAvailable.version = "16.4.1"; }],
  ["política expirada mesmo com auditoria limpa", (input) => { input.complete = report(); input.completeExitCode = 0; input.now = new Date("2026-11-12T04:00:00Z"); }],
];

for (const [name, mutate] of rejectionCases) {
  test(`rejeita ${name}`, () => {
    const input = fixture(); mutate(input);
    assert.throws(() => validateAudits(input));
  });
}
