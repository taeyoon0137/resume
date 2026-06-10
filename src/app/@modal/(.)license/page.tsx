/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { PageProps } from "@/types";

import { PageModal } from "@/components/PageModal";
import { Licenses } from "@/screens/Licenses";

/**
 * ### 자격증 목록 페이지
 *
 * 자격증 목록을 모달로 확인할 수 있는 페이지입니다.
 *
 * @param props {@link PageProps}
 * @page
 */
const LicensesPage = ({ ...props }: PageProps) => {
  return (
    <PageModal>
      <Licenses.Page {...props} />
    </PageModal>
  );
};

export default LicensesPage;
