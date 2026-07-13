/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NextResponse } from "next/server";

import { createOpenGraphHtml } from "./openGraph";

import type { OpenGraphConfig } from "./openGraph";

const noIndexValue = "noindex, nofollow, noarchive";

/**
 * ### 오픈그래프 응답 생성
 *
 * 링크 프리뷰 봇에 제공할 HTML 응답을 생성합니다.
 *
 * @param path 요청 경로 또는 URL입니다.
 * @param openGraph 링크별 오픈그래프 설정입니다.
 * @returns 오픈그래프 HTML 응답입니다.
 */
export function createOpenGraphResponse(path: string, openGraph?: OpenGraphConfig): NextResponse {
  return new NextResponse(createOpenGraphHtml(path, openGraph), {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Type": "text/html; charset=utf-8",
      Vary: "User-Agent",
      "X-Robots-Tag": noIndexValue,
    },
  });
}
