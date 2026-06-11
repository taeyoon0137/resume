/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createPageMetadata } from "@/utils";

import type { Metadata } from "next";

import { PageModal } from "@/components/PageModal";
import { Awards } from "@/screens/Awards";
import { Root } from "@/screens/Root";

/**
 * ### metadata 프로퍼티
 *
 * 수상 내역 페이지의 메타데이터를 정의합니다.
 */
export const metadata: Metadata = createPageMetadata({
  title: "수상 내역",
  description: "이태윤의 주요 수상 내역을 확인할 수 있습니다.",
  path: "/award",
});

/**
 * ### 수상 내역 페이지
 *
 * 전체 수상 내역을 확인할 수 있는 fallback 페이지입니다.
 *
 * @page
 */
const AwardsPage = () => {
  return (
    <>
      <Root.Page />
      <PageModal>
        <Awards.Page />
      </PageModal>
    </>
  );
};

export default AwardsPage;
