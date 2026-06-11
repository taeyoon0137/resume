/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createPageMetadata } from "@/utils";

import type { Metadata } from "next";

import { PageModal } from "@/components/PageModal";
import { Projects } from "@/screens/Projects";
import { Root } from "@/screens/Root";

/**
 * ### metadata 프로퍼티
 *
 * 프로젝트 페이지의 메타데이터를 정의합니다.
 */
export const metadata: Metadata = createPageMetadata({
  title: "프로젝트",
  description: "이태윤이 참여한 주요 프로젝트와 사이드 프로젝트를 확인할 수 있습니다.",
  path: "/project",
});

/**
 * ### 참여 프로젝트 목록 페이지
 *
 * 참여했던 프로젝트 목록을 확인할 수 있는 fallback 페이지입니다.
 *
 * @page
 */
const ProjectsPage = () => {
  return (
    <>
      <Root.Page />
      <PageModal>
        <Projects.Page />
      </PageModal>
    </>
  );
};

export default ProjectsPage;
