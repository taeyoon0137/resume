/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Props } from "@/types";

export interface SeparatorProps extends Props<HTMLHRElement> {
  /**
   * ### 상하단 여백
   *
   * 구분선의 상하단 여백을 설정합니다.
   *
   * @default 20
   */
  margin?: number;
}
