"use client";

/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";

import type { GradientProps } from "@/elements/Gradient/Gradient.type";

type GradientComponent = React.ComponentType<GradientProps>;

type IdleWindow = Window & {
  /**
   * ### 유휴 시간 콜백
   *
   * 브라우저의 유휴 시간에 작업을 예약합니다.
   */
  requestIdleCallback?: (callback: () => void) => number;

  /**
   * ### 유휴 시간 콜백 취소
   *
   * 예약한 유휴 시간 작업을 취소합니다.
   */
  cancelIdleCallback?: (handle: number) => void;
};

/**
 * ### 지연 배경 그라디언트
 *
 * 초기 렌더링 이후 캔버스 그라디언트를 불러옵니다.
 *
 * @param props {@link GradientProps}
 * @component
 */
const PageBackgroundGradient = (props: GradientProps) => {
  const [Gradient, setGradient] = useState<GradientComponent | null>(null);

  useEffect(scheduleGradientLoad, []);

  /**
   * 캔버스 그라디언트 로드를 예약합니다.
   *
   * @returns 예약 취소 함수
   */
  function scheduleGradientLoad(): () => void {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

    let canceled = false;
    const idleWindow = window as IdleWindow;

    /**
     * 캔버스 그라디언트를 불러옵니다.
     */
    async function loadGradient(): Promise<void> {
      const { default: GradientComponent } = await import("@/elements/Gradient/Gradient");
      if (!canceled) setGradient(() => GradientComponent);
    }

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(loadGradient);
      return () => {
        canceled = true;
        idleWindow.cancelIdleCallback?.(handle);
      };
    }

    const handle = window.setTimeout(loadGradient, 250);
    return () => {
      canceled = true;
      window.clearTimeout(handle);
    };
  }

  if (!Gradient) return null;

  return <Gradient {...props} />;
};

export default PageBackgroundGradient;
