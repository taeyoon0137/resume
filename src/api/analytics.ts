/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { trackAmplitudeEvent } from "./amplitude";
import { trackGoogleTagEvent } from "./googleTag";

import type { AnalyticsEventMap } from "@/types";

/**
 * ### 이벤트 프로퍼티 인자
 *
 * 이벤트별 프로퍼티 인자 형태를 정의합니다.
 * 프로퍼티가 없는 이벤트는 인자를 생략할 수 있도록 하고,
 * 프로퍼티가 있는 이벤트는 정의된 형태를 강제합니다.
 */
type EventProperties<E extends keyof AnalyticsEventMap> = AnalyticsEventMap[E] extends undefined
  ? []
  : [properties: AnalyticsEventMap[E]];

/**
 * ### 이벤트 추적
 *
 * 정의된 분석 이벤트를 GA와 Amplitude에 모두 전송합니다.
 * 도구별 수집 차단 조건(환경, 키 유무)은 각 도구의 모듈에서 처리합니다.
 *
 * @param event 전송할 이벤트 이름입니다.
 * @param args 이벤트 프로퍼티입니다. 프로퍼티가 없는 이벤트는 생략합니다.
 */
export function trackEvent<E extends keyof AnalyticsEventMap>(event: E, ...args: EventProperties<E>): void;
export function trackEvent(event: string, properties?: Record<string, unknown>): void {
  trackGoogleTagEvent(event, properties);
  trackAmplitudeEvent(event, properties);
}
