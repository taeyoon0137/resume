/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as stylex from "@stylexjs/stylex";

/**
 * ### 모바일 미디어 쿼리
 *
 * 모바일 화면에 대한 미디어 쿼리를 정의합니다.
 */
const MOBILE = "@media (max-width: 640px)";

/**
 * ### 태블릿 미디어 쿼리
 *
 * 태블릿 화면에 대한 미디어 쿼리를 정의합니다.
 */
const TABLET = "@media (min-width: 640px) and (max-width: 980px)";

/**
 * ### Spaces
 *
 * 전역적으로 사용되는 여백 값들을 정의합니다.
 *
 * @stylex
 */
export const spaces = stylex.defineVars({
  paddingHorizontal: {
    default: "64px",
    [TABLET]: "40px",
    [MOBILE]: "20px",
  },
  paddingVertical: {
    default: "48px",
    [TABLET]: "32px",
    [MOBILE]: "16px",
  },
});
