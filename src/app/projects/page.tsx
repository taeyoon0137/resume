/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Suspense } from "react";

import { Projects } from "@/screens";

import type { PageProps } from "@/types";
import type { Metadata } from "next";

/**
 * ### metadata 프로퍼티
 *
 * 단수형 `/project`로 리다이렉트하는 경로이므로 중복 색인을 막기 위해
 * 검색 엔진이 색인하지 않도록 처리합니다.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * ### 참여 프로젝트 목록 페이지
 *
 * 참여했던 프로젝트 목록을 확인할 수 있는 페이지입니다.
 *
 * @param props {@link PageProps}
 * @page
 */
const ProjectsPage = (_props: PageProps) => {
  return (
    <Suspense>
      <Projects.Redirect />
    </Suspense>
  );
};

export default ProjectsPage;
