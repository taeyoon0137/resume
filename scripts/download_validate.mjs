/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import ts from "typescript";

const downloadConfigPath = resolve("src", "configs", "download.ts");
const downloadConfigSource = readFileSync(downloadConfigPath, "utf8");
const downloadConfigCode = ts.transpileModule(downloadConfigSource, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ESNext,
  },
}).outputText;
const downloadConfigUrl = `data:text/javascript;base64,${Buffer.from(downloadConfigCode).toString("base64")}`;
const { regularDownloadLinks, specificDownloadLinks } = await import(downloadConfigUrl);
const downloadFilePaths = [...new Set([...Object.values(regularDownloadLinks), ...Object.values(specificDownloadLinks)])];
const invalidDownloadFilePaths = downloadFilePaths.filter((filePath) => !filePath.startsWith("src/files/"));
const missingDownloadFilePaths = downloadFilePaths.filter((filePath) => !existsSync(resolve(filePath)));

if (invalidDownloadFilePaths.length > 0) {
  throw new Error(`다운로드 원본 경로는 src/files에 있어야 합니다: ${invalidDownloadFilePaths.join(", ")}`);
}

if (missingDownloadFilePaths.length > 0) {
  throw new Error(`다운로드 원본 파일을 찾을 수 없습니다: ${missingDownloadFilePaths.join(", ")}`);
}
