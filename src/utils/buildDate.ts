/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ### 빌드 시점 날짜
 *
 * next.config.mjs에서 주입한 빌드 시점 날짜입니다.
 * 서버 렌더와 클라이언트 첫 렌더가 같은 값을 사용해
 * hydration 불일치 없이 날짜 의존 값을 계산할 수 있습니다.
 */
export const buildDate = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? Date.now());
