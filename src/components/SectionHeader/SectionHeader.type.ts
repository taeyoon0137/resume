/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Props } from "@/types";

/**
 * ### SectionHeader 프로퍼티
 *
 * 섹션 헤더 컴포넌트의 프로퍼티입니다.
 */
export interface SectionHeaderProps extends Props<HTMLDivElement, "children"> {
  /**
   * ### 섹션 헤더 제목
   *
   * 섹션 헤더의 제목 텍스트입니다.
   */
  title: string;
}
