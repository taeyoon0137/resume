/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
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
