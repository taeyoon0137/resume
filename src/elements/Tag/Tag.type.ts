/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Props } from "@/types";

/**
 * ### 태그 프로퍼티
 *
 * 태그 컴포넌트에 필요한 프로퍼티입니다.
 */
export interface TagProps extends Props<HTMLDivElement, "children"> {
  /**
   * ### 레이블
   *
   * 태그에 표시할 레이블 텍스트입니다.
   */
  label: string;

  /**
   * ### 태그 종류
   *
   * 태그의 종류를 지정합니다.
   */
  kind?: "primary" | "secondary";

  /**
   * ### 클릭 가능 여부
   *
   * 태그를 클릭 가능하게 할지 여부입니다.
   */
  pressable?: boolean;
}
