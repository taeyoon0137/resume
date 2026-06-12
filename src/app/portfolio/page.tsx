/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Portfolio } from "@/screens";

import type { Metadata } from "next";

import { createPortfolioMetadata } from "@/app/download/portfolio/portfolioMetadata";

/**
 * ### metadata 프로퍼티
 *
 * 포트폴리오 다운로드 페이지의 메타데이터를 정의합니다.
 */
export const metadata: Metadata = createPortfolioMetadata("/portfolio");

/**
 * ### 빠른 포트폴리오 다운로드 페이지
 *
 * 빠른 포트폴리오 다운로드 URL의 페이지입니다.
 * 다운로드를 시작하고 메인 페이지로 이동합니다.
 *
 * @page
 */
const PortfolioPage = () => {
  return <Portfolio.Download />;
};

export default PortfolioPage;
