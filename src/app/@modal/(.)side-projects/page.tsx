/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageModal } from "@/components";
import { SideProjects } from "@/screens";

import type { PageProps } from "@/types";

/**
 * ### 사이드 프로젝트 페이지
 *
 * 사이드 프로젝트 목록 페이지입니다.
 *
 * @param props {@link PageProps}
 * @page
 */
const SideProjectsPage = ({ ...props }: PageProps) => {
  return (
    <PageModal>
      <SideProjects.Page {...props} />
    </PageModal>
  );
};

export default SideProjectsPage;
