/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Projects } from "@/screens";

import type { PageProps } from "@/types";

/**
 * ### 참여 프로젝트 목록 페이지
 *
 * 참여했던 프로젝트 목록을 확인할 수 있는 페이지입니다.
 *
 * @param props {@link PageProps}
 * @page
 */
const ProjectsPage = ({ ...props }: PageProps) => {
  return <Projects.Page {...props} />;
};

export default ProjectsPage;
