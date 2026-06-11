/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ### PageEmpty 프로퍼티
 *
 * 그라디언트 배경 위에 안내 텍스트와 홈 버튼을 표시하는
 * 비어있는 상태 페이지 컴포넌트의 프로퍼티입니다.
 */
export interface PageEmptyProps {
  /**
   * ### 제목
   *
   * 화면 중앙에 표시할 큰 안내 텍스트입니다.
   */
  title: string;

  /**
   * ### 설명
   *
   * 제목 아래에 표시할 보조 안내 텍스트입니다.
   */
  description?: string;

  /**
   * ### 홈 버튼 라벨
   *
   * 하단 버튼의 텍스트입니다.
   */
  homeLabel?: string;
}
