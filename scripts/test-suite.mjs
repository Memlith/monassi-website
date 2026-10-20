#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
let failures = 0;

function pass(msg) {
  console.log(`  ✓ ${msg}`);
}

function fail(msg) {
  console.error(`  ✗ ${msg}`);
  failures++;
}

console.log("🧪 [Monassi Test Suite] Iniciando verificações...\n");

// 1. ESLint
console.log("1️⃣  Rodando ESLint...");
try {
  execSync("npx eslint .", { stdio: "inherit" });
  pass("ESLint passou sem erros.");
} catch {
  fail("ESLint encontrou erros.");
}

// 2. TypeScript Typecheck
console.log("\n2️⃣  Rodando TypeScript (tsc --noEmit)...");
try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript passou sem erros de tipagem.");
} catch {
  fail("TypeScript encontrou erros de tipagem.");
}

// 3. Verify all images in public/img are WebP
console.log("\n3️⃣  Verificando imagens em public/img/ (formato WebP)...");
function walk(dir) {
  const res = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) res.push(...walk(p));
    else res.push(p);
  }
  return res;
}

const imgFiles = walk(path.join(ROOT, "public", "img"));
const nonWebp = imgFiles.filter((f) => /\.(jpg|jpeg|png)$/i.test(f));
if (nonWebp.length === 0) {
  pass(`Todas as ${imgFiles.length} imagens em public/img/ estão em formato .webp.`);
} else {
  fail(
    `Encontradas ${nonWebp.length} imagens não convertidas para .webp. Rode "npm run optimize:images".`
  );
}

// 4. Verify Catalog Data (80 Duratex 2026 patterns)
console.log("\n4️⃣  Verificando integridade do Catálogo MDF (lib/catalog-data.json)...");
const catalogJson = JSON.parse(
  fs.readFileSync(path.join(ROOT, "lib", "catalog-data.json"), "utf8")
);
if (catalogJson.length === 80) {
  pass(`Catálogo contém todos os ${catalogJson.length} padrões Duratex 2026.`);
} else {
  fail(`Catálogo deveria ter 80 padrões, mas tem ${catalogJson.length}.`);
}

let missingCatalogImgs = 0;
for (const pattern of catalogJson) {
  for (const field of ["swatchUrl", "ambientUrl"]) {
    const rel = pattern[field];
    const abs = path.join(ROOT, "public", rel);
    if (!fs.existsSync(abs)) {
      fail(`Imagem ausente no catálogo (${pattern.name}): ${rel}`);
      missingCatalogImgs++;
    }
  }
}
if (missingCatalogImgs === 0) {
  pass("Todas as 160 imagens do catálogo (swatches e ambientes) existem no disco.");
}

// 5. Verify Gallery Projects Data (lib/projects-data.ts)
console.log("\n5️⃣  Verificando integridade da Galeria de Projetos (lib/projects-data.ts)...");
const projectsTs = fs.readFileSync(
  path.join(ROOT, "lib", "projects-data.ts"),
  "utf8"
);
const slideMatches = [...projectsTs.matchAll(/src:\s*['"]([^'"]+)['"]/g)].map(
  (m) => m[1]
);
const featuredMatches = [
  ...projectsTs.matchAll(/featuredOnHome:\s*true/g),
];

if (featuredMatches.length === 6) {
  pass("Exatamente 6 projetos estão marcados como destaque na Home (featuredOnHome: true).");
} else {
  fail(
    `Esperados 6 projetos em destaque na Home, encontrados ${featuredMatches.length}.`
  );
}

let missingSlideImgs = 0;
for (const slideSrc of slideMatches) {
  const abs = path.join(ROOT, "public", slideSrc);
  if (!fs.existsSync(abs)) {
    fail(`Foto de projeto ausente: ${slideSrc}`);
    missingSlideImgs++;
  }
}
if (missingSlideImgs === 0 && slideMatches.length > 0) {
  pass(`Todas as ${slideMatches.length} fotos de projetos da galeria existem no disco.`);
}

// 6. Verify Firestore Security Rules
console.log("\n6️⃣  Verificando regras de segurança do Firebase (firestore.rules)...");
const rules = fs.readFileSync(path.join(ROOT, "firestore.rules"), "utf8");
if (
  rules.includes("iamcaiosimonassi@gmail.com") &&
  rules.includes("email_verified == true") &&
  rules.includes("['Indaiatuba', 'Salto', 'Itu']")
) {
  pass("Regras do Firestore validam admin verificado e cidades atendidas.");
} else {
  fail("Regras do Firestore estão incompletas.");
}

if (failures > 0) {
  console.error(`\n❌ ${failures} verificação(ões) falharam.`);
  process.exit(1);
} else {
  console.log("\n✅ Todos os testes passaram com sucesso!");
}
