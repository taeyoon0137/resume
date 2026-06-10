/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { PageProps } from "@/types";

import { PageModal } from "@/components/PageModal";
import { Awards } from "@/screens/Awards";

/**
 * ### 수상 내역 페이지
 *
 * 수상 내역을 모달로 확인할 수 있는 페이지입니다.
 *
 * @param props {@link PageProps}
 * @page
 */
const AwardsPage = ({ ...props }: PageProps) => {
  return (
    <PageModal>
      <Awards.Page {...props} />
    </PageModal>
  );
};

export default AwardsPage;
