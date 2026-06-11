"use client";

/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";

/**
 * ### ErrorPreview
 *
 * 마운트 직후 의도적으로 오류를 발생시켜
 * 상위 에러 바운더리(src/app/error.tsx)가 렌더링되도록 합니다.
 * 빌드 프리렌더 시점에는 오류를 던지지 않으므로 정적 생성을 깨지 않습니다.
 *
 * @component
 */
const ErrorPreview = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  useEffect(triggerError, []);

  /**
   * 마운트 이후 오류 발생 상태로 전환합니다.
   */
  function triggerError(): void {
    setShouldThrow(true);
  }

  if (shouldThrow) {
    throw new Error("에러 페이지 미리보기를 위해 의도적으로 발생시킨 오류입니다.");
  }

  return null;
};

export default ErrorPreview;
