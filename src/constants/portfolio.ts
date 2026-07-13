/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { regularDownloadLinks, specificDownloadLinks } from "@/configs";

const portfolioRegularDownloadPath = "/download/portfolio";
const portfolioLink = regularDownloadLinks[portfolioRegularDownloadPath];
const portfolioSpecificDownloadPath = Object.entries(specificDownloadLinks).find(
  ([path, link]) => path.startsWith(`${portfolioRegularDownloadPath}/`) && link.filePath === portfolioLink.filePath,
)?.[0];

if (!portfolioSpecificDownloadPath) {
  throw new Error("포트폴리오 구체적 다운로드 링크를 찾을 수 없습니다.");
}

/**
 * ### 포트폴리오 다운로드 경로
 *
 * 정규 다운로드 페이지에서 버전 표기 없이 파일을 내려받는 내부 경로입니다.
 */
export const PORTFOLIO_DOWNLOAD_PATH = `${portfolioSpecificDownloadPath}?regular=1`;
