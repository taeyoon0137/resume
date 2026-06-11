/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { MetadataRoute } from "next";

/**
 * ### robots.txt
 *
 * 검색엔진이 포트폴리오 다운로드 URL을 수집하지 않도록 설정합니다.
 *
 * @returns robots.txt 설정입니다.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: ["/portfolio", "/download/portfolio"],
      userAgent: "*",
    },
    sitemap: "https://resume.taeyoon.xyz/sitemap.xml",
  };
}
