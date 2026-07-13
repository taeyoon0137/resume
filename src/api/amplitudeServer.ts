/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
const amplitudeEndpoint = "https://api2.amplitude.com/2/httpapi";

/**
 * ### Shortlink 이벤트 전송
 *
 * 서버에서 Shortlink 이동 이벤트를 Amplitude로 전송합니다.
 * API 키가 없거나 전송에 실패하면 리다이렉트를 위해 오류를 반환하지 않습니다.
 *
 * @param deviceId 익명 기기 식별자입니다.
 * @param shortlink 요청한 Shortlink 프로퍼티입니다.
 * @param destination 리다이렉트 대상 URL입니다.
 * @param referrer 요청 유입 경로입니다.
 */
export async function trackShortlinkEvent(
  deviceId: string,
  shortlink: string,
  destination: string,
  referrer: string | null,
): Promise<void> {
  if (!AMPLITUDE_API_KEY) return;

  try {
    await fetch(amplitudeEndpoint, {
      body: JSON.stringify({
        api_key: AMPLITUDE_API_KEY,
        events: [
          {
            device_id: deviceId,
            event_type: "Shortlink Opened",
            event_properties: {
              Destination: destination,
              Referrer: referrer,
              Shortlink: shortlink,
            },
            insert_id: crypto.randomUUID(),
            time: Date.now(),
          },
        ],
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
      signal: AbortSignal.timeout(1000),
    });
  } catch {
    // 분석 요청 실패는 Shortlink 이동을 차단하지 않습니다.
  }
}
