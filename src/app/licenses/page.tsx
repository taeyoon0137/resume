/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Suspense } from "react";

import { Licenses } from "@/screens";

import type { PageProps } from "@/types";
import type { Metadata } from "next";

/**
 * ### metadata 프로퍼티
 *
 * 단수형 `/license`로 리다이렉트하는 경로이므로 중복 색인을 막기 위해
 * 검색 엔진이 색인하지 않도록 처리합니다.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * ### 자격증 목록 페이지
 *
 * 전체 자격증 목록을 확인할 수 있는 페이지입니다.
 *
 * @param props {@link PageProps}
 * @page
 */
const LicensesPage = (_props: PageProps) => {
  return (
    <Suspense>
      <Licenses.Redirect />
    </Suspense>
  );
};

export default LicensesPage;
