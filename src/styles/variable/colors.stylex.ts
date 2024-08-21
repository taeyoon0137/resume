/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as stylex from "@stylexjs/stylex";

/**
 * ### 미디어 쿼리
 *
 * 다크모드용 미디어 쿼리를 정의합니다.
 */
const DARK = "@media (prefers-color-scheme: dark)";

/**
 * ### 색상
 *
 * 컬러 시스템을 정의합니다.
 */
export const colors = stylex.defineVars({
  backgroundSolidElevate: {
    default: "#7070700a",
    [DARK]: "#70707011",
  },
  backgroundSolidCommon: {
    default: "#ffffffff",
    [DARK]: "#1e1e1eff",
  },
  contentGrayA0: {
    default: "#000000e5",
    [DARK]: "#ffffffff",
  },
  contentGrayA1: {
    default: "#000000ce",
    [DARK]: "#fffffff7",
  },
  contentGrayA2: {
    default: "#00000066",
    [DARK]: "#ffffff7f",
  },
  contentGrayA3: {
    default: "#00000030",
    [DARK]: "#ffffff3f",
  },
  contentGrayA4: {
    default: "#00000011",
    [DARK]: "#ffffff11",
  },
  contentGrayA5: {
    default: "#00000000",
    [DARK]: "#fffffff7",
  },
  contentWhiteA0: {
    default: "#ffffffff",
    [DARK]: "#ffffffff",
  },
  contentWhiteA1: {
    default: "#fffffff7",
    [DARK]: "#fffffff7",
  },
  contentWhiteA2: {
    default: "#ffffff7f",
    [DARK]: "#ffffff7f",
  },
  contentWhiteA3: {
    default: "#ffffff3f",
    [DARK]: "#ffffff3f",
  },
  contentWhiteA4: {
    default: "#ffffff11",
    [DARK]: "#ffffff11",
  },
  contentWhiteA5: {
    default: "#ffffff00",
    [DARK]: "#ffffff00",
  },
  contentBlackA0: {
    default: "#000000e5",
    [DARK]: "#000000e5",
  },
  contentBlackA1: {
    default: "#000000ce",
    [DARK]: "#000000ce",
  },
  contentBlackA2: {
    default: "#00000066",
    [DARK]: "#00000066",
  },
  contentBlackA3: {
    default: "#00000030",
    [DARK]: "#00000030",
  },
  contentBlackA4: {
    default: "#00000011",
    [DARK]: "#00000011",
  },
  contentBlackA5: {
    default: "#00000000",
    [DARK]: "#00000000",
  },
  contentInvertA0: {
    default: "#ffffffff",
    [DARK]: "#000000e5",
  },
  contentInvertA1: {
    default: "#fffffff7",
    [DARK]: "#000000ce",
  },
  contentInvertA2: {
    default: "#ffffff7f",
    [DARK]: "#00000066",
  },
  contentInvertA3: {
    default: "#ffffff3f",
    [DARK]: "#00000030",
  },
  contentInvertA4: {
    default: "#ffffff11",
    [DARK]: "#00000011",
  },
  contentInvertA5: {
    default: "#ffffff00",
    [DARK]: "#00000000",
  },
  contentTintBlueA1: {
    default: "#0404fcff",
    [DARK]: "#3c4ffeff",
  },
  contentTintBlueA2: {
    default: "#0404fc66",
    [DARK]: "#3c4ffe66",
  },
  contentTintBlueA3: {
    default: "#0404fc30",
    [DARK]: "#3c4ffe30",
  },
  contentTintBlueA4: {
    default: "#0404fc19",
    [DARK]: "#3c4ffe19",
  },
  contentTintBlueA5: {
    default: "#0404fc00",
    [DARK]: "#3c4ffe00",
  },
  contentTintPurpleA1: {
    default: "#602accff",
    [DARK]: "#6d3cd0ff",
  },
  contentTintPurpleA2: {
    default: "#602acc66",
    [DARK]: "#6d3cd066",
  },
  contentTintPurpleA3: {
    default: "#602acc30",
    [DARK]: "#6d3cd030",
  },
  contentTintPurpleA4: {
    default: "#602acc19",
    [DARK]: "#6d3cd019",
  },
  contentTintPurpleA5: {
    default: "#602acc00",
    [DARK]: "#6d3cd000",
  },
  lineOutline: {
    default: "#0000000a",
    [DARK]: "#ffffff0a",
  },
  backgroundDimModal: {
    default: "#0000007f",
    [DARK]: "#0000007f",
  },
  backgroundDimPressCommon: {
    default: "#00000030",
    [DARK]: "#00000030",
  },
  backgroundDimLoadCommon: {
    default: "#ffffff51",
    [DARK]: "#ffffff19",
  },
  backgroundDimPressAccent: {
    default: "#00000051",
    [DARK]: "#00000051",
  },
  backgroundDimLoadAccent: {
    default: "#ffffff7f",
    [DARK]: "#ffffff30",
  },
  lineSeparatorStroke: {
    default: "#00000011",
    [DARK]: "#ffffff11",
  },
  lineSeparatorFill: {
    default: "#00000011",
    [DARK]: "#ffffff11",
  },
});
