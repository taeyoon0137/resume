/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createPortfolioDownloadResponse } from "@/app/download/portfolio/portfolioDownload";

export const runtime = "nodejs";

/**
 * ### 구체적 포트폴리오 다운로드
 *
 * 특정 날짜 버전의 포트폴리오 다운로드 URL 요청을 처리합니다.
 *
 * @param request 요청 객체입니다.
 * @returns 포트폴리오 다운로드 응답입니다.
 */
export async function GET(request: Request): Promise<Response> {
  return createPortfolioDownloadResponse(request);
}
