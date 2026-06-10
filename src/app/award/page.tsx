/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { PageProps } from "@/types";
import type { Metadata } from "next";

import { PageModal } from "@/components/PageModal";
import { Awards } from "@/screens/Awards";
import { Root } from "@/screens/Root";

/**
 * ### metadata 프로퍼티
 *
 * 수상 내역 페이지의 메타데이터를 정의합니다.
 */
export const metadata: Metadata = {
  title: "수상 내역 – taeyoon. resume",
  description: "이태윤의 주요 수상 내역을 확인할 수 있습니다.",
  alternates: {
    canonical: "/award",
  },
  openGraph: {
    title: "수상 내역 – taeyoon. resume",
    description: "이태윤의 주요 수상 내역을 확인할 수 있습니다.",
    url: "https://resume.taeyoon.xyz/award",
  },
};

/**
 * ### 수상 내역 페이지
 *
 * 전체 수상 내역을 확인할 수 있는 fallback 페이지입니다.
 *
 * @param props {@link PageProps}
 * @page
 */
const AwardsPage = ({ ...props }: PageProps) => {
  return (
    <>
      <Root.Page {...props} />
      <PageModal>
        <Awards.Page {...props} />
      </PageModal>
    </>
  );
};

export default AwardsPage;
