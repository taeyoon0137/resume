/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../styles/css/globals.css";

import type { LayoutProps } from "@/types";
import type { Metadata, Viewport } from "next";

/**
 * ### metadata 프로퍼티
 *
 * 페이지의 메타데이터를 정의합니다.
 */
export const metadata: Metadata = {
  title: "taeyoon. – resume",
  description: "반갑습니다. Product Designer & FE Engineer(RN)로 활동 중인 이태윤입니다.",
  icons: [
    { rel: "apple-touch-icon", sizes: "57x57", url: "/favicon/apple-icon-57x57.png" },
    { rel: "apple-touch-icon", sizes: "60x60", url: "/favicon/apple-icon-60x60.png" },
    { rel: "apple-touch-icon", sizes: "72x72", url: "/favicon/apple-icon-72x72.png" },
    { rel: "apple-touch-icon", sizes: "76x76", url: "/favicon/apple-icon-76x76.png" },
    { rel: "apple-touch-icon", sizes: "114x114", url: "/favicon/apple-icon-114x114.png" },
    { rel: "apple-touch-icon", sizes: "120x120", url: "/favicon/apple-icon-120x120.png" },
    { rel: "apple-touch-icon", sizes: "144x144", url: "/favicon/apple-icon-144x144.png" },
    { rel: "apple-touch-icon", sizes: "152x152", url: "/favicon/apple-icon-152x152.png" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/favicon/apple-icon-180x180.png" },
    { rel: "icon", type: "image/png", sizes: "192x192", url: "/favicon/android-icon-192x192.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon/favicon-96x96.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon/favicon-16x16.png" },
    { rel: "icon", type: "image/png", sizes: "36x36", url: "/favicon/android-icon-36x36.png" },
    { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon/android-icon-48x48.png" },
    { rel: "icon", type: "image/png", sizes: "72x72", url: "/favicon/android-icon-72x72.png" },
    { rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon/android-icon-96x96.png" },
    { rel: "icon", type: "image/png", sizes: "144x144", url: "/favicon/android-icon-144x144.png" },
    { rel: "icon", type: "image/png", sizes: "192x192", url: "/favicon/android-icon-192x192.png" },
  ],
};

/**
 * ### viewport 프로퍼티
 *
 * 페이지의 뷰포트를 정의합니다.
 */
export const viewport: Viewport = {
  themeColor: "#000000",
};

/**
 * ### RootLayout
 *
 * 루트 레이아웃을 정의합니다.
 * 이 레이아웃은 모든 화면에 적용됩니다.
 *
 * @param props {LayoutProps}
 * @component
 */
const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="kr">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
