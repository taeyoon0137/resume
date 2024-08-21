/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Props } from "@/types";

/**
 * ### ProjectItem 프로퍼티
 *
 * 각 프로젝트 요소를 표현하는 컴포넌트의 프로퍼티입니다.
 */
export interface ProjectItemProps extends Props<HTMLDivElement, "children" | "summary"> {
  /**
   * ### 프로젝트 제목
   *
   * 프로젝트의 제목 텍스트입니다.
   */
  title: string;

  /**
   * ### 프로젝트 직책
   *
   * 프로젝트에서 맡은 직책입니다.
   */
  role?: string;

  /**
   * ### 소속 기관
   *
   * 프로젝트를 진행한 기관입니다.
   */
  organization?: {
    /**
     * ### 기관 이름
     *
     * 기관의 이름입니다.
     */
    name: string;

    /**
     * ### 기관 링크
     *
     * 기관에 대해 자세한 내용을 확인할 수 있는 링크입니다.
     */
    link?: string;
  };

  /**
   * ## 기술 스택
   *
   * 해당 프로젝트에 사용된 기술 스택입니다.
   */
  techStacks?: string[];

  /**
   * ### 프로젝트 썸네일
   *
   * 프로젝트 썸네일 이미지입니다.
   */
  thumbnail?: any;

  /**
   * ### 프로젝트 요약
   *
   * 프로젝트에 대한 요약 내용입니다.
   */
  summary?: string[];

  /**
   * ### 프로젝트 상세
   *
   * 프로젝트 상세 내용을 작성한 내용입니다.
   */
  details?: string;

  /**
   * ### 프로젝트 기간
   *
   * 프로젝트를 진행했던 기간입니다.
   */
  period?: string;

  /**
   * ### 프로젝트 투입 시간
   *
   * 프로젝트에 투입한 시간입니다.
   */
  duration?: string;

  /**
   * ### 프로젝트 링크
   *
   * 프로젝트에 대해 자세한 내용을 확인할 수 있는 링크입니다.
   */
  link?: string;
}
