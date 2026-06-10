/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { MetadataRoute } from "next";

const siteUrl = "https://resume.taeyoon.xyz";

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
  }));
}
