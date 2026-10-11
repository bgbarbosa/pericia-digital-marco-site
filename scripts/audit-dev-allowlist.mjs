import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const POLICY = Object.freeze({
  advisory: "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm",
  severity: "high",
  reviewBy: "2026-11-11",
  timeZone: "America/Cuiaba",
  chain: Object.freeze([
    ["eslint-config-next", "16.4.0"],
    ["@next/eslint-plugin-next", "16.4.0"],
    ["fast-glob", "3.3.1"],
    ["micromatch", "4.0.8"],
    ["braces", "3.0.3"],
  ].map(Object.freeze)),
});

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function sameMembers(actual, expected) {
  return Array.isArray(actual) && actual.length === expected.length
    && [...actual].sort().every((item, index) => item === [...expected].sort()[index]);
}

export function localDate(now) {
  requireCondition(now instanceof Date && !Number.isNaN(now.valueOf()), "Data de execução inválida.");
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: POLICY.timeZone, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  return ["year", "month", "day"].map((type) => parts.find((part) => part.type === type).value).join("-");
}

function validateReport(report, exitCode, label) {
  requireCondition(isRecord(report) && report.auditReportVersion === 2 && !report.error,
    `${label}: relatório npm ausente, inválido ou com erro.`);
  requireCondition(isRecord(report.vulnerabilities) && isRecord(report.metadata?.vulnerabilities),
    `${label}: formato inesperado da auditoria.`);
  const counts = report.metadata.vulnerabilities;
  const severities = ["info", "low", "moderate", "high", "critical"];
  requireCondition(sameMembers(Object.keys(counts), [...severities, "total"])
    && Object.values(counts).every((value) => Number.isSafeInteger(value) && value >= 0),
  `${label}: contadores inválidos.`);
  const entries = Object.values(report.vulnerabilities);
  requireCondition(entries.every((entry) => isRecord(entry) && severities.includes(entry.severity)),
    `${label}: severidade desconhecida.`);
  requireCondition(counts.total === entries.length
    && severities.every((severity) => counts[severity] === entries.filter((entry) => entry.severity === severity).length),
  `${label}: contadores não correspondem aos avisos.`);
  requireCondition(exitCode === (entries.length ? 1 : 0), `${label}: código de saída inesperado (${exitCode}).`);
}

function resolveLockedDependency(packages, from, name) {
  let base = from;
  while (base) {
    const candidate = `${base}/node_modules/${name}`;
    if (Object.hasOwn(packages, candidate)) return candidate;
    const index = base.lastIndexOf("/node_modules/");
    base = index < 0 ? "" : base.slice(0, index);
  }
  const candidate = `node_modules/${name}`;
  return Object.hasOwn(packages, candidate) ? candidate : null;
}

function validateDevelopmentChain(packageJson, lock, installedVersions) {
  requireCondition(isRecord(packageJson) && lock?.lockfileVersion === 3 && isRecord(lock.packages?.[""]),
    "Manifesto ou lockfile incompatível com a política.");
  const packages = lock.packages;
  const names = POLICY.chain.map(([name]) => name);
  const direct = names[0];
  for (const manifest of [packageJson, packages[""]]) {
    requireCondition(manifest.devDependencies?.[direct] === "16.4.0", "A dependência direta deve ser eslint-config-next@16.4.0 em devDependencies.");
    for (const field of ["dependencies", "optionalDependencies", "peerDependencies", "devDependencies"]) {
      const allowed = field === "devDependencies" ? [direct] : [];
      requireCondition(!names.some((name) => Object.hasOwn(manifest[field] || {}, name) && !allowed.includes(name)),
        "A cadeia autorizada foi adicionada diretamente fora de devDependencies ou ganhou outra raiz.");
    }
  }
  for (let index = 0; index < POLICY.chain.length; index += 1) {
    const [name, version] = POLICY.chain[index];
    const node = `node_modules/${name}`;
    const entry = packages[node];
    requireCondition(entry?.version === version && entry.dev === true && !entry.link,
      `${name}: versão, exclusividade de desenvolvimento ou tipo de instalação não autorizado.`);
    requireCondition(installedVersions?.[name] === version, `${name}: instalação divergente do lockfile.`);
    const copies = Object.keys(packages).filter((key) => key === node || key.endsWith(`/${node}`) || packages[key].name === name);
    requireCondition(sameMembers(copies, [node]), `${name}: cópia adicional ou alias não autorizado.`);
    const parents = new Set();
    for (const [parent, parentPackage] of Object.entries(packages)) {
      const fields = parent === "" ? ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]
        : ["dependencies", "optionalDependencies", "peerDependencies"];
      if (fields.some((field) => Object.hasOwn(parentPackage[field] || {}, name))
        && resolveLockedDependency(packages, parent, name) === node) parents.add(parent);
    }
    const expectedParent = index === 0 ? "" : `node_modules/${POLICY.chain[index - 1][0]}`;
    requireCondition(sameMembers([...parents], [expectedParent]), `${name}: cadeia de dependências não autorizada.`);
  }
}

export function validateAudits({ production, productionExitCode, complete, completeExitCode,
  packageJson, lock, installedVersions, now = new Date() }) {
  requireCondition(localDate(now) <= POLICY.reviewBy,
    `Exceção expirada: revisar ou remover a política após ${POLICY.reviewBy} (${POLICY.timeZone}).`);
  validateReport(production, productionExitCode, "Produção");
  requireCondition(Object.keys(production.vulnerabilities).length === 0, "Vulnerabilidade de produção: nenhuma exceção é permitida.");
  validateReport(complete, completeExitCode, "Auditoria completa");
  if (Object.keys(complete.vulnerabilities).length === 0) return { exceptionUsed: false };
  const names = POLICY.chain.map(([name]) => name);
  requireCondition(sameMembers(Object.keys(complete.vulnerabilities), names), "Pacote vulnerável fora da cadeia autorizada ou relatório incompleto.");
  for (let index = 0; index < names.length; index += 1) {
    const name = names[index];
    const entry = complete.vulnerabilities[name];
    requireCondition(entry.name === name && entry.severity === POLICY.severity && entry.isDirect === (index === 0),
      `${name}: identificação, severidade ou dependência direta não autorizada.`);
    requireCondition(sameMembers(entry.nodes, [`node_modules/${name}`]), `${name}: localização não autorizada.`);
    requireCondition(sameMembers(entry.effects, index ? [names[index - 1]] : []), `${name}: propagação não autorizada.`);
    const fix = entry.fixAvailable;
    requireCondition(fix === false || (isRecord(fix) && fix.name === "eslint-config-next" && fix.version === "14.2.35" && fix.isSemVerMajor === true),
      `${name}: a indicação de correção mudou; revisar e remover a exceção quando houver correção compatível.`);
    if (name === "braces") {
      requireCondition(Array.isArray(entry.via) && entry.via.length === 1 && isRecord(entry.via[0]), "braces: aviso adicional ou formato inesperado.");
      const advisory = entry.via[0];
      requireCondition(advisory.url === POLICY.advisory && advisory.name === "braces" && advisory.dependency === "braces"
        && advisory.severity === POLICY.severity && advisory.range === "<=3.0.3", "braces: aviso ou severidade não autorizado.");
    } else {
      requireCondition(sameMembers(entry.via, [names[index + 1]]), `${name}: origem do aviso não autorizada.`);
    }
  }
  validateDevelopmentChain(packageJson, lock, installedVersions);
  return { exceptionUsed: true };
}

function runAudit(root, production) {
  const args = ["audit", ...(production ? ["--omit=dev"] : []), "--json"];
  // Windows executes npm.cmd through cmd.exe with a fixed command. No user,
  // repository or environment value is interpolated into that command string.
  const windows = process.platform === "win32";
  const command = windows ? "cmd.exe" : "npm";
  const commandArgs = windows
    ? ["/d", "/s", "/c", production ? "npm.cmd audit --omit=dev --json" : "npm.cmd audit --json"]
    : args;
  const result = spawnSync(command, commandArgs, {
    cwd: root, encoding: "utf8", windowsHide: true, maxBuffer: 10 * 1024 * 1024,
  });
  requireCondition(!result.error && !result.signal, `Falha ao executar npm ${args.join(" ")}: ${result.error?.message || result.signal}`);
  let report;
  try { report = JSON.parse(result.stdout); }
  catch { throw new Error(`npm ${args.join(" ")}: saída não é JSON válido.`); }
  return { report, exitCode: result.status };
}

export function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const readJson = (file) => JSON.parse(readFileSync(path.join(root, file), "utf8"));
  const production = runAudit(root, true);
  const complete = runAudit(root, false);
  const installedVersions = Object.fromEntries(POLICY.chain.map(([name]) => [name, readJson(`node_modules/${name}/package.json`).version]));
  const result = validateAudits({
    production: production.report, productionExitCode: production.exitCode,
    complete: complete.report, completeExitCode: complete.exitCode,
    packageJson: readJson("package.json"), lock: readJson("package-lock.json"), installedVersions,
  });
  console.log(`Produção: código ${production.exitCode}, nenhuma vulnerabilidade.`);
  console.log(`npm audit completo: código ${complete.exitCode}.`);
  console.log(result.exceptionUsed
    ? `Exceção temporária aceita: GHSA-vfj7-8cjw-p6xm, severidade high, somente a cadeia de desenvolvimento autorizada. Revisão até ${POLICY.reviewBy} (${POLICY.timeZone}).`
    : "Nenhuma exceção utilizada. Remova a política quando ela não for mais necessária.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { main(); }
  catch (error) { console.error(`Auditoria reprovada: ${error.message}`); process.exitCode = 1; }
}
