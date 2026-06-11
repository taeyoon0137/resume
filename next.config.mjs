/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylexPlugin from "@stylexjs/nextjs-plugin";

const __dirname = new URL(".", import.meta.url).pathname;

const portfolioFilePath = "./downloads/portfolio/20260610.pdf";

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
  outputFileTracingRoot: __dirname,
  outputFileTracingIncludes: {
    "/download/portfolio/20260610": [portfolioFilePath],
    "/download/portfolio": [portfolioFilePath],
    "/portfolio": [portfolioFilePath],
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
