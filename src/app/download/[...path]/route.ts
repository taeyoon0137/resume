/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readFile } from "node:fs/promises";
import { basename, join, parse } from "node:path";

import { NextResponse, type NextRequest } from "next/server";

import { regularDownloadLinks, specificDownloadLinks } from "@/configs";

export const runtime = "nodejs";

const noIndexValue = "noindex, nofollow, noarchive";
const regularDownloadSearchParam = "regular";

interface DownloadRouteProps {
  params: Promise<{ path: string[] }>;
}

/**
 * ### 파일 다운로드
 *
 * 설정에 등록된 정규 또는 구체적 다운로드 요청을 처리합니다.
 *
 * @param request 요청 객체입니다.
 * @param props 다운로드 라우트 프로퍼티입니다.
 * @returns 파일 또는 찾을 수 없음 응답입니다.
 */
export async function GET(request: NextRequest, props: DownloadRouteProps): Promise<Response> {
  const { path } = await props.params;
  const downloadPath = `/download/${path.join("/")}`;
  const regularFilePath = getLinkValue(regularDownloadLinks, downloadPath);
  const specificFilePath = getLinkValue(specificDownloadLinks, downloadPath);
  const sourceFilePath = regularFilePath ?? specificFilePath;

  if (!sourceFilePath) return new NextResponse(null, { status: 404 });

  if (isBotRequest(request)) return createOpenGraphResponse(request);

  const sourceFileName = basename(sourceFilePath);
  const isRegularDownload = Boolean(regularFilePath) || request.nextUrl.searchParams.get(regularDownloadSearchParam) === "1";
  const downloadFileName = isRegularDownload ? removeVersion(sourceFileName) : sourceFileName;
  let file: Buffer;

  try {
    file = await readFile(join(process.cwd(), sourceFilePath));
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }

  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400, must-revalidate",
      "Content-Disposition": createContentDisposition(downloadFileName),
      "Content-Length": file.byteLength.toString(),
      "Content-Type": "application/pdf",
      Vary: "User-Agent",
      "X-Robots-Tag": noIndexValue,
    },
  });
}

/**
 * ### 링크 값 반환
 *
 * 다운로드 링크 목록에 요청 경로가 존재하면 연결된 파일명을 반환합니다.
 *
 * @param links 다운로드 링크 목록입니다.
 * @param path 요청 경로입니다.
 * @returns 연결된 파일명입니다.
 */
function getLinkValue(links: Record<string, string>, path: string): string | undefined {
  return Object.hasOwn(links, path) ? links[path] : undefined;
}

/**
 * ### 버전 제거
 *
 * 확장자 앞의 버전 표기를 다운로드 파일명에서 제거합니다.
 *
 * @param fileName 원본 파일명입니다.
 * @returns 버전 표기가 제거된 파일명입니다.
 */
function removeVersion(fileName: string): string {
  const { ext, name } = parse(fileName);

  return `${name.replace(/_[^_]+$/, "")}${ext}`;
}

/**
 * ### Content-Disposition 생성
 *
 * ASCII fallback과 UTF-8 파일명을 포함한 attachment 헤더 값을 생성합니다.
 *
 * @param fileName 다운로드 파일명입니다.
 * @returns Content-Disposition 헤더 값입니다.
 */
function createContentDisposition(fileName: string): string {
  const fallbackFileName = fileName.replaceAll("–", "-").replaceAll(/[^ -~]/g, "_");

  return `attachment; filename="${fallbackFileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

/**
 * ### 봇 요청 여부 확인
 *
 * 검색엔진과 링크 프리뷰 봇으로 보이는 요청인지 확인합니다.
 *
 * @param request 요청 객체입니다.
 * @returns 봇 요청 여부입니다.
 */
function isBotRequest(request: NextRequest): boolean {
  const userAgent = request.headers.get("user-agent") ?? "";

  return /bot|crawl|preview|slack|spider/i.test(userAgent);
}

/**
 * ### 오픈그래프 응답 생성
 *
 * 다운로드 링크 프리뷰용 HTML을 생성합니다.
 *
 * @param request 요청 객체입니다.
 * @returns 오픈그래프 HTML 응답입니다.
 */
function createOpenGraphResponse(request: NextRequest): NextResponse {
  const canonicalUrl = new URL(request.nextUrl.pathname, "https://resume.taeyoon.xyz").toString();

  return new NextResponse(`<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="${noIndexValue}" />
    <title>taeyoon. – portfolio</title>
    <meta name="description" content="Taeyoon Lee as Product Designer" />
    <meta property="og:site_name" content="taeyoon. – resume" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="taeyoon. – portfolio" />
    <meta property="og:description" content="Taeyoon Lee as Product Designer" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="https://resume.taeyoon.xyz/img_open_graph.png" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
</html>`, {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Type": "text/html; charset=utf-8",
      Vary: "User-Agent",
      "X-Robots-Tag": noIndexValue,
    },
  });
}
