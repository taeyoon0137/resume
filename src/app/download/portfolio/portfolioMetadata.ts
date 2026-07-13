/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createOpenGraphMetadata, type OpenGraphConfig } from "@/utils";

import type { Metadata } from "next";

/**
 * ### 포트폴리오 다운로드 메타데이터 생성
 *
 * 포트폴리오 다운로드 페이지가 공유하는 메타데이터를 생성합니다.
 * 사이트 제목 템플릿을 따르지 않는 고정 제목을 사용하고,
 * 일시적으로만 보이는 페이지이므로 검색엔진 수집을 차단합니다.
 *
 * @param path `/`로 시작하는 페이지 경로입니다.
 * @param openGraph 링크별 오픈그래프 설정입니다.
 * @returns 페이지 메타데이터입니다.
 */
export function createPortfolioMetadata(path: string, openGraph?: OpenGraphConfig): Metadata {
  return createOpenGraphMetadata({ path, openGraph, noIndex: true });
}
