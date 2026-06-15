/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { NextResponse } from "next/server";

import { PORTFOLIO_FILE_NAME } from "@/constants";

export const runtime = "nodejs";

const portfolioFilePath = join(process.cwd(), "downloads", "portfolio", PORTFOLIO_FILE_NAME);

/**
 * ### 구체적 포트폴리오 다운로드
 *
 * 특정 날짜 버전의 포트폴리오 PDF를 attachment로 응답합니다.
 *
 * @returns PDF 다운로드 응답입니다.
 */
export async function GET(): Promise<Response> {
  const file = await readFile(portfolioFilePath);

  return new NextResponse(new Uint8Array(file), {
    headers: {
      // PDF 본문은 정적 자산이라 브라우저 1시간, CDN 1일까지 캐시합니다.
      // 파일이 갱신되면 경로의 날짜 세그먼트(PORTFOLIO_DATE)가 바뀌므로 cache busting은 URL로 처리합니다.
      "Cache-Control": "public, max-age=3600, s-maxage=86400, must-revalidate",
      "Content-Disposition":
        "attachment; filename=\"Portfolio - Taeyoon Lee 2026.pdf\"; filename*=UTF-8''Portfolio%20%E2%80%93%20Taeyoon%20Lee%202026.pdf",
      "Content-Length": file.byteLength.toString(),
      "Content-Type": "application/pdf",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
