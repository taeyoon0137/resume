/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Props } from "@/types";

/**
 * ### SummaryMore 프로퍼티
 *
 * 요약 항목에서 더보기 버튼 컴포넌트의 프로퍼티입니다.
 */
export interface SummaryMoreProps extends Props<HTMLDivElement> {
  /**
   * ### 레이블
   *
   * 버튼에 표시할 레이블 텍스트입니다.
   */
  label: string;

  /**
   * ### 링크
   *
   * 버튼을 누르면 이동할 링크 주소입니다.
   */
  href: string;
}
