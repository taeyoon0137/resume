/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as amplitude from "@amplitude/analytics-browser";

/**
 * ### Amplitude API 키
 *
 * 환경별 Amplitude 프로젝트의 API 키입니다.
 * 개발 환경과 프로덕션 환경의 키를 환경 변수로 분리해 주입합니다.
 * 키가 없는 환경에서는 초기화를 건너뜁니다.
 */
const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

/**
 * 초기화 완료 여부입니다.
 * 개발 환경의 StrictMode 등으로 effect가 중복 실행되어도
 * SDK가 두 번 초기화되지 않도록 합니다.
 */
let initialized = false;

/**
 * ### Amplitude 초기화
 *
 * Amplitude 브라우저 SDK를 초기화합니다.
 * 페이지 뷰, 세션, 유입 경로 등을 자동으로 수집합니다.
 * 클라이언트에서 마운트 이후 한 번만 호출합니다.
 */
export function initAmplitude(): void {
  if (initialized || !AMPLITUDE_API_KEY) return;
  initialized = true;

  amplitude.init(AMPLITUDE_API_KEY, {
    autocapture: {
      attribution: true,
      fileDownloads: true,
      formInteractions: true,
      pageViews: true,
      sessions: true,
      // 요소 클릭 단위 수집은 이벤트 양이 많아 사용하지 않습니다.
      elementInteractions: false,
    },
  });
}

/**
 * ### Amplitude 이벤트 전송
 *
 * Amplitude로 단일 이벤트를 전송합니다.
 * 초기화 전에 전송한 이벤트는 SDK 큐에 쌓인 채 소비되지 않으므로,
 * 초기화된 경우에만 전송합니다.
 *
 * @param event 전송할 이벤트 이름입니다.
 * @param properties 이벤트 프로퍼티입니다.
 */
export function trackAmplitudeEvent(event: string, properties?: Record<string, unknown>): void {
  if (!initialized) return;

  amplitude.track(event, properties);
}
