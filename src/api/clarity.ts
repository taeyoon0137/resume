/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Clarity from "@microsoft/clarity";

/**
 * ### Clarity 프로젝트 ID
 *
 * Microsoft Clarity 프로젝트의 ID입니다.
 * 페이지 HTML에 그대로 노출되는 공개 식별자입니다.
 */
// cSpell:disable-next-line
const CLARITY_PROJECT_ID = "x5fsla9tzp";

/**
 * 초기화 완료 여부입니다.
 * 개발 환경의 StrictMode 등으로 effect가 중복 실행되어도
 * SDK가 두 번 초기화되지 않도록 합니다.
 */
let initialized = false;

/**
 * ### Clarity 초기화
 *
 * Microsoft Clarity를 초기화합니다.
 * 세션 녹화와 히트맵 데이터를 수집합니다.
 * 로컬 개발 트래픽이 집계되지 않도록 프로덕션 빌드에서만 초기화하며,
 * 클라이언트에서 마운트 이후 한 번만 호출합니다.
 */
export function initClarity(): void {
  if (initialized || process.env.NODE_ENV !== "production") return;
  initialized = true;

  Clarity.init(CLARITY_PROJECT_ID);
}
