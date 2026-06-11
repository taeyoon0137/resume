/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageEmpty } from "@/components";

import type { Metadata } from "next";

/**
 * ### metadata 프로퍼티
 *
 * 404 페이지의 메타데이터입니다.
 * 검색 엔진이 색인하지 않도록 처리합니다.
 */
export const metadata: Metadata = {
  title: "페이지를 찾을 수 없어요",
  robots: { index: false, follow: false },
};

/**
 * ### 404 페이지
 *
 * 존재하지 않는 경로에 진입했을 때 표시되는 페이지입니다.
 * RootLayout의 그라디언트 배경 위에 안내와 홈 버튼만 노출합니다.
 *
 * @page
 */
const NotFoundPage = () => {
  return (
    <PageEmpty
      title="페이지를 찾을 수 없어요"
      description="요청하신 페이지가 사라졌거나 주소가 잘못된 것 같아요."
    />
  );
};

export default NotFoundPage;
