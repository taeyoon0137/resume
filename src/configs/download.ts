/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ### 정규 다운로드 링크
 *
 * 최신 파일을 버전 표기 없이 다운로드하는 경로와 원본 파일을 정의합니다.
 */
export const regularDownloadLinks = {
  "/download/portfolio": "src/files/Portfolio – Taeyoon Lee 2026_20260610.pdf",
  "/download/portfolio-product": "src/files/Portfolio – Taeyoon Lee 2026_20260610.pdf",
  "/download/portfolio-visual": "src/files/Visual Portfolio – Taeyoon Lee 2026_20260713.pdf",
} as const;

/**
 * ### 구체적 다운로드 링크
 *
 * 특정 버전의 파일을 버전 표기와 함께 다운로드하는 경로와 원본 파일을 정의합니다.
 */
export const specificDownloadLinks = {
  "/download/portfolio/20260610": "src/files/Portfolio – Taeyoon Lee 2026_20260610.pdf",
  "/download/portfolio-product/20260610": "src/files/Portfolio – Taeyoon Lee 2026_20260610.pdf",
  "/download/portfolio-visual/20260713": "src/files/Visual Portfolio – Taeyoon Lee 2026_20260713.pdf",
} as const;

/**
 * ### 간단 다운로드 링크
 *
 * 짧은 경로에서 정규 다운로드 경로로 연결되는 링크를 정의합니다.
 */
export const simpleDownloadLinks = {
  portfolio: "/download/portfolio",
  "portfolio/product": "/download/portfolio-product",
  "portfolio/visual": "/download/portfolio-visual",
} as const;
