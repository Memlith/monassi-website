#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT_DIR = process.cwd();
const IMG_DIR = path.join(ROOT_DIR, "public", "img");
const CODE_DIRS = ["app", "components", "lib"].map((d) => path.join(ROOT_DIR, d));

async function walkDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkDir(fullPath)));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function optimizeAndConvertImages() {
  console.log("🖼️  [WebP Optimizer] Verificando imagens em public/img/...");
  const allImgFiles = await walkDir(IMG_DIR);

  let convertedCount = 0;
  let compressedWebpCount = 0;
  let bytesBefore = 0;
  let bytesAfter = 0;

  for (const filePath of allImgFiles) {
    const ext = path.extname(filePath).toLowerCase();
    const baseName = path.basename(filePath, path.extname(filePath));
    const isLogo = baseName.toLowerCase().includes("logo");

    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      const statBefore = await fs.stat(filePath);
      const webpPath = path.join(path.dirname(filePath), `${baseName}.webp`);

      let pipeline = sharp(filePath).rotate(); // auto-orient EXIF
      const metadata = await pipeline.metadata();

      // Resize oversized images while keeping crisp resolution
      const maxDim = isLogo ? 1600 : 1600;
      if (
        (metadata.width && metadata.width > maxDim) ||
        (metadata.height && metadata.height > maxDim)
      ) {
        pipeline = pipeline.resize({
          width: maxDim,
          height: maxDim,
          fit: "inside",
          withoutEnlargement: true,
        });
      }

      const webpBuffer = await pipeline
        .webp(
          isLogo
            ? { quality: 92, alphaQuality: 100, effort: 6 }
            : { quality: 82, effort: 6 }
        )
        .toBuffer();

      await fs.writeFile(webpPath, webpBuffer);
      await fs.unlink(filePath);

      bytesBefore += statBefore.size;
      bytesAfter += webpBuffer.length;
      convertedCount++;
    } else if (ext === ".webp") {
      // Check if an existing .webp file is oversized (> 450 KB) and can be compressed further
      const statBefore = await fs.stat(filePath);
      if (statBefore.size > 450 * 1024) {
        const inputBuffer = await fs.readFile(filePath);
        const recompressed = await sharp(inputBuffer)
          .rotate()
          .resize({
            width: 1600,
            height: 1600,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 82, effort: 6 })
          .toBuffer();

        if (recompressed.length < statBefore.size * 0.9) {
          await fs.writeFile(filePath, recompressed);
          bytesBefore += statBefore.size;
          bytesAfter += recompressed.length;
          compressedWebpCount++;
        }
      }
    }
  }

  // Update any code references from /img/...(.jpg|.jpeg|.png) to .webp
  let updatedCodeFiles = 0;
  for (const codeDir of CODE_DIRS) {
    const codeFiles = await walkDir(codeDir);
    for (const codeFile of codeFiles) {
      if (!/\.(ts|tsx|js|jsx|json|css)$/.test(codeFile)) continue;
      const content = await fs.readFile(codeFile, "utf8");
      const updated = content.replace(
        /(\/img\/[^\s"'`)]+?)\.(?:jpg|jpeg|png)/gi,
        "$1.webp"
      );
      if (updated !== content) {
        await fs.writeFile(codeFile, updated, "utf8");
        updatedCodeFiles++;
      }
    }
  }

  if (convertedCount > 0 || compressedWebpCount > 0) {
    const saved = bytesBefore - bytesAfter;
    const pct = bytesBefore > 0 ? ((saved / bytesBefore) * 100).toFixed(1) : "0.0";
    console.log(
      `✅ [WebP Optimizer] ${convertedCount} convertidas para .webp, ${compressedWebpCount} .webp recomprimidas.`
    );
    console.log(
      `📉 Economia: ${formatBytes(bytesBefore)} → ${formatBytes(bytesAfter)} (-${formatBytes(saved)} / -${pct}%)`
    );
  } else {
    console.log("✅ [WebP Optimizer] Todas as imagens já estão em .webp e otimizadas.");
  }

  if (updatedCodeFiles > 0) {
    console.log(`🔗 Referências atualizadas para .webp em ${updatedCodeFiles} arquivo(s) de código.`);
  }
}

optimizeAndConvertImages().catch((err) => {
  console.error("❌ Erro ao otimizar imagens:", err);
  process.exit(1);
});
