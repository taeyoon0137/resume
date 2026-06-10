/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { PageProps } from "@/types";
import type { Metadata } from "next";

import { PageModal } from "@/components/PageModal";
import { Licenses } from "@/screens/Licenses";
import { Root } from "@/screens/Root";

/**
 * ### metadata 프로퍼티
 *
 * 자격증 페이지의 메타데이터를 정의합니다.
 */
export const metadata: Metadata = {
  title: "자격증 – taeyoon. resume",
  description: "이태윤의 자격증 목록을 확인할 수 있습니다.",
  alternates: {
    canonical: "/license",
  },
  openGraph: {
    title: "자격증 – taeyoon. resume",
    description: "이태윤의 자격증 목록을 확인할 수 있습니다.",
    url: "https://resume.taeyoon.xyz/license",
  },
};

/**
 * ### 자격증 목록 페이지
 *
 * 전체 자격증 목록을 확인할 수 있는 fallback 페이지입니다.
 *
 * @param props {@link PageProps}
 * @page
 */
const LicensesPage = ({ ...props }: PageProps) => {
  return (
    <>
      <Root.Page {...props} />
      <PageModal>
        <Licenses.Page {...props} />
      </PageModal>
    </>
  );
};

export default LicensesPage;
