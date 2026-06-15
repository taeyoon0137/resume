/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { siteDescription, siteTitle } from "@/utils";

import type { MetadataRoute } from "next";

/**
 * ### manifest.webmanifest
 *
 * 웹 앱 설치 시 사용할 이름, 색상, 아이콘 정보를 정의합니다.
 *
 * @returns 웹 앱 매니페스트 설정입니다.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle,
    short_name: "taeyoon.",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#77E4C8",
    icons: [
      {
        src: "/favicon/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon/android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
