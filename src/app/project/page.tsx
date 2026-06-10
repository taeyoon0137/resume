/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { PageProps } from "@/types";
import type { Metadata } from "next";

import { PageModal } from "@/components/PageModal";
import { Projects } from "@/screens/Projects";
import { Root } from "@/screens/Root";

/**
 * ### metadata 프로퍼티
 *
 * 프로젝트 페이지의 메타데이터를 정의합니다.
 */
export const metadata: Metadata = {
  title: "프로젝트 – taeyoon. resume",
  description: "이태윤이 참여한 주요 프로젝트와 사이드 프로젝트를 확인할 수 있습니다.",
  alternates: {
    canonical: "/project",
  },
  openGraph: {
    title: "프로젝트 – taeyoon. resume",
    description: "이태윤이 참여한 주요 프로젝트와 사이드 프로젝트를 확인할 수 있습니다.",
    url: "https://resume.taeyoon.xyz/project",
  },
};

/**
 * ### 참여 프로젝트 목록 페이지
 *
 * 참여했던 프로젝트 목록을 확인할 수 있는 fallback 페이지입니다.
 *
 * @param props {@link PageProps}
 * @page
 */
const ProjectsPage = ({ ...props }: PageProps) => {
  return (
    <>
      <Root.Page {...props} />
      <PageModal>
        <Projects.Page {...props} />
      </PageModal>
    </>
  );
};

export default ProjectsPage;
