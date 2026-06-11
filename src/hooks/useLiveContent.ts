/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";

import { content, createLiveContent } from "@/contents";

/**
 * 날짜 의존 값을 최신으로 유지하는 콘텐츠를 반환합니다.
 * 서버 렌더와 첫 클라이언트 렌더는 빌드 시점 기준의 {@link content}를 사용해
 * hydration 불일치를 피하고, 마운트 이후 현재 날짜로 다시 계산합니다.
 *
 * @returns 현재 날짜 기준으로 계산된 콘텐츠
 */
export function useLiveContent(): typeof content {
  const [liveContent, setLiveContent] = useState(content);

  useEffect(syncLiveContent, []);

  /**
   * 콘텐츠를 현재 날짜 기준으로 다시 계산합니다.
   */
  function syncLiveContent(): void {
    setLiveContent(createLiveContent(new Date()));
  }

  return liveContent;
}
