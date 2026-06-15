/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../styles/css/globals.css";

import { Root } from "@/screens";
import { LayoutProps } from "@/types";
import { openGraphImage, siteDescription, siteTitle, siteUrl, titleTemplate } from "@/utils";

import type { Metadata, Viewport } from "next";

/**
 * ### metadata 프로퍼티
 *
 * 페이지의 메타데이터를 정의합니다.
 */
export const metadata: Metadata = {
  // 베이스 경로
  metadataBase: new URL(siteUrl),

  // 기본 메타 태그
  title: {
    default: siteTitle,
    template: titleTemplate,
  },
  description: siteDescription,
  applicationName: siteTitle,
  authors: [{ name: "Taeyoon Lee", url: "https://taeyoon.xyz" }],
  creator: "Taeyoon Lee",

  // 대체 URL
  alternates: {
    canonical: "/",
  },

  // 검색 엔진
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },

  // 오픈 그래프
  openGraph: {
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [openGraphImage],
    locale: "ko_KR",
    url: siteUrl,
  },

  // 트위터 카드
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [openGraphImage],
  },

  // 파비콘 설정
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
  ],
};

/**
 * ### viewport 프로퍼티
 *
 * 페이지의 뷰포트를 정의합니다.
 */
export const viewport: Viewport = {
  initialScale: 1.0,
  // 배경 그라디언트는 라이트/다크가 동일하므로 그 시작색을 상단 바 색으로 사용합니다.
  // 값은 content.style.backgrounds[0]의 기본값과 일치시킵니다.
  themeColor: "#77E4C8",
};

/**
 * ### RootLayout
 *
 * 루트 레이아웃을 정의합니다.
 * 이 레이아웃은 모든 화면에 적용됩니다.
 *
 * @param props {@link LayoutProps}<["@modal"]>
 * @component
 */
const RootLayout = ({ ...props }: LayoutProps<["@modal"]>) => {
  return <Root.Layout {...props} />;
};

export default RootLayout;
