/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageModal } from "@/components/PageModal";
import { Projects } from "@/screens/Projects";

/**
 * ### 참여 프로젝트 목록 페이지
 *
 * 참여했던 프로젝트 목록을 모달로 확인할 수 있는 페이지입니다.
 *
 * @page
 */
const ProjectsPage = () => {
  return (
    <PageModal>
      <Projects.Page />
    </PageModal>
  );
};

export default ProjectsPage;
