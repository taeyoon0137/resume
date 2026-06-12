/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ### 분석 이벤트 맵
 *
 * 추적할 분석 이벤트의 이름과 프로퍼티 형태를 정의합니다.
 * 이벤트 이름을 키로, 프로퍼티 형태를 값으로 선언하며, 프로퍼티가 없는 이벤트는 never로 선언합니다.
 */
export interface AnalyticsEventMap {
  /**
   * ### 모든 항목 보기 활성화
   *
   * 이력서 전체 내용을 펼쳐서 본 경우입니다.
   */
  ['All Resume Revealed']: never;

  /**
   * ### 모든 항목 숨김 활성화
   *
   * 이력서 전체 내용을 접어서 본 경우입니다.
   */
  ['All Resume Hidden']: never;

  /**
   * ### 링크 클릭
   *
   * 이력서 내의 링크를 클릭한 경우입니다.
   */
  ['Link Clicked']: Pick<AnalyticsParametersMap, 'URL' | 'Text'>;

  /**
   * ### 버튼 클릭
   *
   * 특정 버튼을 클릭한 경우입니다.
   */
  ['Button Clicked']: Pick<AnalyticsParametersMap, 'Text'>

  /**
   * ### 파일 다운로드
   *
   * 다운로드 페이지에서 파일 다운로드를 시작한 경우입니다.
   */
  ['File Downloaded']: Pick<AnalyticsParametersMap, 'URL'>;
};

/**
 * ### 분석 이벤트 파라미터 맵
 *
 * 분석 이벤트에 필요한 프로퍼티의 형태를 정의합니다.
 */
export interface AnalyticsParametersMap {
  /**
   * ### 텍스트
   * 
   * 특정 요소를 구분할 수 있는 버튼 텍스트 혹은 콘텐츠 제목 등입니다.
   */
  Text: string;

  /**
   * ### 링크 주소
   * 
   * 이동하거나 다운로드한 링크의 주소입니다.
   */
  URL: string;
}