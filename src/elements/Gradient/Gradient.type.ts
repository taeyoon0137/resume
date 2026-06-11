/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Particle } from "./classes";
import type { Props } from "@/types";

/**
 * ### Gradient 프로퍼티
 *
 * Gradient 컴포넌트의 프로퍼티를 정의합니다.
 */
export interface GradientProps extends Props<HTMLCanvasElement> {
  /**
   * ### 그라디언트 색상
   *
   * 그라디언트로 사용할 색상을 정의합니다.
   */
  colors: string[];
}

/**
 * ### 캔버스 설정
 *
 * 캔버스의 설정을 정의합니다.
 * ref를 통해 공유하되, 리렌더를 발생시키지 않도록 합니다.
 */
export interface CanvasConfig {
  /**
   * ### 픽셀 비율
   *
   * 실제 픽셀 대비 렌더링 픽셀 비율을 정의합니다.
   */
  pixelRatio: number;

  /**
   * ### 캔버스 너비
   *
   * 렌더링 될 캔버스의 너비를 정의합니다.
   */
  canvasWidth: number;

  /**
   * ### 캔버스 높이
   *
   * 렌더링 될 캔버스의 높이를 정의합니다.
   */
  canvasHeight: number;

  /**
   * ### 입자 배열
   *
   * 렌더링 되고 있는 입자의 배열을 기록합니다.
   */
  particles: Particle[];

  /**
   * ### 최소 반지름
   *
   * 입자의 최소 반지름을 정의합니다.
   */
  minRadius: number;

  /**
   * ### 최대 반지름
   *
   * 입자의 최대 반지름을 정의합니다.
   */
  maxRadius: number;

  /**
   * ### 애니메이션 프레임 ID
   *
   * 현재 실행 중인 requestAnimationFrame의 ID를 기록합니다.
   * 클린업 시 이 ID를 사용하여 프레임 루프를 정지합니다.
   */
  animationFrameId: number;

  /**
   * ### 애니메이션 시작 시각
   *
   * 속도 변조 주기의 기준이 되는 requestAnimationFrame 타임스탬프입니다.
   */
  animationStartTime: number | null;

  /**
   * ### 캔버스 2D 컨텍스트
   *
   * 매 프레임 getContext("2d") 호출을 피하기 위해 캐시합니다.
   */
  ctx: CanvasRenderingContext2D | null;
}
