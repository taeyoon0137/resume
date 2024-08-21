"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageFooter, PageSheet } from "@/components";
import { Separator } from "@/elements";

import { ResumeHeader, ResumeInfo, ResumeProjectList, ResumeSummary, ResumeTechStack } from "./components";

import type { RootPageProps } from "./Root.type";

/**
 * ### RootPage
 *
 * 이력서 페이지의 루트 컴포넌트입니다.
 *
 * @param props {@link RootPageProps}
 * @page
 *
 * @deprecated 이 컴포넌트 대신 `Root.Page`를 사용하세요.
 */
const RootPage = (_props: RootPageProps) => {
  return (
    <PageSheet>
      <ResumeHeader />
      <ResumeInfo />
      <ResumeTechStack />
      <Separator margin={24} />
      <ResumeSummary />
      <Separator />
      <ResumeProjectList />
      <Separator />
      <PageFooter />
    </PageSheet>
  );
};

export default RootPage;
