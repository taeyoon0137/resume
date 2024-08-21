/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { IParticle } from "./Particle.type";

/**
 * ### Particle
 *
 * 그라디언트를 만들 각 입자의 클래스를 정의합니다.
 */
class Particle implements IParticle {
  constructor(x: number, y: number, radius: number, rgb: number[]) {
    // 값 할당
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rgb = rgb;

    // 무작위 값 할당
    this.vx = Math.random() * 12;
    this.vy = Math.random() * 12;
    this.sinValue = Math.random();
  }

  // 내부 변수 정의
  x;
  y;
  radius;
  rgb;
  vx;
  vy;
  sinValue;

  move(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void {
    // 사인 값 증가
    this.sinValue += 0.01;

    // 사인 값 기반 반지름 이동
    this.radius += Math.sin(this.sinValue);

    // 입자 이동
    this.x += this.vx;
    this.y += this.vy;

    // 캔버스 경계 처리
    // 입자가 경계에 충돌하면 이동 속도를 반전합니다.
    if (this.x < 0) {
      this.vx *= -1;
      this.x += 10;
    } else if (this.x > canvasWidth) {
      this.vx *= -1;
      this.x -= 10;
    }

    if (this.y < 0) {
      this.vy *= -1;
      this.y += 10;
    } else if (this.y > canvasHeight) {
      this.vy *= -1;
      this.y -= 10;
    }

    // 그라데이션을 생성합니다.
    ctx.beginPath();
    const g = ctx.createRadialGradient(this.x, this.y, this.radius * 0.01, this.x, this.y, this.radius);
    g.addColorStop(0, `rgba(${this.rgb.join(", ")}, 1)`);
    g.addColorStop(1, `rgba(${this.rgb.join(", ")}, 0)`);

    // 옮겨진 입자를 그립니다.
    ctx.fillStyle = g;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

export default Particle;
