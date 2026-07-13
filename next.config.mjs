/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylexPlugin from "@stylexjs/nextjs-plugin";

const __dirname = new URL(".", import.meta.url).pathname;

// Content-Security-Policy 후보 정책입니다.
// 인라인 스크립트(테마 초기화, 구조화 데이터)와 GA gtag, StyleX 스타일 주입 때문에
// script/style에는 'unsafe-inline'이 필요합니다. 우선 Report-Only로 적용해
// 실제 차단 없이 위반을 수집하며 정책을 검증합니다.
// 허용 출처: GA(googletagmanager.com, *.google-analytics.com), Amplitude(*.amplitude.com),
// Pretendard 폰트/CSS(cdn.jsdelivr.net). 이미지·OG·썸네일은 모두 자체 호스팅입니다.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
  "font-src 'self' https://cdn.jsdelivr.net data:",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.amplitude.com",
  "frame-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
].join("; ");
/**
 * ### Next.js 설정
 *
 * Next.js 설정을 지정합니다.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    // 빌드 시점 날짜를 서버와 클라이언트 번들에 동일하게 주입합니다.
    // 재직 기간 등 날짜 의존 값의 hydration 기준값으로 사용됩니다.
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy },
        ],
      },
    ];
  },
  outputFileTracingRoot: __dirname,
  outputFileTracingIncludes: {
    "/download/**": ["./src/files/*"],
  },
  outputFileTracingExcludes: {
    "/download/**": ["./src/files/.DS_Store"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

/**
 * ### StyleX 플러그인 설정
 *
 * StyleX 플러그인 설정을 지정합니다.
 */
// StyleX 플러그인 설정을 적용합니다.
export default stylexPlugin({
  rootDir: __dirname,
  babelConfig: {
    babelrc: false,
  },
})(nextConfig);
