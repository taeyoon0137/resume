/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";

/**
 * ### Google 태그 측정 ID
 *
 * Google Analytics(GA4) 속성의 측정 ID입니다.
 * 페이지 HTML에 그대로 노출되는 공개 식별자이지만,
 * 포크 사용 시 원작자 속성으로 데이터가 전송되지 않도록 환경 변수로 주입합니다.
 * ID가 없는 환경에서는 태그를 로드하지 않습니다.
 */
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * ### GoogleTag
 *
 * Google 태그(gtag.js)를 로드하고 초기화하는 컴포넌트입니다.
 * 로컬 개발 트래픽이 집계되지 않도록 프로덕션 빌드에서만 로드합니다.
 *
 * @component
 */
export const GoogleTag = () => {
  if (process.env.NODE_ENV !== "production" || !GA_MEASUREMENT_ID) return null;

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
};

/**
 * ### Google 태그 이벤트 전송
 *
 * Google Analytics로 단일 이벤트를 전송합니다.
 * 태그를 로드하지 않는 개발 환경에서는 전송하지 않습니다.
 *
 * @param event 전송할 이벤트 이름입니다.
 * @param properties 이벤트 프로퍼티입니다.
 */
export function trackGoogleTagEvent(event: string, properties?: Record<string, unknown>): void {
  if (process.env.NODE_ENV !== "production" || !GA_MEASUREMENT_ID) return;

  // gtag 부트스트랩 스크립트보다 먼저 호출되면 sendGAEvent가 이벤트를 버리므로,
  // dataLayer를 미리 만들어 큐에 쌓이게 합니다. 쌓인 이벤트는 gtag.js 로드 시 소비됩니다.
  const tagWindow = window as typeof window & { dataLayer?: unknown[] };
  tagWindow.dataLayer = tagWindow.dataLayer ?? [];

  sendGAEvent("event", event, properties ?? {});
}
