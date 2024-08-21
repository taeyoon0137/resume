/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ### Particle 인터페이스
 *
 * 그라디언트를 만들 각 입자의 인터페이스를 정의합니다.
 */
export interface IParticle {
  /**
   * ### x좌표
   *
   * 현재의 x좌표를 정의합니다.
   *
   * @private
   */
  x: number;

  /**
   * ### y좌표
   *
   * 현재의 y좌표를 정의합니다.
   *
   * @private
   */
  y: number;

  /**
   * ### 반지름
   *
   * 입자의 반지름을 정의합니다.
   *
   * @private
   */
  radius: number;

  /**
   * ### RGB 값
   *
   * 입자의 색상을 정의합니다.
   *
   * @private
   */
  rgb: number[];

  /**
   * ### x축 속도
   *
   * x축으로의 속도를 정의합니다.
   *
   * @private
   */
  vx: number;

  /**
   * ### y축 속도
   *
   * y축으로의 속도를 정의합니다.
   *
   * @private
   */
  vy: number;

  /**
   * ### 사인 값
   *
   * 입자의 애니메이션 움직임을 제어할 사인 값을 정의합니다.
   *
   * @private
   */
  sinValue: number;

  /**
   * 입자를 움직입니다.
   *
   * @param ctx - 캔버스 렌더링 컨텍스트
   * @param canvasWidth - 캔버스 너비
   * @param canvasHeight - 캔버스 높이
   */
  move(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void;
}
