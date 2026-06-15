/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { buildDate, siteUrl } from "@/utils";

import type { MetadataRoute } from "next";

/**
 * ### sitemap.xml
 *
 * 검색엔진에 공개할 주요 페이지 목록을 정의합니다.
 *
 * @returns sitemap.xml 설정입니다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/project", "/award", "/license"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: buildDate,
  }));
}
