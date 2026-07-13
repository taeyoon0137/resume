/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { OpenGraphConfig } from "@/utils";

interface Shortlink {
  destination: string;

  /** 프로퍼티가 없으면 목적지 오픈그래프를 사용하고, 빈 객체면 사이트 기본값을 사용합니다. */
  openGraph?: OpenGraphConfig;
}

/**
 * ### Shortlink 목록
 *
 * Shortlink 프로퍼티와 리다이렉트 대상 URL을 정의합니다.
 */
export const shortlinks: Record<string, Shortlink> = {
  vendit: { destination: "https://www.vendit.co.kr" },
  whatssub: { destination: "https://whatssub.co" },
  resume: { destination: "https://resume.taeyoon.xyz", openGraph: {} },
  github: { destination: "https://github.com/taeyoon0137" },
  portfolio: { destination: "https://resume.taeyoon.xyz/portfolio" },
  "portfolio-product": {
    destination: "https://resume.taeyoon.xyz/portfolio/product",
  },
  "portfolio-visual": {
    destination: "https://resume.taeyoon.xyz/portfolio/visual",
  },
};
