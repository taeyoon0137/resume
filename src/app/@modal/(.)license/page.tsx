/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageModal } from "@/components/PageModal";
import { Licenses } from "@/screens/Licenses";

/**
 * ### 자격증 목록 페이지
 *
 * 자격증 목록을 모달로 확인할 수 있는 페이지입니다.
 *
 * @page
 */
const LicensesPage = () => {
  return (
    <PageModal>
      <Licenses.Page />
    </PageModal>
  );
};

export default LicensesPage;
