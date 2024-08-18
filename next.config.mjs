/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylexPlugin from "@stylexjs/nextjs-plugin";

/**
 * ### Next.js 설정
 *
 * Next.js 설정을 지정합니다.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {};

/**
 * ### StyleX 플러그인 설정
 *
 * StyleX 플러그인 설정을 지정합니다.
 */
const __dirname = new URL(".", import.meta.url).pathname;

// StyleX 플러그인 설정을 적용합니다.
export default stylexPlugin({ rootDir: __dirname })(nextConfig);
