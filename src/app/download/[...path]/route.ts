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
import { isOpenGraphBot } from "@/utils";

import { createOpenGraphResponse } from "@/utils/openGraphResponse";

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
  const regularLink = getLinkValue(regularDownloadLinks, downloadPath);
  const specificLink = getLinkValue(specificDownloadLinks, downloadPath);
  const downloadLink = regularLink ?? specificLink;

  if (!downloadLink) return new NextResponse(null, { status: 404 });

  if (isOpenGraphBot(request.headers.get("user-agent"))) {
    return createOpenGraphResponse(request.nextUrl.pathname, downloadLink.openGraph);
  }

  const sourceFileName = basename(downloadLink.filePath);
  const isRegularDownload = Boolean(regularLink) || request.nextUrl.searchParams.get(regularDownloadSearchParam) === "1";
  const downloadFileName = isRegularDownload ? removeVersion(sourceFileName) : sourceFileName;
  let file: Buffer;

  try {
    file = await readFile(join(process.cwd(), downloadLink.filePath));
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
function getLinkValue<T>(links: Record<string, T>, path: string): T | undefined {
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
