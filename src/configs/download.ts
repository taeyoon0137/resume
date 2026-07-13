/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { OpenGraphConfig } from "@/utils";

/**
 * ### 다운로드 링크 설정
 *
 * 다운로드 경로에서 제공할 원본 파일과 오픈 그래프 설정입니다.
 */
interface DownloadLink {
  /**
   * ### 원본 파일 경로
   *
   * `src/files`에 있는 다운로드 원본 파일의 경로입니다.
   */
  filePath: string;

  /**
   * ### 오픈 그래프
   *
   * 다운로드 링크에서 사용할 오픈 그래프 설정입니다.
   * 생략한 필드는 사이트 기본값으로 대체합니다.
   */
  openGraph?: OpenGraphConfig;
}

/**
 * ### 간단 다운로드 링크 설정
 *
 * 간단 다운로드 경로의 목적지와 오픈 그래프 설정입니다.
 */
interface SimpleDownloadLink {
  /**
   * ### 목적지
   *
   * 리다이렉트할 정규 다운로드 경로입니다.
   */
  destination: string;

  /**
   * ### 오픈 그래프
   *
   * 간단 다운로드 링크에서 사용할 오픈 그래프 설정입니다.
   * 프로퍼티가 없으면 목적지의 오픈 그래프를 사용하고, 빈 객체면 사이트 기본값을 사용합니다.
   */
  openGraph?: OpenGraphConfig;
}

/**
 * ### 포트폴리오 오픈 그래프
 *
 * 포트폴리오 다운로드 링크에서 사용할 오픈 그래프 설정입니다.
 */
const portfolioOpenGraph = {
  image: "/img_open_graph.png",
  title: "taeyoon. – portfolio",
  description: "Taeyoon Lee as Product Designer",
} as const;

/**
 * ### 비주얼 포트폴리오 오픈 그래프
 *
 * 비주얼 포트폴리오 다운로드 링크에서 사용할 오픈 그래프 설정입니다.
 */
const visualPortfolioOpenGraph = {
  image: "/img_open_graph.png",
  title: "taeyoon. – visual portfolio",
  description: "Taeyoon Lee as Product Designer",
} as const;

/**
 * ### 정규 다운로드 링크
 *
 * 최신 파일을 버전 표기 없이 다운로드하는 경로와 원본 파일을 정의합니다.
 */
export const regularDownloadLinks: Record<string, DownloadLink> = {
  "/download/portfolio": {
    filePath: "src/files/Portfolio – Taeyoon Lee 2026_20260610.pdf",
    openGraph: portfolioOpenGraph,
  },
  "/download/portfolio-product": {
    filePath: "src/files/Portfolio – Taeyoon Lee 2026_20260610.pdf",
    openGraph: portfolioOpenGraph,
  },
  "/download/portfolio-visual": {
    filePath: "src/files/Visual Portfolio – Taeyoon Lee 2026_20260713.pdf",
    openGraph: visualPortfolioOpenGraph,
  },
};

/**
 * ### 구체적 다운로드 링크
 *
 * 특정 버전의 파일을 버전 표기와 함께 다운로드하는 경로와 원본 파일을 정의합니다.
 */
export const specificDownloadLinks: Record<string, DownloadLink> = {
  "/download/portfolio/20260610": {
    filePath: "src/files/Portfolio – Taeyoon Lee 2026_20260610.pdf",
    openGraph: portfolioOpenGraph,
  },
  "/download/portfolio-product/20260610": {
    filePath: "src/files/Portfolio – Taeyoon Lee 2026_20260610.pdf",
    openGraph: portfolioOpenGraph,
  },
  "/download/portfolio-visual/20260713": {
    filePath: "src/files/Visual Portfolio – Taeyoon Lee 2026_20260713.pdf",
    openGraph: visualPortfolioOpenGraph,
  },
};

/**
 * ### 간단 다운로드 링크
 *
 * 짧은 경로에서 정규 다운로드 경로로 연결되는 링크를 정의합니다.
 */
export const simpleDownloadLinks: Record<string, SimpleDownloadLink> = {
  portfolio: { destination: "/download/portfolio" },
  "portfolio/product": { destination: "/download/portfolio-product" },
  "portfolio/visual": { destination: "/download/portfolio-visual" },
};
