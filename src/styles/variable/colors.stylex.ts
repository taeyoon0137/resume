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

const lightColors = {
  backgroundSolidElevate: "#7070700a",
  backgroundSolidCommon: "#ffffffff",
  contentGrayA0: "#000000e5",
  contentGrayA1: "#000000ce",
  contentGrayA2: "#00000066",
  contentGrayA3: "#00000030",
  contentGrayA4: "#00000011",
  contentGrayA5: "#00000000",
  contentWhiteA0: "#ffffffff",
  contentWhiteA1: "#fffffff7",
  contentWhiteA2: "#ffffff7f",
  contentWhiteA3: "#ffffff3f",
  contentWhiteA4: "#ffffff11",
  contentWhiteA5: "#ffffff00",
  contentBlackA0: "#000000e5",
  contentBlackA1: "#000000ce",
  contentBlackA2: "#00000066",
  contentBlackA3: "#00000030",
  contentBlackA4: "#00000011",
  contentBlackA5: "#00000000",
  contentInvertA0: "#ffffffff",
  contentInvertA1: "#fffffff7",
  contentInvertA2: "#ffffff7f",
  contentInvertA3: "#ffffff3f",
  contentInvertA4: "#ffffff11",
  contentInvertA5: "#ffffff00",
  contentTintBlueA1: "#0404fcff",
  contentTintBlueA2: "#0404fc66",
  contentTintBlueA3: "#0404fc30",
  contentTintBlueA4: "#0404fc19",
  contentTintBlueA5: "#0404fc00",
  contentTintPurpleA1: "#602accff",
  contentTintPurpleA2: "#602acc66",
  contentTintPurpleA3: "#602acc30",
  contentTintPurpleA4: "#602acc19",
  contentTintPurpleA5: "#602acc00",
  lineOutline: "#0000000a",
  backgroundDimModal: "#0000007f",
  backgroundDimPressCommon: "#00000030",
  backgroundDimLoadCommon: "#ffffff51",
  backgroundDimPressAccent: "#00000051",
  backgroundDimLoadAccent: "#ffffff7f",
  lineSeparatorStroke: "#00000011",
  lineSeparatorFill: "#00000011",
} as const;

const darkColors = {
  backgroundSolidElevate: "#70707011",
  backgroundSolidCommon: "#1e1e1eff",
  contentGrayA0: "#ffffffff",
  contentGrayA1: "#fffffff7",
  contentGrayA2: "#ffffff7f",
  contentGrayA3: "#ffffff3f",
  contentGrayA4: "#ffffff11",
  contentGrayA5: "#ffffff00",
  contentWhiteA0: "#ffffffff",
  contentWhiteA1: "#fffffff7",
  contentWhiteA2: "#ffffff7f",
  contentWhiteA3: "#ffffff3f",
  contentWhiteA4: "#ffffff11",
  contentWhiteA5: "#ffffff00",
  contentBlackA0: "#000000e5",
  contentBlackA1: "#000000ce",
  contentBlackA2: "#00000066",
  contentBlackA3: "#00000030",
  contentBlackA4: "#00000011",
  contentBlackA5: "#00000000",
  contentInvertA0: "#000000e5",
  contentInvertA1: "#000000ce",
  contentInvertA2: "#00000066",
  contentInvertA3: "#00000030",
  contentInvertA4: "#00000011",
  contentInvertA5: "#00000000",
  contentTintBlueA1: "#3c4ffeff",
  contentTintBlueA2: "#3c4ffe66",
  contentTintBlueA3: "#3c4ffe30",
  contentTintBlueA4: "#3c4ffe19",
  contentTintBlueA5: "#3c4ffe00",
  contentTintPurpleA1: "#6d3cd0ff",
  contentTintPurpleA2: "#6d3cd066",
  contentTintPurpleA3: "#6d3cd030",
  contentTintPurpleA4: "#6d3cd019",
  contentTintPurpleA5: "#6d3cd000",
  lineOutline: "#ffffff0a",
  backgroundDimModal: "#0000007f",
  backgroundDimPressCommon: "#00000030",
  backgroundDimLoadCommon: "#ffffff19",
  backgroundDimPressAccent: "#00000051",
  backgroundDimLoadAccent: "#ffffff30",
  lineSeparatorStroke: "#ffffff11",
  lineSeparatorFill: "#ffffff11",
} as const;

/**
 * ### 색상
 *
 * 컬러 시스템을 정의합니다.
 */
export const colors = stylex.defineVars({
  backgroundSolidElevate: {
    default: lightColors.backgroundSolidElevate,
    [DARK]: darkColors.backgroundSolidElevate,
  },
  backgroundSolidCommon: {
    default: lightColors.backgroundSolidCommon,
    [DARK]: darkColors.backgroundSolidCommon,
  },
  contentGrayA0: {
    default: lightColors.contentGrayA0,
    [DARK]: darkColors.contentGrayA0,
  },
  contentGrayA1: {
    default: lightColors.contentGrayA1,
    [DARK]: darkColors.contentGrayA1,
  },
  contentGrayA2: {
    default: lightColors.contentGrayA2,
    [DARK]: darkColors.contentGrayA2,
  },
  contentGrayA3: {
    default: lightColors.contentGrayA3,
    [DARK]: darkColors.contentGrayA3,
  },
  contentGrayA4: {
    default: lightColors.contentGrayA4,
    [DARK]: darkColors.contentGrayA4,
  },
  contentGrayA5: {
    default: lightColors.contentGrayA5,
    [DARK]: darkColors.contentGrayA5,
  },
  contentWhiteA0: {
    default: lightColors.contentWhiteA0,
    [DARK]: darkColors.contentWhiteA0,
  },
  contentWhiteA1: {
    default: lightColors.contentWhiteA1,
    [DARK]: darkColors.contentWhiteA1,
  },
  contentWhiteA2: {
    default: lightColors.contentWhiteA2,
    [DARK]: darkColors.contentWhiteA2,
  },
  contentWhiteA3: {
    default: lightColors.contentWhiteA3,
    [DARK]: darkColors.contentWhiteA3,
  },
  contentWhiteA4: {
    default: lightColors.contentWhiteA4,
    [DARK]: darkColors.contentWhiteA4,
  },
  contentWhiteA5: {
    default: lightColors.contentWhiteA5,
    [DARK]: darkColors.contentWhiteA5,
  },
  contentBlackA0: {
    default: lightColors.contentBlackA0,
    [DARK]: darkColors.contentBlackA0,
  },
  contentBlackA1: {
    default: lightColors.contentBlackA1,
    [DARK]: darkColors.contentBlackA1,
  },
  contentBlackA2: {
    default: lightColors.contentBlackA2,
    [DARK]: darkColors.contentBlackA2,
  },
  contentBlackA3: {
    default: lightColors.contentBlackA3,
    [DARK]: darkColors.contentBlackA3,
  },
  contentBlackA4: {
    default: lightColors.contentBlackA4,
    [DARK]: darkColors.contentBlackA4,
  },
  contentBlackA5: {
    default: lightColors.contentBlackA5,
    [DARK]: darkColors.contentBlackA5,
  },
  contentInvertA0: {
    default: lightColors.contentInvertA0,
    [DARK]: darkColors.contentInvertA0,
  },
  contentInvertA1: {
    default: lightColors.contentInvertA1,
    [DARK]: darkColors.contentInvertA1,
  },
  contentInvertA2: {
    default: lightColors.contentInvertA2,
    [DARK]: darkColors.contentInvertA2,
  },
  contentInvertA3: {
    default: lightColors.contentInvertA3,
    [DARK]: darkColors.contentInvertA3,
  },
  contentInvertA4: {
    default: lightColors.contentInvertA4,
    [DARK]: darkColors.contentInvertA4,
  },
  contentInvertA5: {
    default: lightColors.contentInvertA5,
    [DARK]: darkColors.contentInvertA5,
  },
  contentTintBlueA1: {
    default: lightColors.contentTintBlueA1,
    [DARK]: darkColors.contentTintBlueA1,
  },
  contentTintBlueA2: {
    default: lightColors.contentTintBlueA2,
    [DARK]: darkColors.contentTintBlueA2,
  },
  contentTintBlueA3: {
    default: lightColors.contentTintBlueA3,
    [DARK]: darkColors.contentTintBlueA3,
  },
  contentTintBlueA4: {
    default: lightColors.contentTintBlueA4,
    [DARK]: darkColors.contentTintBlueA4,
  },
  contentTintBlueA5: {
    default: lightColors.contentTintBlueA5,
    [DARK]: darkColors.contentTintBlueA5,
  },
  contentTintPurpleA1: {
    default: lightColors.contentTintPurpleA1,
    [DARK]: darkColors.contentTintPurpleA1,
  },
  contentTintPurpleA2: {
    default: lightColors.contentTintPurpleA2,
    [DARK]: darkColors.contentTintPurpleA2,
  },
  contentTintPurpleA3: {
    default: lightColors.contentTintPurpleA3,
    [DARK]: darkColors.contentTintPurpleA3,
  },
  contentTintPurpleA4: {
    default: lightColors.contentTintPurpleA4,
    [DARK]: darkColors.contentTintPurpleA4,
  },
  contentTintPurpleA5: {
    default: lightColors.contentTintPurpleA5,
    [DARK]: darkColors.contentTintPurpleA5,
  },
  lineOutline: {
    default: lightColors.lineOutline,
    [DARK]: darkColors.lineOutline,
  },
  backgroundDimModal: {
    default: lightColors.backgroundDimModal,
    [DARK]: darkColors.backgroundDimModal,
  },
  backgroundDimPressCommon: {
    default: lightColors.backgroundDimPressCommon,
    [DARK]: darkColors.backgroundDimPressCommon,
  },
  backgroundDimLoadCommon: {
    default: lightColors.backgroundDimLoadCommon,
    [DARK]: darkColors.backgroundDimLoadCommon,
  },
  backgroundDimPressAccent: {
    default: lightColors.backgroundDimPressAccent,
    [DARK]: darkColors.backgroundDimPressAccent,
  },
  backgroundDimLoadAccent: {
    default: lightColors.backgroundDimLoadAccent,
    [DARK]: darkColors.backgroundDimLoadAccent,
  },
  lineSeparatorStroke: {
    default: lightColors.lineSeparatorStroke,
    [DARK]: darkColors.lineSeparatorStroke,
  },
  lineSeparatorFill: {
    default: lightColors.lineSeparatorFill,
    [DARK]: darkColors.lineSeparatorFill,
  },
});

/**
 * ### 라이트 테마
 *
 * 시스템 설정과 무관하게 라이트 모드 색상을 적용합니다.
 */
export const lightTheme = stylex.createTheme(colors, lightColors);

/**
 * ### 다크 테마
 *
 * 시스템 설정과 무관하게 다크 모드 색상을 적용합니다.
 */
export const darkTheme = stylex.createTheme(colors, darkColors);
