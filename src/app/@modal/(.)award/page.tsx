/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageModal } from "@/components/PageModal";
import { Awards } from "@/screens/Awards";

/**
 * ### 수상 내역 페이지
 *
 * 수상 내역을 모달로 확인할 수 있는 페이지입니다.
 *
 * @page
 */
const AwardsPage = () => {
  return (
    <PageModal>
      <Awards.Page />
    </PageModal>
  );
};

export default AwardsPage;
