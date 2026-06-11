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
 * 페이지 HTML에 그대로 노출되는 공개 식별자입니다.
 */
const GA_MEASUREMENT_ID = "G-ELXRBRNF7Y";

/**
 * ### GoogleTag
 *
 * Google 태그(gtag.js)를 로드하고 초기화하는 컴포넌트입니다.
 * 로컬 개발 트래픽이 집계되지 않도록 프로덕션 빌드에서만 로드합니다.
 *
 * @component
 */
export const GoogleTag = () => {
  if (process.env.NODE_ENV !== "production") return null;

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
  if (process.env.NODE_ENV !== "production") return;

  sendGAEvent("event", event, properties ?? {});
}
