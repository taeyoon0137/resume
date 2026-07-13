/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { openGraphImage, siteDescription, siteTitle, siteUrl } from "./createPageMetadata";

import type { Metadata } from "next";

/**
 * ### 오픈그래프 설정
 *
 * 링크별로 덮어쓸 수 있는 오픈그래프 필드입니다.
 * 생략한 필드는 사이트 기본값을 사용합니다.
 */
export interface OpenGraphConfig {
  /** 링크 프리뷰 이미지 URL입니다. */
  image?: string;

  /** 링크 프리뷰 제목입니다. */
  title?: string;

  /** 링크 프리뷰 설명입니다. */
  description?: string;
}

interface CreateOpenGraphMetadataOptions {
  path: string;
  openGraph?: OpenGraphConfig;
  noIndex?: boolean;
}

interface ResolvedOpenGraph {
  image: string;
  title: string;
  description: string;
}

const botUserAgentPattern =
  /applebot|baiduspider|bingbot|bot|crawl|daum|discordbot|duckduckbot|facebookexternalhit|facebot|google-inspectiontool|googlebot|googleother|kakaotalk|line|linkedinbot|naver|preview|slackbot|slurp|spider|telegrambot|twitterbot|whatsapp|yeti|yandexbot/i;

/**
 * ### 오픈그래프 설정 해석
 *
 * 링크별 설정을 사이트 기본값과 병합합니다.
 *
 * @param openGraph 링크별 오픈그래프 설정입니다.
 * @returns 기본값이 적용된 오픈그래프 설정입니다.
 */
export function resolveOpenGraph(openGraph?: OpenGraphConfig): ResolvedOpenGraph {
  return {
    image: openGraph?.image ?? openGraphImage.url,
    title: openGraph?.title ?? siteTitle,
    description: openGraph?.description ?? siteDescription,
  };
}

/**
 * ### 오픈그래프 메타데이터 생성
 *
 * Next.js 페이지에서 사용할 오픈그래프와 트위터 카드 메타데이터를 생성합니다.
 *
 * @param options 메타데이터 생성 옵션입니다.
 * @returns 페이지 메타데이터입니다.
 */
export function createOpenGraphMetadata({
  path,
  openGraph,
  noIndex = false,
}: CreateOpenGraphMetadataOptions): Metadata {
  const resolvedOpenGraph = resolveOpenGraph(openGraph);
  const pageImage = { alt: resolvedOpenGraph.title, url: resolvedOpenGraph.image };

  return {
    title: { absolute: resolvedOpenGraph.title },
    description: resolvedOpenGraph.description,
    alternates: { canonical: path },
    robots: noIndex ? { follow: false, index: false, noarchive: true } : undefined,
    openGraph: {
      siteName: siteTitle,
      title: resolvedOpenGraph.title,
      description: resolvedOpenGraph.description,
      images: [pageImage],
      locale: "ko_KR",
      url: new URL(path, siteUrl).toString(),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOpenGraph.title,
      description: resolvedOpenGraph.description,
      images: [pageImage],
    },
  };
}

/**
 * ### 오픈그래프 HTML 생성
 *
 * Route Handler에서 링크 프리뷰 봇에 제공할 HTML 문서를 생성합니다.
 *
 * @param path 요청 경로 또는 URL입니다.
 * @param openGraph 링크별 오픈그래프 설정입니다.
 * @returns 오픈그래프 HTML 문서입니다.
 */
export function createOpenGraphHtml(path: string, openGraph?: OpenGraphConfig): string {
  const resolvedOpenGraph = resolveOpenGraph(openGraph);
  const pageUrl = new URL(path, siteUrl).toString();
  const imageUrl = new URL(resolvedOpenGraph.image, siteUrl).toString();

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <title>${escapeHtml(resolvedOpenGraph.title)}</title>
    <meta name="description" content="${escapeHtml(resolvedOpenGraph.description)}" />
    <meta property="og:site_name" content="${escapeHtml(siteTitle)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(resolvedOpenGraph.title)}" />
    <meta property="og:description" content="${escapeHtml(resolvedOpenGraph.description)}" />
    <meta property="og:url" content="${escapeHtml(pageUrl)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(resolvedOpenGraph.title)}" />
    <meta name="twitter:description" content="${escapeHtml(resolvedOpenGraph.description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
  </head>
</html>`;
}

/**
 * ### 목적지 오픈그래프 사용 여부 확인
 *
 * 링크 프리뷰를 목적지 URL에 위임하는 설정인지 확인합니다.
 *
 * `openGraph` 프로퍼티가 없으면 목적지 오픈그래프를 사용합니다.
 *
 * @param openGraph 링크별 오픈그래프 설정입니다.
 * @returns 목적지 오픈그래프 사용 여부입니다.
 */
export function usesDestinationOpenGraph(openGraph?: OpenGraphConfig): openGraph is undefined {
  return openGraph === undefined;
}

/**
 * ### 링크 프리뷰 봇 여부 확인
 *
 * 요청 User-Agent가 검색엔진 또는 링크 프리뷰 봇인지 확인합니다.
 *
 * @param userAgent 요청 User-Agent입니다.
 * @returns 링크 프리뷰 봇 여부입니다.
 */
export function isOpenGraphBot(userAgent: string | null): boolean {
  return botUserAgentPattern.test(userAgent ?? "");
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
