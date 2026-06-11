/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Metadata } from "next";

/**
 * ### 사이트 URL
 *
 * 운영 도메인의 절대 URL입니다.
 */
export const siteUrl = "https://resume.taeyoon.xyz";

/**
 * ### 사이트 제목
 *
 * 루트 페이지의 기본 제목입니다.
 */
export const siteTitle = "taeyoon. – resume";

/**
 * ### 사이트 설명
 *
 * 루트 페이지의 기본 설명입니다.
 */
export const siteDescription = "반갑습니다. Product Designer & FE Engineer(RN)로 활동 중인 이태윤입니다.";

/**
 * ### 페이지 제목 템플릿
 *
 * 서브 페이지 제목 뒤에 붙는 사이트 이름 형식입니다.
 */
export const titleTemplate = "%s – taeyoon. resume";

/**
 * ### 오픈 그래프 이미지
 *
 * 모든 페이지가 공유하는 링크 프리뷰 이미지입니다.
 */
export const openGraphImage = {
  alt: siteTitle,
  height: 630,
  url: "/img_open_graph.png",
  width: 1200,
};

/**
 * ### 페이지 메타데이터 옵션
 *
 * 서브 페이지 메타데이터 생성에 필요한 값입니다.
 */
interface CreatePageMetadataOptions {
  /**
   * ### 페이지 제목
   *
   * 사이트 이름을 제외한 페이지 고유 제목입니다.
   */
  title: string;

  /**
   * ### 페이지 설명
   *
   * 페이지의 설명 텍스트입니다.
   */
  description: string;

  /**
   * ### 페이지 경로
   *
   * `/`로 시작하는 페이지 경로입니다.
   */
  path: string;
}

/**
 * 서브 페이지의 메타데이터를 생성합니다.
 * 루트 layout의 openGraph가 통째로 교체되어 이미지가 누락되지 않도록
 * 오픈 그래프와 트위터 카드 필드를 모두 채워서 반환합니다.
 *
 * @param options {@link CreatePageMetadataOptions}
 * @returns 페이지 메타데이터
 */
export function createPageMetadata({ title, description, path }: CreatePageMetadataOptions): Metadata {
  const fullTitle = titleTemplate.replace("%s", title);
  const pageImage = { ...openGraphImage, alt: `${title} – ${siteTitle}` };

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      siteName: siteTitle,
      title: fullTitle,
      description,
      images: [pageImage],
      locale: "ko_KR",
      url: `${siteUrl}${path}`,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [pageImage],
    },
  };
}
