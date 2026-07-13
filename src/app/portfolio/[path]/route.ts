/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NextResponse, type NextRequest } from "next/server";

import { simpleDownloadLinks } from "@/configs";
import { isOpenGraphBot, usesDestinationOpenGraph } from "@/utils";

import { createOpenGraphResponse } from "@/utils/openGraphResponse";

interface PortfolioRouteProps {
  params: Promise<{ path: string }>;
}

/**
 * ### 간단 다운로드 링크
 *
 * 간단 다운로드 경로를 정규 다운로드 경로로 리다이렉트합니다.
 *
 * @param request 요청 객체입니다.
 * @param props 포트폴리오 라우트 프로퍼티입니다.
 * @returns 리다이렉트 또는 찾을 수 없음 응답입니다.
 */
export async function GET(request: NextRequest, props: PortfolioRouteProps): Promise<Response> {
  const { path } = await props.params;
  const simplePath = `portfolio/${path}`;
  const downloadLink = getLinkValue(simpleDownloadLinks, simplePath);

  if (!downloadLink) return new NextResponse(null, { status: 404 });

  if (isOpenGraphBot(request.headers.get("user-agent")) && !usesDestinationOpenGraph(downloadLink.openGraph)) {
    return createOpenGraphResponse(request.nextUrl.pathname, downloadLink.openGraph);
  }

  return NextResponse.redirect(new URL(downloadLink.destination, request.url));
}

/**
 * ### 링크 값 반환
 *
 * 간단 다운로드 링크 목록에 요청 경로가 존재하면 연결된 경로를 반환합니다.
 *
 * @param links 간단 다운로드 링크 목록입니다.
 * @param path 요청 경로입니다.
 * @returns 연결된 다운로드 경로입니다.
 */
function getLinkValue<T>(links: Record<string, T>, path: string): T | undefined {
  return Object.hasOwn(links, path) ? links[path] : undefined;
}
