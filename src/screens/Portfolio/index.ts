/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PortfolioDownload from "./Portfolio.download";

/**
 * ### Portfolio
 *
 * 포트폴리오 다운로드 페이지입니다.
 */
export const Portfolio = {
  /**
   * ### 다운로드
   *
   * 다운로드를 시작하고 메인 페이지로 이동하는 컴포넌트입니다.
   *
   * @param props {@link PortfolioDownloadProps}
   * @page
   */
  Download: PortfolioDownload,
};

export * from "./Portfolio.type";
