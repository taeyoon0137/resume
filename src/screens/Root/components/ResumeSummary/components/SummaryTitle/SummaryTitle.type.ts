/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Props } from "@/types";

/**
 * ### SummaryTitle 프로퍼티
 *
 * 요약 제목을 표시하는 컴포넌트의 프로퍼티입니다.
 */
export interface SummaryTitleProps extends Props<HTMLHeadingElement, "children"> {
  /**
   * ### 제목
   *
   * 제목 텍스트입니다.
   */
  title: string;
}
