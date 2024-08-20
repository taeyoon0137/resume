/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageModal } from "@/components";
import { Activities } from "@/screens";

import type { PageProps } from "@/types";

/**
 * ### 활동 내역 페이지
 *
 * 활동 내역 목록을 볼 수 있는 페이지입니다.
 *
 * @param props {@link PageProps}
 * @page
 */
const ActivitiesPage = ({ ...props }: PageProps) => {
  return (
    <PageModal>
      <Activities.Page {...props} />
    </PageModal>
  );
};

export default ActivitiesPage;
