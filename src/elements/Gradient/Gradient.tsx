"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useMemo, useRef } from "react";

import * as stylex from "@stylexjs/stylex";
import Color from "color";

import { Particle } from "./classes";

import type { GradientProps, CanvasConfig } from "./Gradient.type";

const SPEED_CYCLE_MS = 7000;
const MIN_SPEED_RATIO = 1 / 3;
const MAX_SPEED_RATIO = 1;

/**
 * ### Gradient
 *
 * 추상적인 그래픽을 생성하여 렌더링합니다.
 *
 * @param props {@link GradientProps}
 * @component
 */
const Gradient = ({ colors, style, ...props }: GradientProps) => {
  const colorMap = useMemo(getColorMap, [colors]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasConfig = useRef<CanvasConfig>({
    pixelRatio: 1,
    canvasWidth: 0,
    canvasHeight: 0,
    particles: [],
    minRadius: 0,
    maxRadius: 0,
    animationFrameId: 0,
    animationStartTime: null,
    ctx: null,
  });

  useEffect(initializeCanvas, []);

  /**
   * 그라데이션 색상을 가져옵니다.
   * 색상을 [r, g, b] 형태로 반환합니다.
   *
   * @returns 그라데이션 색상
   */
  function getColorMap(): number[][] {
    // [r, g, b] 형태로 반환합니다.
    return colors.map((color) => Color(color).rgb().array());
  }

  /**
   * 애니메이션을 통해 그라데이션을 그립니다.
   * 이를 위한 초기 설정을 진행합니다.
   *
   * @see https://www.youtube.com/watch?v=D6EiRSRhsbQ
   */
  function initializeCanvas(): () => void {
    canvasConfig.current.pixelRatio = 1;

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function handleVisibility(): void {
      if (document.hidden) {
        window.cancelAnimationFrame(canvasConfig.current.animationFrameId);
      } else {
        canvasConfig.current.animationFrameId = window.requestAnimationFrame(animateParticles);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    canvasConfig.current.animationFrameId = window.requestAnimationFrame(animateParticles);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.cancelAnimationFrame(canvasConfig.current.animationFrameId);
    };
  }

  /**
   * 캔버스 크기가 조정되었을 때, 이를 반영합니다.
   */
  function resizeCanvas(): void {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    canvasConfig.current.ctx = ctx;

    canvasConfig.current.canvasWidth = canvasRef.current.clientWidth;
    canvasConfig.current.canvasHeight = canvasRef.current.clientHeight;

    canvasRef.current.width = canvasConfig.current.canvasWidth * canvasConfig.current.pixelRatio;
    canvasRef.current.height = canvasConfig.current.canvasHeight * canvasConfig.current.pixelRatio;
    ctx.setTransform(canvasConfig.current.pixelRatio, 0, 0, canvasConfig.current.pixelRatio, 0, 0);

    canvasConfig.current.minRadius =
      Math.min(canvasConfig.current.canvasWidth, canvasConfig.current.canvasHeight) * 0.6;
    canvasConfig.current.maxRadius =
      Math.min(canvasConfig.current.canvasWidth, canvasConfig.current.canvasHeight) * 1.25;

    ctx.globalCompositeOperation = "saturation";

    createParticles();
  }

  /**
   * 그라디언트를 만들 파티클을 생성합니다.
   */
  function createParticles() {
    // 파티클 설정을 초기화합니다.
    canvasConfig.current.particles = [];

    // 파티클을 생성합니다.
    for (let i = 0; i < colorMap.length * 5; i++) {
      // 파티클을 생성합니다.
      const item = new Particle(
        Math.random() * canvasConfig.current.canvasWidth,
        Math.random() * canvasConfig.current.canvasHeight,
        Math.random() * (canvasConfig.current.maxRadius - canvasConfig.current.minRadius) +
          canvasConfig.current.minRadius,
        colorMap[i % colorMap.length],
      );

      // 파티클을 배열에 저장합니다.
      canvasConfig.current.particles.push(item);
    }
  }

  /**
   * 현재 프레임에 적용할 파티클 속도 계수를 계산합니다.
   *
   * @param timestamp requestAnimationFrame이 전달한 현재 시각입니다.
   * @returns 현재 프레임의 속도 계수입니다.
   */
  function getSpeedRatio(timestamp: number): number {
    if (canvasConfig.current.animationStartTime === null) {
      canvasConfig.current.animationStartTime = timestamp;
    }

    const elapsedTime = timestamp - canvasConfig.current.animationStartTime;
    const cycleProgress = (elapsedTime % SPEED_CYCLE_MS) / SPEED_CYCLE_MS;
    const sineValue = Math.sin(cycleProgress * Math.PI * 2 + Math.PI / 2);

    return MIN_SPEED_RATIO + ((sineValue + 1) / 2) * (MAX_SPEED_RATIO - MIN_SPEED_RATIO);
  }

  /**
   * 파티클을 애니메이션합니다.
   * window.requestAnimationFrame을 통해 재귀적으로 호출합니다.
   *
   * @param timestamp requestAnimationFrame이 전달한 현재 시각입니다.
   */
  function animateParticles(timestamp: number) {
    canvasConfig.current.animationFrameId = window.requestAnimationFrame(animateParticles);

    const ctx = canvasConfig.current.ctx;
    if (!canvasRef.current || !ctx) return;

    ctx.clearRect(0, 0, canvasConfig.current.canvasWidth, canvasConfig.current.canvasHeight);

    const speedRatio = getSpeedRatio(timestamp);

    for (const particle of canvasConfig.current.particles) {
      particle.move(ctx, canvasConfig.current.canvasWidth, canvasConfig.current.canvasHeight, speedRatio);
    }
  }

  return <canvas ref={canvasRef} {...stylex.props(style)} {...props} />;
};

export default Gradient;
