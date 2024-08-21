/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageSheet } from "@/components";

import type { SideProjectsPageProps } from "./SideProjects.type";

/**
 * ### SideProjectsPage
 *
 * 사이드 프로젝트 목록 페이지의 루트 컴포넌트입니다.
 *
 * @param props {@link SideProjectsPageProps}
 * @page
 *
 * @deprecated 이 컴포넌트 대신 `SideProjects.Page`를 사용하세요.
 */
const SideProjectsPage = (_props: SideProjectsPageProps) => {
  return <PageSheet></PageSheet>;
};

export default SideProjectsPage;
