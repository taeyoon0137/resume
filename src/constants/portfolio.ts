/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import portfolio from "./portfolioVersion.json";

/**
 * ### 포트폴리오 날짜 세그먼트
 *
 * 현재 제공하는 포트폴리오 PDF의 날짜 버전입니다.
 * 값 출처는 `portfolio.json`이며, Node ESM(next.config.mjs)도 같은 JSON을 읽습니다.
 * App Router 라우트 디렉터리명(`download/portfolio/20260610`)은 정적 세그먼트라
 * 이 값과 일치하도록 수동으로 맞춥니다.
 */
export const PORTFOLIO_DATE = portfolio.date;

/**
 * ### 포트폴리오 PDF 파일명
 *
 * `downloads/portfolio/` 아래에 위치하는 PDF 파일명입니다.
 */
export const PORTFOLIO_FILE_NAME = `${PORTFOLIO_DATE}.pdf`;

/**
 * ### 포트폴리오 다운로드 경로
 *
 * 날짜 버전 PDF를 내려받는 라우트 경로입니다.
 */
export const PORTFOLIO_DOWNLOAD_PATH = `/download/portfolio/${PORTFOLIO_DATE}`;
