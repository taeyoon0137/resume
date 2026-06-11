/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createPageMetadata } from "@/utils";

import type { Metadata } from "next";

import { PageModal } from "@/components/PageModal";
import { Licenses } from "@/screens/Licenses";
import { Root } from "@/screens/Root";

/**
 * ### metadata 프로퍼티
 *
 * 자격증 페이지의 메타데이터를 정의합니다.
 */
export const metadata: Metadata = createPageMetadata({
  title: "자격증",
  description: "이태윤의 자격증 목록을 확인할 수 있습니다.",
  path: "/license",
});

/**
 * ### 자격증 목록 페이지
 *
 * 전체 자격증 목록을 확인할 수 있는 fallback 페이지입니다.
 *
 * @page
 */
const LicensesPage = () => {
  return (
    <>
      <Root.Page />
      <PageModal>
        <Licenses.Page />
      </PageModal>
    </>
  );
};

export default LicensesPage;
