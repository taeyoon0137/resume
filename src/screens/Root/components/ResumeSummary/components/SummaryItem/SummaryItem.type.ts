/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Props } from "@/types";

/**
 * ### SummaryItem 프로퍼티
 *
 * 요약 항목을 표시하는 컴포넌트의 프로퍼티입니다.
 */
export interface SummaryItemProps extends Props<HTMLDivElement, "title" | "children"> {
  /**
   * ### 제목
   *
   * 요약 항목의 제목입니다.
   */
  title?: React.ReactNode;

  /**
   * ### 정보
   *
   * 요약 항목의 정보입니다.
   */
  info: React.ReactNode;

  /**
   * ### 캡션
   *
   * 요약 항목의 캡션입니다.
   */
  caption: React.ReactNode;

  /**
   * ### 링크
   *
   * 요약 항목의 링크입니다.
   */
  link?: string;
}
