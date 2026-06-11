/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { NextResponse } from "next/server";

const siteUrl = "https://resume.taeyoon.xyz";
const portfolioFilePath = join(process.cwd(), "downloads", "portfolio", "20260610.pdf");
const portfolioTitle = "taeyoon. – portfolio";
const portfolioDescription = "Taeyoon Lee as Product Designer";
const openGraphImageUrl = `${siteUrl}/img_open_graph.png`;
const noIndexValue = "noindex, nofollow, noarchive";
const downloadSearchParam = "download";
const botUserAgentPattern =
  /applebot|baiduspider|bingbot|bot|crawl|daum|discordbot|duckduckbot|facebookexternalhit|facebot|google-inspectiontool|googlebot|googleother|kakaotalk|line|linkedinbot|naver|preview|slackbot|slurp|spider|telegrambot|twitterbot|whatsapp|yeti|yandexbot/i;

/**
 * ### 포트폴리오 다운로드 응답 생성
 *
 * 봇에게는 파일 대신 오픈그래프 HTML을 제공하고,
 * 일반 사용자에게는 포트폴리오 PDF 다운로드를 시작하는 HTML을 제공합니다.
 *
 * @param request 요청 객체입니다.
 * @returns 포트폴리오 다운로드 엔드포인트 응답입니다.
 */
export async function createPortfolioDownloadResponse(request: Request): Promise<NextResponse> {
  if (isBotRequest(request)) {
    return createOpenGraphResponse(request);
  }

  if (isFileRequest(request)) {
    return createFileResponse();
  }

  return createDownloadPageResponse(request);
}

/**
 * ### 파일 요청 여부 확인
 *
 * 다운로드 시작 페이지가 내부적으로 호출한 파일 요청인지 확인합니다.
 *
 * @param request 요청 객체입니다.
 * @returns 파일 요청인지 여부입니다.
 */
function isFileRequest(request: Request): boolean {
  const url = new URL(request.url);

  return url.searchParams.get(downloadSearchParam) === "1";
}

/**
 * ### 봇 요청 여부 확인
 *
 * 검색엔진과 링크 프리뷰 봇으로 보이는 요청인지 확인합니다.
 * User-Agent가 비어 있으면 파일 제공을 피하기 위해 봇 요청으로 취급합니다.
 *
 * @param request 요청 객체입니다.
 * @returns 봇 요청으로 볼 수 있는지 여부입니다.
 */
function isBotRequest(request: Request): boolean {
  const userAgent = request.headers.get("user-agent") ?? "";

  return userAgent.trim().length === 0 || botUserAgentPattern.test(userAgent);
}

/**
 * ### 파일 응답 생성
 *
 * 포트폴리오 PDF를 attachment 응답으로 생성합니다.
 *
 * @returns PDF 다운로드 응답입니다.
 */
async function createFileResponse(): Promise<NextResponse> {
  const file = await readFile(portfolioFilePath);

  return new NextResponse(new Uint8Array(file), {
    headers: {
      // PDF 본문은 정적 자산이라 브라우저 1시간, CDN 1일까지 캐시합니다.
      // 파일이 갱신되면 경로의 날짜 세그먼트(20260610)가 바뀌므로 cache busting은 URL로 처리합니다.
      "Cache-Control": "public, max-age=3600, s-maxage=86400, must-revalidate",
      "Content-Disposition":
        "attachment; filename=\"Portfolio - Taeyoon Lee 2026.pdf\"; filename*=UTF-8''Portfolio%20%E2%80%93%20Taeyoon%20Lee%202026.pdf",
      "Content-Length": file.byteLength.toString(),
      "Content-Type": "application/pdf",
      "X-Robots-Tag": noIndexValue,
    },
  });
}

/**
 * ### 오픈그래프 응답 생성
 *
 * 포트폴리오 다운로드 URL의 링크 프리뷰용 HTML을 생성합니다.
 *
 * @param request 요청 객체입니다.
 * @returns 오픈그래프 HTML 응답입니다.
 */
function createOpenGraphResponse(request: Request): NextResponse {
  return new NextResponse(createHtmlDocument(request, ""), {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": noIndexValue,
    },
  });
}

/**
 * ### 다운로드 시작 페이지 응답 생성
 *
 * 클린 URL에서 PDF 다운로드를 시작한 뒤 홈으로 이동하는 HTML 응답을 생성합니다.
 *
 * @param request 요청 객체입니다.
 * @returns 다운로드 시작 페이지 응답입니다.
 */
function createDownloadPageResponse(request: Request): NextResponse {
  return new NextResponse(createHtmlDocument(request, createDownloadPageBody(request)), {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": noIndexValue,
    },
  });
}

/**
 * ### HTML 문서 생성
 *
 * 메인 랜딩의 오픈그래프 이미지를 유지하고, 포트폴리오 전용 제목과 설명을 적용합니다.
 *
 * @param request 요청 객체입니다.
 * @param bodyContent body 안에 렌더링할 HTML 문자열입니다.
 * @returns HTML 문서 문자열입니다.
 */
function createHtmlDocument(request: Request, bodyContent: string): string {
  const canonicalUrl = getCanonicalUrl(request);

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="${noIndexValue}" />
    <title>${escapeHtml(portfolioTitle)}</title>
    <meta name="description" content="${escapeHtml(portfolioDescription)}" />
    <meta property="og:site_name" content="taeyoon. – resume" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(portfolioTitle)}" />
    <meta property="og:description" content="${escapeHtml(portfolioDescription)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(openGraphImageUrl)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(portfolioTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(portfolioDescription)}" />
    <meta name="twitter:image" content="${escapeHtml(openGraphImageUrl)}" />
  </head>
  <body>${bodyContent}</body>
</html>`;
}

/**
 * ### 다운로드 시작 페이지 본문 생성
 *
 * PDF 다운로드 요청을 시작하고, 사용자에게 홈 주소가 남도록 이동하는 본문을 생성합니다.
 *
 * @param request 요청 객체입니다.
 * @returns 다운로드 시작 페이지 body HTML 문자열입니다.
 */
function createDownloadPageBody(request: Request): string {
  const downloadUrl = getFileDownloadUrl(request);
  const homeUrl = `${siteUrl}/`;

  return `
    <main>
      <p>포트폴리오 다운로드를 시작합니다.</p>
      <p><a href="${escapeHtml(downloadUrl)}" rel="nofollow">다운로드가 시작되지 않으면 다시 시도하세요.</a></p>
      <p><a href="${escapeHtml(homeUrl)}">resume.taeyoon.xyz</a></p>
    </main>
    <script>
      (function () {
        var downloadLink = document.createElement("a");
        downloadLink.href = ${toScriptString(downloadUrl)};
        downloadLink.rel = "nofollow";
        downloadLink.setAttribute("download", "");
        document.body.appendChild(downloadLink);

        window.setTimeout(function () {
          window.location.replace(${toScriptString(homeUrl)});
        }, 1200);

        try {
          downloadLink.click();
        } catch (_) {
          window.location.replace(${toScriptString(homeUrl)});
        }
      })();
    </script>`;
}

/**
 * ### 파일 다운로드 URL 반환
 *
 * 현재 클린 URL을 기준으로 내부 파일 요청 URL을 생성합니다.
 *
 * @param request 요청 객체입니다.
 * @returns 내부 파일 요청 URL입니다.
 */
function getFileDownloadUrl(request: Request): string {
  const url = new URL(request.url);
  url.search = "";
  url.searchParams.set(downloadSearchParam, "1");

  return url.toString();
}

/**
 * ### 정규 URL 반환
 *
 * 요청 경로를 운영 도메인의 절대 URL로 변환합니다.
 *
 * @param request 요청 객체입니다.
 * @returns 운영 도메인 기준의 정규 URL입니다.
 */
function getCanonicalUrl(request: Request): string {
  const url = new URL(request.url);

  return new URL(url.pathname, siteUrl).toString();
}

/**
 * ### HTML 이스케이프
 *
 * HTML 속성에 들어가는 문자열을 안전하게 변환합니다.
 *
 * @param value 변환할 문자열입니다.
 * @returns HTML 이스케이프가 적용된 문자열입니다.
 */
function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

/**
 * ### 스크립트 문자열 변환
 *
 * 인라인 스크립트에 들어가는 문자열 값을 안전한 JavaScript 리터럴로 변환합니다.
 *
 * @param value 변환할 문자열입니다.
 * @returns JavaScript 문자열 리터럴입니다.
 */
function toScriptString(value: string): string {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}
