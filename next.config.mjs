/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylexPlugin from "@stylexjs/nextjs-plugin";

const __dirname = new URL(".", import.meta.url).pathname;

const portfolioPath = "/Portfolio%20%E2%80%93%20Taeyoon%20Lee%202026.pdf";

/**
 * ### Next.js 설정
 *
 * Next.js 설정을 지정합니다.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  async headers() {
    return [
      {
        source: "/portfolio",
        headers: [
          {
            key: "Content-Disposition",
            value:
              "attachment; filename=\"Portfolio - Taeyoon Lee 2026.pdf\"; filename*=UTF-8''Portfolio%20%E2%80%93%20Taeyoon%20Lee%202026.pdf",
          },
          {
            key: "Content-Type",
            value: "application/pdf",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/portfolio",
        destination: portfolioPath,
      },
    ];
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
export default stylexPlugin({ rootDir: __dirname })(nextConfig);
