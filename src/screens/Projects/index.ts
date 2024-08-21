/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import ProjectsPage from "./Projects.page";
import ProjectsRedirect from "./Projects.redirect";

/**
 * ### Projects
 *
 * 참여 프로젝트 목록 페이지입니다.
 */
export const Projects = {
  /**
   * ### 페이지
   *
   * 페이지를 렌더링 할 수 있는 컴포넌트입니다.
   *
   * @param props {@link ProjectsPageProps}
   * @page
   */
  Page: ProjectsPage,

  /**
   * ### 리다이렉트
   *
   * 리다이렉트를 할 수 있는 컴포넌트입니다.
   *
   * @redirect
   */
  Redirect: ProjectsRedirect,
};

export * from "./Projects.type";
