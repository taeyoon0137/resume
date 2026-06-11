/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
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
