/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageSheet } from "@/components";

import type { ProjectsPageProps } from "./Projects.type";

/**
 * ### ProjectsPage
 *
 * 참여 프로젝트 목록 페이지의 루트 컴포넌트입니다.
 *
 * @param props {@link ProjectsPageProps}
 * @page
 *
 * @deprecated 이 컴포넌트 대신 `Projects.Page`를 사용하세요.
 */
const ProjectsPage = (_props: ProjectsPageProps) => {
  return <PageSheet></PageSheet>;
};

export default ProjectsPage;
