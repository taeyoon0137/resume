/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GoogleAnalytics } from "@next/third-parties/google";

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
