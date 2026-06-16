/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { notFound } from "next/navigation";

import ErrorPreview from "./ErrorPreview";

import type { Metadata } from "next";

/**
 * ### metadata 프로퍼티
 *
 * 에러 미리보기 페이지의 메타데이터입니다.
 * 검색 엔진이 색인하지 않도록 처리합니다.
 */
export const metadata: Metadata = {
  title: "에러 페이지 미리보기",
  robots: { index: false, follow: false },
};

/**
 * ### 에러 페이지 미리보기 경로
 *
 * 실제 오류 없이도 에러 페이지 디자인을 확인할 수 있는 개발용 경로입니다.
 * 접속하면 의도적으로 오류를 발생시켜 에러 바운더리를 표시합니다.
 * 404 페이지는 존재하지 않는 아무 경로로나 확인할 수 있습니다.
 *
 * @page
 */
const DevErrorPage = () => {
  // 개발 전용 미리보기 경로이므로 프로덕션에서는 노출하지 않습니다.
  if (process.env.NODE_ENV === "production") notFound();

  return <ErrorPreview />;
};

export default DevErrorPage;
