"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useMemo, useRef } from "react";

import stylex from "@stylexjs/stylex";
import Color from "color";

import { Particle } from "./classes";

import type { GradientProps, CanvasConfig } from "./Gradient.type";

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
    // 픽셀 비율을 설정합니다.
    canvasConfig.current.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    // 크기 조정 리스너를 설정합니다.
    if (canvasRef.current) canvasRef.current.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // 애니메이션을 실행합니다.
    const handleID = window.requestAnimationFrame(animateParticles);

    // 클린업을 수행합니다.
    return () => {
      if (canvasRef.current) canvasRef.current.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(handleID);
    };
  }

  /**
   * 캔버스 크기가 조정되었을 때, 이를 반영합니다.
   */
  function resizeCanvas(): void {
    // 캔버스가 존재하지 않을 경우 종료합니다.
    if (!canvasRef.current) return;

    // 캔버스의 2D 컨텍스트를 가져옵니다.
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // 캔버스의 크기를 조정합니다.
    // 실제 픽셀 단위를 사용하기 위해 픽셀 비율로 나눕니다.
    canvasConfig.current.canvasWidth = canvasRef.current.clientWidth;
    canvasConfig.current.canvasHeight = canvasRef.current.clientHeight;

    // 캔버스의 크기를 설정합니다.
    canvasRef.current.width = canvasConfig.current.canvasWidth * canvasConfig.current.pixelRatio;
    canvasRef.current.height = canvasConfig.current.canvasHeight * canvasConfig.current.pixelRatio;
    ctx.scale(canvasConfig.current.pixelRatio, canvasConfig.current.pixelRatio);

    // 파티클 크기를 설정합니다.
    canvasConfig.current.minRadius =
      Math.min(canvasConfig.current.canvasWidth, canvasConfig.current.canvasHeight) * 0.6;
    canvasConfig.current.maxRadius =
      Math.min(canvasConfig.current.canvasWidth, canvasConfig.current.canvasHeight) * 1.25;

    // 전역 색상을 설정합니다.
    ctx.globalCompositeOperation = "saturation";

    // 애니메이션을 재설정합니다.
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
   * 파티클을 애니메이션합니다.
   * window.requestAnimationFrame을 통해 재귀적으로 호출합니다.
   */
  function animateParticles() {
    // 재귀적으로 호출합니다.
    window.requestAnimationFrame(animateParticles);

    // 캔버스가 존재하지 않을 경우 종료합니다.
    if (!canvasRef.current) return;

    // 캔버스의 2D 컨텍스트를 가져옵니다.
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // 캔버스를 초기화합니다.
    ctx.clearRect(0, 0, canvasConfig.current.canvasWidth, canvasConfig.current.canvasHeight);

    // 각 파티클을 움직입니다.
    for (const particle of canvasConfig.current.particles) {
      particle.move(ctx, canvasConfig.current.canvasWidth, canvasConfig.current.canvasHeight);
    }
  }

  return <canvas ref={canvasRef} {...stylex.props(style)} {...props} />;
};

export default Gradient;
