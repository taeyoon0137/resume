/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ### Named Link 목록
 *
 * 이름을 붙여 자주 사용되는 링크 목록입니다.
 */
const namedLinks: Record<string, string> = {
  vendit: "https://www.vendit.co.kr",
  whatssub: "https://whatssub.co",
  resume: "https://resume.taeyoon.xyz",
  github: "https://github.com/taeyoon0137",
  portfolio: "https://resume.taeyoon.xyz/portfolio",
  "portfolio-product": "https://resume.taeyoon.xyz/portfolio/product",
  "portfolio-visual": "https://resume.taeyoon.xyz/portfolio/visual",
};

/**
 * ### Unnamed Links 목록
 *
 * 단순 URL 축약을 위해 제공되는 링크 목록입니다.
 */
const unnamedLinks: Record<string, string> = {};

/**
 * ### Shortlink 목록
 *
 * Shortlink 프로퍼티와 리다이렉트 대상 URL을 정의합니다.
 */
export const shortlinks: Record<string, string> = {
  ...namedLinks,
  ...unnamedLinks,
};
