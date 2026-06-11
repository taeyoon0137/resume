"use client";

/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageEmpty } from "@/components";

/**
 * ### 라우트 에러 페이지
 *
 * 라우트 세그먼트 렌더링 중 오류가 발생했을 때 표시되는 페이지입니다.
 * RootLayout의 그라디언트 배경 위에 안내와 홈 버튼만 노출합니다.
 *
 * @page
 */
const RouteError = () => {
  return (
    <PageEmpty
      title="문제가 발생했어요"
      description="잠시 후 다시 시도해 주세요. 계속 같은 문제가 보이면 새로고침해 주세요."
    />
  );
};

export default RouteError;
